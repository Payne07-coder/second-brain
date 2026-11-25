(() => {
  "use strict";

  const CONFIG_KEY = "xianTu.githubSync.v1";
  const API_BASE = localStorage.getItem("xianTu.githubApiBase") || "https://api.github.com";
  const DEFAULTS = {
    owner: "",
    repo: "second-brain-data",
    branch: "main",
    path: "data.json",
    token: "",
    lastSha: "",
    lastHash: "",
    lastSyncAt: "",
    localChangeAt: ""
  };

  let config = loadConfig();
  let applyingRemote = false;
  let pushTimer = 0;
  let pollTimer = 0;

  function loadConfig() {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}") };
    } catch {
      return { ...DEFAULTS };
    }
  }

  function saveConfig(next = {}) {
    config = { ...config, ...next };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    return config;
  }

  function isConfigured() {
    return Boolean(config.owner && config.repo && config.token);
  }

  function rawState() {
    return window.XIANTU && typeof window.XIANTU.getState === "function" ? window.XIANTU.getState() : null;
  }

  function basePayload() {
    const current = rawState();
    if (!current || typeof current !== "object") return null;
    const { ui, ...data } = current;
    return data;
  }

  function canonicalText(data = basePayload()) {
    if (!data || typeof data !== "object") return "";
    const { updatedAt, ...rest } = data;
    return JSON.stringify(rest);
  }

  function hashText(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function meaningful(data) {
    if (!data || typeof data !== "object") return false;
    if (data.profile && data.profile.name && data.profile.name !== "你的名字") return true;
    return ["decisions", "events", "resumeItems", "notes", "goals", "options", "reviews", "checkins", "deepReflections"]
      .some(key => Array.isArray(data[key]) && data[key].length > 0);
  }

  function score(data) {
    if (!data || typeof data !== "object") return 0;
    return ["decisions", "events", "resumeItems", "notes", "goals", "options", "reviews", "checkins", "deepReflections"]
      .reduce((sum, key) => sum + (Array.isArray(data[key]) ? data[key].length : 0), 0);
  }

  function contentUrl(withRef = true) {
    const filePath = String(config.path || "data.json").split("/").map(encodeURIComponent).join("/");
    const base = `${API_BASE}/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${filePath}`;
    return withRef ? `${base}?ref=${encodeURIComponent(config.branch || "main")}` : base;
  }

  async function request(method, url, body) {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    };
    if (body) headers["Content-Type"] = "application/json";
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store"
    });
    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    if (!response.ok) {
      const error = new Error(data && data.message ? data.message : `GitHub ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function toBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  function fromBase64(value) {
    const binary = atob(String(value || "").replace(/\s/g, ""));
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  async function getRemote() {
    try {
      const data = await request("GET", contentUrl(true));
      const text = fromBase64(data.content);
      return { sha: data.sha, text, data: JSON.parse(text) };
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  async function putRemote(text) {
    const current = await getRemote().catch(error => {
      if (error.status === 404) return null;
      throw error;
    });
    const body = {
      message: `sync ${new Date().toISOString()}`,
      content: toBase64(text),
      branch: config.branch || "main"
    };
    if (current && current.sha) body.sha = current.sha;
    return request("PUT", contentUrl(false), body);
  }

  function setStatus(message, isError = false) {
    const node = document.getElementById("githubSyncStatus");
    if (!node) return;
    node.textContent = message;
    node.style.color = isError ? "var(--red, #c62828)" : "";
  }

  function statusText() {
    if (!isConfigured()) return "未配置：先在下面填入 GitHub 用户名、私有仓库名和 token。";
    const time = config.lastSyncAt ? new Date(config.lastSyncAt).toLocaleString("zh-CN", { hour12: false }) : "尚未同步";
    return `已连接 ${config.owner}/${config.repo} · 最后同步：${time}${config.lastSha ? ` · ${config.lastSha.slice(0, 7)}` : ""}`;
  }

  function refreshStatus() {
    setStatus(statusText());
  }

  async function pull(options = {}) {
    if (!isConfigured()) return false;
    const remote = await getRemote();
    if (!remote) {
      if (!options.silent) setStatus("云端还没有数据，先点“上传到云端”。");
      return false;
    }
    applyingRemote = true;
    try {
      window.XIANTU.replaceState(remote.data);
    } finally {
      applyingRemote = false;
    }
    saveConfig({
      lastSha: remote.sha,
      lastHash: hashText(canonicalText(remote.data)),
      lastSyncAt: new Date().toISOString()
    });
    refreshStatus();
    if (!options.silent) window.XIANTU && window.dispatchEvent(new CustomEvent("xiantu:toast", { detail: { message: "已从 GitHub 拉取" } }));
    return true;
  }

  async function push(options = {}) {
    if (!isConfigured()) return false;
    const local = basePayload();
    if (!local) return false;
    if (!meaningful(local) && !options.force) {
      setStatus("当前没有可上传的数据；请先在电脑端上传或导入备份。", true);
      return false;
    }
    const text = JSON.stringify({ ...local, updatedAt: new Date().toISOString() });
    const response = await putRemote(text);
    saveConfig({
      lastSha: response && response.content ? response.content.sha : config.lastSha,
      lastHash: hashText(canonicalText(local)),
      lastSyncAt: new Date().toISOString()
    });
    refreshStatus();
    if (!options.silent) window.XIANTU && window.dispatchEvent(new CustomEvent("xiantu:toast", { detail: { message: "已上传到 GitHub" } }));
    return true;
  }

  async function syncNow(options = {}) {
    if (!isConfigured()) {
      if (!options.silent) refreshStatus();
      return;
    }
    try {
      const remote = await getRemote();
      const local = basePayload();
      const localText = canonicalText(local);
      const localHash = hashText(localText);
      if (!remote) {
        if (!meaningful(local)) {
          setStatus("云端还没有数据；请先在电脑端点“上传到云端”。");
          return;
        }
        await push(options);
        return;
      }
      const remoteText = canonicalText(remote.data);
      const remoteHash = hashText(remoteText);
      if (remoteHash === localHash) {
        saveConfig({ lastSha: remote.sha, lastHash: localHash, lastSyncAt: new Date().toISOString() });
        refreshStatus();
        return;
      }
      const lastHash = config.lastHash;
      const localDirty = !lastHash || localHash !== lastHash;
      const remoteDirty = !lastHash || remoteHash !== lastHash;
      if (remoteDirty && !localDirty) {
        await pull(options);
        return;
      }
      if (localDirty && !remoteDirty) {
        await push(options);
        return;
      }
      if (!lastHash) {
        const localScore = score(local);
        const remoteScore = score(remote.data);
        if (!meaningful(local) && meaningful(remote.data)) {
          await pull(options);
          return;
        }
        if (localScore > remoteScore) {
          await push(options);
          return;
        }
        if (remoteScore > localScore) {
          await pull(options);
          return;
        }
      }
      const remoteTime = Date.parse(remote.data && remote.data.updatedAt ? remote.data.updatedAt : 0) || 0;
      const localTime = Date.parse(config.localChangeAt || 0) || 0;
      if (remoteTime > localTime) {
        await pull(options);
      } else {
        await push(options);
      }
    } catch (error) {
      setStatus(`同步失败：${error.message || "网络或 token 有问题"}`, true);
      if (!options.silent) window.XIANTU && window.dispatchEvent(new CustomEvent("xiantu:toast", { detail: { message: "GitHub 同步失败，请检查 token 和仓库" } }));
    }
  }

  function readForm() {
    const value = id => {
      const node = document.getElementById(id);
      return node ? node.value.trim() : "";
    };
    const token = value("githubToken");
    return {
      owner: value("githubOwner"),
      repo: value("githubRepo"),
      branch: value("githubBranch") || "main",
      path: value("githubPath") || "data.json",
      token: token || config.token
    };
  }

  function renderCard() {
    const current = rawState();
    if (!current || !current.ui || current.ui.page !== "settings") return;
    const grid = document.querySelector(".settings-grid");
    if (!grid || document.getElementById("githubSyncCard")) return;
    const card = document.createElement("article");
    card.className = "settings-card";
    card.id = "githubSyncCard";
    card.style.gridColumn = "1/-1";
    card.innerHTML = `
      <div class="panel-title"><svg class="icon"><use href="#i-rotate"></use></svg><h3>GitHub 云同步</h3></div>
      <p>把私人数据存到一个 GitHub <strong>私有仓库</strong>。手机和电脑填同一组配置，保存后自动上传，打开或切回页面时自动拉取。token 只保存在当前浏览器，不会写进网页。</p>
      <div class="form-grid">
        <div class="field"><label for="githubOwner">GitHub 用户名</label><input id="githubOwner" value="${escapeAttr(config.owner)}" autocomplete="off"></div>
        <div class="field"><label for="githubRepo">私有仓库名</label><input id="githubRepo" value="${escapeAttr(config.repo)}" autocomplete="off"></div>
        <div class="field"><label for="githubBranch">分支</label><input id="githubBranch" value="${escapeAttr(config.branch)}" autocomplete="off"></div>
        <div class="field"><label for="githubPath">文件路径</label><input id="githubPath" value="${escapeAttr(config.path)}" autocomplete="off"></div>
        <div class="field full"><label for="githubToken">Fine-grained token</label><input id="githubToken" type="password" value="" placeholder="${config.token ? "已保存，留空则不修改" : "只保存在本机"}" autocomplete="new-password"><small>只给这个私有仓库 Contents 读写权限；不要发到聊天里。</small></div>
      </div>
      <div class="settings-actions">
        <button class="primary-button" data-github-action="save">保存并同步</button>
        <button class="secondary-button" data-github-action="pull">从云端拉取</button>
        <button class="secondary-button" data-github-action="push">上传到云端</button>
        <button class="secondary-button" data-github-action="disconnect">断开</button>
      </div>
      <div class="muted small" id="githubSyncStatus">${escapeAttr(statusText())}</div>`;
    const danger = grid.querySelector(".danger-zone");
    if (danger) grid.insertBefore(card, danger);
    else grid.appendChild(card);
  }

  function escapeAttr(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-github-action]");
    if (!button) return;
    const action = button.dataset.githubAction;
    if (action === "save") {
      const next = readForm();
      if (!next.owner || !next.repo || !next.token) {
        setStatus("请填写用户名、私有仓库名和 token。", true);
        return;
      }
      saveConfig(next);
      setStatus("正在同步…");
      syncNow();
    }
    if (action === "pull") {
      setStatus("正在从云端拉取…");
      pull();
    }
    if (action === "push") {
      setStatus("正在上传到云端…");
      push();
    }
    if (action === "disconnect") {
      if (!window.confirm("只删除本机保存的 GitHub 配置和 token，不会删除仓库里的数据。确定断开吗？")) return;
      config = { ...DEFAULTS };
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      refreshStatus();
    }
  });

  window.addEventListener("xiantu:save", () => {
    if (applyingRemote || !isConfigured()) return;
    const data = basePayload();
    if (!data) return;
    const localHash = hashText(canonicalText(data));
    if (localHash === config.lastHash) return;
    saveConfig({ localChangeAt: new Date().toISOString() });
    clearTimeout(pushTimer);
    pushTimer = window.setTimeout(() => push({ silent: true }), 2500);
    refreshStatus();
  });

  window.addEventListener("xiantu:render", () => {
    renderCard();
    refreshStatus();
  });

  window.addEventListener("xiantu:toast", event => {
    const message = event.detail && event.detail.message;
    if (!message) return;
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && isConfigured()) syncNow({ silent: true });
  });

  if (isConfigured()) {
    window.setTimeout(() => syncNow({ silent: true }), 900);
    pollTimer = window.setInterval(() => {
      if (document.visibilityState === "visible" && isConfigured()) syncNow({ silent: true });
    }, 20000);
  }

  window.XIANTU_GITHUB_SYNC = { syncNow, pull, push, config: () => ({ ...config, token: config.token ? "***" : "" }) };
})();
