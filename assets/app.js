(() => {
  "use strict";

  const STORAGE_KEY = "xianTu.privateAtlas.v1";
  const APP_VERSION = 16;
  const todayIso = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  };

  const pageMeta = {
    overview: ["今日概览", "PRIVATE ATLAS"],
    decisions: ["决策复盘", "DECISION JOURNAL"],
    timeline: ["人生轨迹", "LIFE TIMELINE"],
    resume: ["履历档案", "PRIVATE RÉSUMÉ"],
    network: ["关系地图", "CONNECTIONS"],
    insights: ["成长洞察", "DECISION INSIGHTS"],
    forecast: ["趋势与风险", "FORECAST & RISK"],
    questions: ["深层追问", "THE UNASKED QUESTION"],
    knowledge: ["知识库", "KNOWLEDGE BASE"],
    recall: ["主动回忆", "ACTIVE RECALL"],
    goals: ["目标推进", "GOAL BOARD"],
    options: ["路径选项", "PATH OPTIONS"],
    review: ["复盘中心", "REVIEW CENTER"],
    selfcheck: ["自我审视", "SELF-OBSERVATION"],
    settings: ["数据与隐私", "LOCAL DATA"]
  };

  const categories = ["学业", "职业", "金钱", "健康", "关系", "时间安排", "成长", "生活"];
  const eventTypes = ["学习", "工作", "项目", "荣誉", "生活", "关系", "旅行", "成长"];
  const noteTypes = ["事实", "原则", "方法", "灵感", "问题", "资料", "风险", "路径", "标准"];
  const goalDomains = ["学业", "体育", "职业", "健康", "财务", "关系", "成长"];
  const goalHorizons = ["30天", "本学期", "1年", "4年", "长期"];
  const resumeKinds = {
    education: "教育经历",
    work: "工作与实践",
    project: "项目经历",
    award: "荣誉与证书",
    other: "其他经历"
  };

  function seedState() {
    return {
      version: APP_VERSION,
      profile: {
        name: "你的名字",
        headline: "在这里写一句对自己的概括",
        location: "所在城市",
        email: "你的邮箱",
        phone: "",
        bio: "这是示例文字。你可以把这里换成自己的简介，记录你现在关注什么、正在往哪里走。",
        resumeSummary: "用三到五句话概括你的方向、能力和代表性经历。履历页会把它放在最上方。"
      },
      skills: ["示例技能", "沟通", "数据分析"],
      decisions: [
        {
          id: "seed-d1",
          date: "2026-09-18",
          title: "面对新机会，是马上答应还是先验证？",
          category: "成长",
          importance: 4,
          confidence: 4,
          options: "立即答应；先试用四周；直接拒绝",
          chosen: "先试用四周，再决定是否长期投入",
          reasons: "当时担心错过机会，也不想在没有了解时间成本前做出长期承诺。",
          feeling: "期待里带着一点焦虑",
          expected: "四周内能判断自己是否适合，也能验证对方是否靠谱。",
          outcome: 3,
          status: "已复盘",
          lesson: "先验证的方向是对的，但试用期开始时没有写清楚验收标准，导致判断拖到了第六周。",
          tags: ["机会", "边界", "验证"],
          sample: true,
          createdAt: "2026-09-18T10:00:00.000Z",
          updatedAt: "2026-09-18T10:00:00.000Z"
        },
        {
          id: "seed-d2",
          date: "2026-08-22",
          title: "怎样安排晚间训练和学习时间？",
          category: "健康",
          importance: 3,
          confidence: 3,
          options: "每天都排满；固定训练日；完全暂停训练",
          chosen: "固定每周三次训练，其余晚上留给学习",
          reasons: "连续排满导致睡眠变差，学习效率也下降。",
          feeling: "疲惫，但不愿意彻底放弃",
          expected: "训练保持连续性，同时把每周学习时间稳定下来。",
          outcome: 4,
          status: "已复盘",
          lesson: "固定边界比每天临时决定有效。真正的关键不是意志力，而是提前减少选项。",
          tags: ["习惯", "睡眠", "时间安排"],
          sample: true,
          createdAt: "2026-08-22T10:00:00.000Z",
          updatedAt: "2026-08-22T10:00:00.000Z"
        },
        {
          id: "seed-d3",
          date: "2026-10-04",
          title: "要不要在信息不完整时先做公开承诺？",
          category: "职业",
          importance: 4,
          confidence: 3,
          options: "立即公开承诺；等方案完整；只向信任的人说明",
          chosen: "先向少数信任的人说明，再补方案",
          reasons: "公开承诺能增加约束，但在细节没有定下来时也可能制造错误预期。",
          feeling: "想尽快推进，同时对失控有点担心",
          expected: "既不拖延，也不过度承诺。",
          outcome: 0,
          status: "待复盘",
          lesson: "",
          tags: ["承诺", "职业", "信息不足"],
          sample: true,
          createdAt: "2026-10-04T10:00:00.000Z",
          updatedAt: "2026-10-04T10:00:00.000Z"
        }
      ],
      events: [
        {
          id: "seed-e1",
          date: "2026-10-30",
          title: "开始建立自己的第二大脑",
          type: "成长",
          place: "本机",
          description: "把散落的经历、选择和履历放进同一个私人空间。这是一条示例记录，可以从数据页清除。",
          people: "",
          tags: ["第二大脑", "记录"],
          sample: true,
          createdAt: "2026-10-30T10:00:00.000Z",
          updatedAt: "2026-10-30T10:00:00.000Z"
        },
        {
          id: "seed-e2",
          date: "2026-09-01",
          title: "进入新的学习阶段",
          type: "学习",
          place: "学校",
          description: "把这一学期的目标、课程和想尝试的方向先写下来，之后可以在复盘时回看。",
          people: "导师；同学",
          tags: ["新学期", "目标"],
          sample: true,
          createdAt: "2026-09-01T10:00:00.000Z",
          updatedAt: "2026-09-01T10:00:00.000Z"
        },
        {
          id: "seed-e3",
          date: "2025-07-15",
          title: "完成一次独立实践",
          type: "项目",
          place: "重庆",
          description: "这里可以记录背景、你负责的部分、遇到的困难、最终结果和可验证的材料链接。",
          people: "合作者",
          tags: ["实践", "协作"],
          sample: true,
          createdAt: "2025-07-15T10:00:00.000Z",
          updatedAt: "2025-07-15T10:00:00.000Z"
        }
      ],
      resumeItems: [
        {
          id: "seed-r1",
          kind: "education",
          title: "你的专业或学习方向",
          organization: "学校名称",
          start: "2024-09",
          end: "至今",
          description: "写清楚专业、研究重点、核心课程或你认为最能代表能力的经历。",
          tags: [],
          sample: true,
          createdAt: "2026-10-30T10:00:00.000Z",
          updatedAt: "2026-10-30T10:00:00.000Z"
        },
        {
          id: "seed-r2",
          kind: "project",
          title: "一个代表性项目",
          organization: "项目角色",
          start: "2025-06",
          end: "2025-08",
          description: "用动作、方法和结果来描述，不要只写“参与了”。例如：负责需求梳理，形成 3 套方案，最终让参与人数增加 20%。",
          tags: ["示例"],
          sample: true,
          createdAt: "2026-10-30T10:00:00.000Z",
          updatedAt: "2026-10-30T10:00:00.000Z"
        }
      ],
      ui: {
        page: "overview",
        decisionCategory: "全部",
        decisionStatus: "全部",
        timelineType: "全部",
        knowledgeType: "全部",
        recallIndex: 0,
        recallShowAnswer: false
      }
    };
  }

  function realProfileState() { return cleanState(); }

  function cleanState() {
    const next = seedState();
    next.decisions = [];
    next.events = [];
    next.resumeItems = [];
    next.notes = [];
    next.goals = [];
    next.reviews = [];
    next.checkins = [];
    next.deepReflections = [];
    next.skills = [];
    next.syncedBatchIds = [];
    next.syncLogs = [];
    return next;
  }

  function applySyncBatches(current) {
    const batches = Array.isArray(window.XIANTU_SYNC_BATCHES) ? window.XIANTU_SYNC_BATCHES : [];
    current.syncedBatchIds = Array.isArray(current.syncedBatchIds) ? current.syncedBatchIds : [];
    current.syncLogs = Array.isArray(current.syncLogs) ? current.syncLogs : [];
    const collections = ["decisions", "events", "resumeItems", "notes", "goals", "options", "reviews", "checkins", "deepReflections"];
    for (const batch of batches) {
      if (!batch || !batch.id || current.syncedBatchIds.includes(batch.id)) continue;
      for (const collection of collections) {
        const incoming = Array.isArray(batch.entries?.[collection]) ? batch.entries[collection] : [];
        current[collection] = Array.isArray(current[collection]) ? current[collection] : [];
        const existingIds = new Set(current[collection].map(item => item.id));
        incoming.forEach(item => {
          if (item?.id && !existingIds.has(item.id)) {
            current[collection].push(item);
            existingIds.add(item.id);
          }
        });
      }
      const updates = Array.isArray(batch.updates) ? batch.updates : [];
      updates.forEach(update => {
        if (!collections.includes(update?.collection) || !update.id || !update.patch) return;
        const target = (current[update.collection] || []).find(item => item.id === update.id);
        if (!target) return;
        const expected = update.expect || {};
        const canApply = Object.entries(expected).every(([key, value]) => String(target[key] ?? "") === String(value ?? ""));
        if (canApply) Object.assign(target, update.patch, { updatedAt: update.patch.updatedAt || new Date().toISOString() });
      });
      if (batch.profile) {
        current.profile = { ...current.profile };
        Object.entries(batch.profile).forEach(([key, value]) => {
          if (!current.profile[key]) current.profile[key] = value;
        });
      }
      current.syncedBatchIds.push(batch.id);
      current.syncLogs.unshift({
        id: batch.id,
        createdAt: batch.createdAt || new Date().toISOString(),
        summary: batch.summary || "对话同步",
        source: batch.source || "Codex conversation"
      });
    }
    return current;
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return applySyncBatches(realProfileState());
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== "object") return applySyncBatches(realProfileState());
      if ((parsed.version || 1) < APP_VERSION) {
        localStorage.setItem(`${STORAGE_KEY}.backup-before-v${APP_VERSION}`, saved);
        const next = realProfileState();
        next.deepReflections = Array.isArray(parsed.deepReflections) ? parsed.deepReflections : [];
        next.notes = [...next.notes, ...(Array.isArray(parsed.notes) ? parsed.notes.filter(item => !String(item.id || "").startsWith("note-seed-")) : [])];
        next.goals = Array.isArray(parsed.goals) ? parsed.goals : [];
        next.reviews = Array.isArray(parsed.reviews) ? parsed.reviews : [];
        next.checkins = Array.isArray(parsed.checkins) ? parsed.checkins : [];
        const keepUserRecord = item => !item.sample && !String(item.id || "").startsWith("profile-");
        next.decisions = [...next.decisions, ...(Array.isArray(parsed.decisions) ? parsed.decisions.filter(keepUserRecord) : [])];
        next.events = [...next.events, ...(Array.isArray(parsed.events) ? parsed.events.filter(keepUserRecord) : [])];
        next.resumeItems = [...next.resumeItems, ...(Array.isArray(parsed.resumeItems) ? parsed.resumeItems.filter(keepUserRecord) : [])];
        if (parsed.ui) next.ui = { ...next.ui, ...parsed.ui };
        return applySyncBatches(next);
      }
      const base = realProfileState();
      return applySyncBatches({
        ...base,
        ...parsed,
        profile: { ...base.profile, ...(parsed.profile || {}) },
        decisions: Array.isArray(parsed.decisions) ? parsed.decisions : [],
        events: Array.isArray(parsed.events) ? parsed.events : [],
        resumeItems: Array.isArray(parsed.resumeItems) ? parsed.resumeItems : [],
        deepReflections: Array.isArray(parsed.deepReflections) ? parsed.deepReflections : [],
        notes: Array.isArray(parsed.notes) ? parsed.notes : base.notes,
        goals: Array.isArray(parsed.goals) ? parsed.goals : [],
        reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
        checkins: Array.isArray(parsed.checkins) ? parsed.checkins : [],
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        ui: { ...base.ui, ...(parsed.ui || {}) }
      });
    } catch {
      return applySyncBatches(seedState());
    }
  }

  let state = loadState();
  let searchTimer = 0;
  let toastTimer = 0;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const escapeAttr = escapeHtml;
  const clamp = (number, min, max) => Math.min(max, Math.max(min, number));
  const toNumber = (value, fallback = 0) => {
    const number = Number.parseInt(value, 10);
    return Number.isFinite(number) ? number : fallback;
  };
  const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const splitTags = value => String(value || "")
    .split(/[,，;；\n]/)
    .map(item => item.trim())
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index)
    .slice(0, 12);
  const splitPeople = value => String(value || "")
    .split(/[,，;；、\n]/)
    .map(item => item.trim())
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index);
  const isoDate = value => /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
  const eventSortValue = item => String(item.sortDate || item.date || "");

  function formatDate(value) {
    if (!isoDate(value)) return escapeHtml(value || "日期未填");
    const [year, month, day] = value.split("-");
    return `${year}.${month}.${day}`;
  }

  function formatShortDate(value) {
    if (!isoDate(value)) return escapeHtml(value || "");
    const [, month, day] = value.split("-");
    return `${month}.${day}`;
  }

  function formatPeriod(start, end = "") {
    const clean = value => String(value || "").replaceAll("-", ".");
    return [clean(start), clean(end)].filter(Boolean).join(" — ") || "时间未填";
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent("xiantu:save", { detail: { at: new Date().toISOString() } }));
      return true;
    } catch {
      showToast("保存失败。浏览器存储可能已满，请先导出备份。");
      return false;
    }
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function getDecisionStats() {
    const decisions = state.decisions;
    const reviewed = decisions.filter(item => item.status === "已复盘" && toNumber(item.outcome) > 0);
    const confidenceKnown = reviewed.filter(item => toNumber(item.confidence) > 0);
    const avgConfidence = confidenceKnown.length
      ? confidenceKnown.reduce((sum, item) => sum + toNumber(item.confidence), 0) / confidenceKnown.length
      : 0;
    const avgOutcome = reviewed.length
      ? reviewed.reduce((sum, item) => sum + toNumber(item.outcome), 0) / reviewed.length
      : 0;
    const highConfidenceLowResult = confidenceKnown.filter(item => toNumber(item.confidence) >= 4 && toNumber(item.outcome) <= 2).length;
    const lowConfidenceGoodResult = confidenceKnown.filter(item => toNumber(item.confidence) <= 2 && toNumber(item.outcome) >= 4).length;
    const aligned = confidenceKnown.filter(item => Math.abs(toNumber(item.confidence) - toNumber(item.outcome)) <= 1).length;
    const reviewRate = decisions.length ? reviewed.length / decisions.length : 0;
    const categoryCounts = categories.map(category => ({
      label: category,
      count: decisions.filter(item => item.category === category).length
    })).filter(item => item.count > 0).sort((a, b) => b.count - a.count);
    return {
      total: decisions.length,
      reviewed: reviewed.length,
      reviewRate,
      avgConfidence,
      avgOutcome,
      highConfidenceLowResult,
      lowConfidenceGoodResult,
      aligned,
      categoryCounts
    };
  }

  function countConnections() {
    const values = [];
    state.decisions.forEach(item => values.push(...(item.tags || [])));
    state.events.forEach(item => {
      values.push(...(item.tags || []));
      values.push(...splitPeople(item.people));
    });
    state.resumeItems.forEach(item => values.push(...(item.tags || [])));
    state.notes.forEach(item => values.push(...(item.tags || [])));
    (state.goals || []).forEach(item => values.push(...(item.tags || [])));
    return new Set(values.filter(Boolean)).size;
  }

  function pageHeader(eyebrow, title, description, action = "") {
    return `
      <div class="page-head">
        <div>
          <span class="eyebrow">${escapeHtml(eyebrow)}</span>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)}</p>
        </div>
        ${action}
      </div>`;
  }

  function sampleNotice() {
    const hasSamples = state.decisions.some(item => item.sample)
      || state.events.some(item => item.sample)
      || state.resumeItems.some(item => item.sample);
    if (!hasSamples) return "";
    return `
      <div class="notice-strip">
        <svg class="icon"><use href="#i-info"></use></svg>
        <p>当前含有带“示例”标记的内容，数量统计也会包含它们。看懂页面后可清除示例，再开始记录自己。</p>
        <button data-action="clear-samples">清除示例</button>
      </div>`;
  }

  function renderOverview() {
    const stats = getDecisionStats();
    const recentEvents = [...state.events].sort((a, b) => eventSortValue(b).localeCompare(eventSortValue(a))).slice(0, 4);
    const reviewedText = `${Math.round(stats.reviewRate * 100)}%`;
    const categoriesMax = Math.max(1, ...stats.categoryCounts.map(item => item.count));
    const categoryBars = stats.categoryCounts.length
      ? stats.categoryCounts.slice(0, 5).map(item => `
          <div class="pattern-row">
            <span>${escapeHtml(item.label)}</span>
            <div class="bar"><i style="--bar:${Math.max(8, item.count / categoriesMax * 100)}%"></i></div>
            <strong>${item.count}</strong>
          </div>`).join("")
      : `<p class="muted small">记录第一项决策后，这里会出现类型分布。</p>`;

    const platformPatternCount = state.decisions.filter(item => /平台|竞争|冲刺|强校|更高位置/.test(
      [item.title, item.chosen, item.reasons, item.expected, item.lesson, ...(item.tags || [])].join(" ")
    )).length;
    let insight = "还不足以判断习惯。至少完成 5 次带结果的复盘，再观察模式。";
    if (stats.reviewed >= 3 && platformPatternCount >= 3) {
      insight = `初步线索：已复盘的 ${stats.reviewed} 次选择都在比较平台上限、竞争密度和可选路径，包括放弃确定保送、优先体育强校环境、以及后来切换竞争赛道。样本仍然很少，这是一种阶段性策略，不足以概括长期性格。`;
    } else if (stats.reviewed >= 3) {
      if (stats.highConfidenceLowResult > 0) {
        insight = `已复盘 ${stats.reviewed} 次，其中 ${stats.highConfidenceLowResult} 次出现“信心高、结果低于预期”。可以回看当时遗漏了哪些信息。`;
      } else if (stats.aligned === stats.reviewed) {
        insight = `已复盘 ${stats.reviewed} 次，信心与结果大多接近。继续积累样本，暂时不要把它当成稳定的性格结论。`;
      } else {
        insight = `已复盘 ${stats.reviewed} 次。注意：这里的“模式”只是数量线索，不能替代事实和具体情境。`;
      }
    }

    const eventRows = recentEvents.length
      ? recentEvents.map(item => `
          <div class="mini-event">
            <time>${formatShortDate(item.date)}</time>
            <div>
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.place || "经历")}</span>
            </div>
            <span class="type-pill">${escapeHtml(item.type)}</span>
          </div>`).join("")
      : `<div class="empty-state">
          <div class="empty-mark"><svg class="icon"><use href="#i-timeline"></use></svg></div>
          <h4>还没有人生记录</h4>
          <p>先写下最近发生的一件重要小事。</p>
          <button class="secondary-button" data-action="new" data-type="event">记录经历</button>
        </div>`;

    const date = new Date();
    const dateText = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric" }).format(date);
    const weekday = new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(date);

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        <section class="hero">
          <div class="hero-copy">
            <div class="hero-kicker">你的私人判断档案</div>
            <h2>${escapeHtml(state.profile.name)}，把经历过的事，变成<em>下一次判断的依据</em>。</h2>
            <p>${escapeHtml(state.profile.headline || "记录选择、经历和变化。这里只属于你，不需要表演给任何人看。")}</p>
            <div class="hero-actions">
              <button class="primary-button" data-action="new" data-type="decision">
                <svg class="icon"><use href="#i-decisions"></use></svg>复盘一个决定
              </button>
              <button class="secondary-button" data-action="navigate" data-page="timeline">
                写下今天 <svg class="icon"><use href="#i-arrow"></use></svg>
              </button>
            </div>
          </div>
          <div class="hero-aside">
            <div class="today-date">${dateText}</div>
            <div class="today-day">${weekday} · ${date.getFullYear()}</div>
            <div class="daily-question">
              <span>今日自问</span>
              <p>我现在做的选择，三个月后还愿意为它负责吗？</p>
            </div>
          </div>
        </section>
        ${sampleNotice()}
        <section class="metric-grid" aria-label="数据概览">
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-decisions"></use></svg>已记录决策</div>
            <div class="metric-value">${stats.total}</div>
            <div class="metric-note"><strong>${stats.reviewed}</strong> 条已有结果复盘</div>
          </article>
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-check"></use></svg>复盘完成度</div>
            <div class="metric-value">${reviewedText}</div>
            <div class="metric-note">让选择形成闭环，而不只是归档</div>
          </article>
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-timeline"></use></svg>人生节点</div>
            <div class="metric-value">${state.events.length}</div>
            <div class="metric-note">学习、工作、项目与生活经历</div>
          </article>
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-network"></use></svg>已有关联</div>
            <div class="metric-value">${countConnections()}</div>
            <div class="metric-note">由标签、人名和经历共同形成</div>
          </article>
        </section>
        ${dailyActionsPanel()}
        <section class="dashboard-grid">
          <div class="stack">
            <article class="panel">
              <header class="panel-head">
                <div class="panel-title">
                  <svg class="icon"><use href="#i-timeline"></use></svg><h3>最近的人生轨迹</h3>
                </div>
                <button class="text-button" data-action="navigate" data-page="timeline">查看全部</button>
              </header>
              <div class="timeline-mini">${eventRows}</div>
            </article>
            <article class="panel">
              <header class="panel-head">
                <div class="panel-title">
                  <svg class="icon"><use href="#i-decisions"></use></svg><h3>待复盘的选择</h3>
                </div>
                <button class="text-button" data-action="navigate" data-page="decisions">打开决策本</button>
              </header>
              ${pendingDecisionRows()}
            </article>
          </div>
          <div class="stack">
            <article class="panel">
              <header class="panel-head">
                <div class="panel-title">
                  <svg class="icon"><use href="#i-spark"></use></svg><h3>决策类型分布</h3>
                </div>
              </header>
              <div class="pattern-list">${categoryBars}</div>
              <div class="insight-box">${escapeHtml(insight)}</div>
            </article>
            <article class="panel">
              <header class="panel-head">
                <div class="panel-title">
                  <svg class="icon"><use href="#i-plus"></use></svg><h3>快速开始</h3>
                </div>
              </header>
              <div class="quick-links">
                <button class="quick-link" data-action="new" data-type="decision">
                  <svg class="icon"><use href="#i-decisions"></use></svg>
                  <span><strong>复盘决定</strong><small>写清当时怎么想</small></span>
                </button>
                <button class="quick-link" data-action="new" data-type="note">
                  <svg class="icon"><use href="#i-search"></use></svg>
                  <span><strong>收进知识库</strong><small>事实、方法或灵感</small></span>
                </button>
                <button class="quick-link" data-action="navigate" data-page="selfcheck">
                  <svg class="icon"><use href="#i-user"></use></svg>
                  <span><strong>本周自省</strong><small>观察精力与专注</small></span>
                </button>
                <button class="quick-link" data-action="navigate" data-page="settings">
                  <svg class="icon"><use href="#i-shield"></use></svg>
                  <span><strong>导出备份</strong><small>让数据真正属于你</small></span>
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>`;
  }

  function pendingDecisionRows() {
    const pending = state.decisions
      .filter(item => item.status !== "已复盘")
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .slice(0, 3);
    if (!pending.length) {
      return `<div class="empty-state">
        <div class="empty-mark"><svg class="icon"><use href="#i-check"></use></svg></div>
        <h4>目前没有待复盘记录</h4>
        <p>可以继续记录下一个重要选择。</p>
      </div>`;
    }
    return `<div class="card-list">${pending.map(item => `
      <article class="record-card">
        <div class="record-card-head">
          <div>
            <div class="record-meta">
              <time>${formatDate(item.date)}</time>
              <span class="type-pill">${escapeHtml(item.category)}</span>
              <span class="status-pill pending">待复盘</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.chosen || "还没有写下最终选择")}</p>
          </div>
          <div class="record-actions">
            <button class="icon-button" title="编辑" data-action="edit" data-type="decision" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-edit"></use></svg></button>
          </div>
        </div>
      </article>`).join("")}</div>`;
  }

  function dailyActionsPanel() {
    const actions = [];
    const recallDue = state.notes.filter(item => item.reviewQuestion && isNoteDue(item)).length;
    const goalDue = (state.goals || []).filter(item => item.status !== "已完成" && item.reviewDate && item.reviewDate <= todayIso()).length;
    const pending = state.decisions.filter(item => item.status !== "已复盘").length;
    const lastCheckin = [...(state.checkins || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];
    if (recallDue) actions.push({ label: `复习 ${recallDue} 张到期知识卡`, note: "先回忆，再核对答案", page: "recall" });
    if (goalDue) actions.push({ label: `检查 ${goalDue} 个到日期的目标`, note: "更新进度或调整下一步", page: "goals" });
    if (pending) actions.push({ label: `闭环 ${pending} 条决策`, note: "补上结果和事后结论", page: "decisions" });
    if (!lastCheckin || daysSince(lastCheckin.date) >= 7) actions.push({ label: "记录一次本周状态", note: "观察精力、专注和掌控感", page: "selfcheck" });
    if (!actions.length) actions.push({ label: "今天没有逾期事项", note: "可以整理一条新知识或推进长期目标", page: "goals" });
    return `<article class="panel daily-panel">
      <header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-spark"></use></svg><h3>今天可以推进</h3></div><span class="analysis-note">自动汇总待复盘、待复习和目标</span></header>
      <div class="daily-actions">${actions.map(item => `<button data-action="navigate" data-page="${item.page}"><span>${escapeHtml(item.label)}</span><small>${escapeHtml(item.note)}</small><svg class="icon"><use href="#i-arrow"></use></svg></button>`).join("")}</div>
    </article>`;
  }

  function renderDecisions() {
    const filtered = state.decisions
      .filter(item => state.ui.decisionCategory === "全部" || item.category === state.ui.decisionCategory)
      .filter(item => state.ui.decisionStatus === "全部" || item.status === state.ui.decisionStatus)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const stats = getDecisionStats();
    const cards = filtered.length
      ? `<div class="card-list">${filtered.map(decisionCard).join("")}</div>`
      : `<div class="empty-state">
          <div class="empty-mark"><svg class="icon"><use href="#i-decisions"></use></svg></div>
          <h4>这个筛选下还没有记录</h4>
          <p>决策不一定是大事，任何值得回看的选择都可以写。</p>
          <button class="primary-button" data-action="new" data-type="decision">新建决策复盘</button>
        </div>`;

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("DECISION JOURNAL", "决策复盘", "把当时知道什么、忽略了什么、后来发生了什么写在一起。目的不是证明自己永远正确，而是减少下一次的重复代价。",
          `<button class="primary-button" data-action="new" data-type="decision"><svg class="icon"><use href="#i-plus"></use></svg>新建复盘</button>`)}
        ${sampleNotice()}
        <section class="metric-grid">
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-decisions"></use></svg>全部决策</div>
            <div class="metric-value">${stats.total}</div><div class="metric-note">包含待复盘与已复盘</div>
          </article>
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-check"></use></svg>已形成闭环</div>
            <div class="metric-value">${stats.reviewed}</div><div class="metric-note">完成度 ${Math.round(stats.reviewRate * 100)}%</div>
          </article>
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-spark"></use></svg>平均决策信心</div>
            <div class="metric-value">${stats.avgConfidence ? stats.avgConfidence.toFixed(1) : "—"}</div><div class="metric-note">满分 5，未填写信心的记录不计入</div>
          </article>
          <article class="metric-card">
            <div class="metric-label"><svg class="icon"><use href="#i-arrow"></use></svg>结果高于预期</div>
            <div class="metric-value">${stats.lowConfidenceGoodResult}</div><div class="metric-note">低信心、好结果，可能低估了自己</div>
          </article>
        </section>
        <div class="toolbar">
          <select class="filter-select" id="decisionCategory" aria-label="按决策类型筛选">
            ${["全部", ...categories].map(value => `<option ${state.ui.decisionCategory === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
          </select>
          <select class="filter-select" id="decisionStatus" aria-label="按复盘状态筛选">
            ${["全部", "待复盘", "已复盘"].map(value => `<option ${state.ui.decisionStatus === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
          </select>
          <span class="filter-label">当前显示 ${filtered.length} 条 · 按日期倒序</span>
        </div>
        ${cards}
      </div>`;
  }

  function decisionCard(item) {
    const reviewed = item.status === "已复盘";
    const outcomeText = reviewed && toNumber(item.outcome) > 0 ? `${item.outcome} / 5` : "待补";
    return `
      <article class="record-card">
        <div class="record-card-head">
          <div>
            <div class="record-meta">
              <time>${formatDate(item.date)}</time>
              <span class="type-pill">${escapeHtml(item.category)}</span>
              <span class="status-pill ${reviewed ? "reviewed" : "pending"}">${escapeHtml(item.status)}</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.chosen || "尚未记录最终选择")}</p>
          </div>
          <div class="record-actions">
            <button class="icon-button" title="编辑" data-action="edit" data-type="decision" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-edit"></use></svg></button>
            <button class="icon-button danger-button" title="删除这一条" data-action="delete" data-type="decision" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-trash"></use></svg></button>
          </div>
        </div>
        <div class="record-details">
          <div class="record-detail"><label>当时信心</label><span>${toNumber(item.confidence) || "—"} / 5</span></div>
          <div class="record-detail"><label>事后结果</label><span>${outcomeText}</span></div>
          <div class="record-detail"><label>重要程度</label><span>${toNumber(item.importance) || "—"} / 5</span></div>
        </div>
        ${(item.options || item.reasons || item.expected || item.feeling || item.failureSignal || item.stopCondition || item.reviewDate) ? `
          <details class="decision-expand">
            <summary>查看当时的选项、依据和预期</summary>
            <div class="decision-detail-grid">
              ${item.options ? `<div class="record-detail"><label>当时选项</label><span>${escapeHtml(item.options)}</span></div>` : ""}
              ${item.reasons ? `<div class="record-detail"><label>选择依据</label><span>${escapeHtml(item.reasons)}</span></div>` : ""}
              ${item.expected ? `<div class="record-detail"><label>当时预期</label><span>${escapeHtml(item.expected)}</span></div>` : ""}
              ${item.feeling ? `<div class="record-detail"><label>当时情绪</label><span>${escapeHtml(item.feeling)}</span></div>` : ""}
              ${item.failureSignal ? `<div class="record-detail"><label>失败预警信号</label><span>${escapeHtml(item.failureSignal)}</span></div>` : ""}
              ${item.stopCondition ? `<div class="record-detail"><label>停止或调整条件</label><span>${escapeHtml(item.stopCondition)}</span></div>` : ""}
              ${item.reviewDate ? `<div class="record-detail"><label>计划复盘日</label><span>${formatDate(item.reviewDate)}</span></div>` : ""}
            </div>
          </details>` : ""}
        ${item.lesson ? `<div class="insight-box"><strong>事后结论：</strong>${escapeHtml(item.lesson)}</div>` : ""}
        ${(item.tags || []).length ? `<div class="record-tags">${item.tags.map(tag => `<span class="tag"># ${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      </article>`;
  }

  function renderTimeline() {
    const filtered = state.events
      .filter(item => state.ui.timelineType === "全部" || item.type === state.ui.timelineType)
      .sort((a, b) => eventSortValue(b).localeCompare(eventSortValue(a)));
    const grouped = filtered.reduce((groups, item) => {
      const group = item.group || (/^\d{4}/.test(String(item.date)) ? String(item.date).slice(0, 4) : "成长阶段");
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
      return groups;
    }, {});
    const timeline = Object.keys(grouped).length
      ? Object.entries(grouped).map(([group, items]) => `
          <div class="timeline-year">${escapeHtml(group)}${/^\d{4}$/.test(group) ? " 年" : ""}</div>
          ${items.map(eventTimelineEntry).join("")}
        `).join("")
      : `<div class="empty-state">
          <div class="empty-mark"><svg class="icon"><use href="#i-timeline"></use></svg></div>
          <h4>这条时间线上还没有记录</h4>
          <p>选择一个日期，写下发生的事和它为什么重要。</p>
          <button class="primary-button" data-action="new" data-type="event">记录人生经历</button>
        </div>`;

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("LIFE TIMELINE", "人生轨迹", "不只记录“我获得了什么”，也记录转折、关系、选择和那些改变方向的小事。",
          `<button class="primary-button" data-action="new" data-type="event"><svg class="icon"><use href="#i-plus"></use></svg>记录经历</button>`)}
        ${state.events.some(item => item.inferred) ? `<div class="notice-strip"><svg class="icon"><use href="#i-info"></use></svg><p>带“年份推算”的节点，是根据2026年高中毕业和国内常规学制倒推的；具体月份或转学月份可能与你实际经历略有差异。</p></div>` : ""}
        ${sampleNotice()}
        <div class="toolbar">
          <select class="filter-select" id="timelineType" aria-label="按经历类型筛选">
            ${["全部", ...eventTypes].map(value => `<option ${state.ui.timelineType === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
          </select>
          <span class="filter-label">${filtered.length} 个节点 · 按时间倒序</span>
        </div>
        <section class="timeline-full">${timeline}</section>
      </div>`;
  }

  function eventTimelineEntry(item) {
    return `
      <article class="timeline-entry">
        <time class="timeline-date">${formatDate(item.date)}</time>
        <div class="timeline-axis"></div>
        <div class="record-card">
          <div class="record-card-head">
            <div>
              <div class="record-meta">
                <span class="type-pill">${escapeHtml(item.type)}</span>
                ${item.place ? `<span class="event-place">${escapeHtml(item.place)}</span>` : ""}
                ${item.inferred ? `<span class="tag inferred-tag">年份推算</span>` : ""}
                ${item.sample ? `<span class="tag">示例</span>` : ""}
              </div>
              <h3>${escapeHtml(item.title)}</h3>
              ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
            </div>
            <div class="record-actions">
              <button class="icon-button" title="编辑" data-action="edit" data-type="event" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-edit"></use></svg></button>
              <button class="icon-button danger-button" title="删除这一条" data-action="delete" data-type="event" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-trash"></use></svg></button>
            </div>
          </div>
          ${item.people ? `<div class="record-details"><div class="record-detail"><label>相关人物</label><span>${escapeHtml(item.people)}</span></div></div>` : ""}
          ${(item.tags || []).length ? `<div class="record-tags">${item.tags.map(tag => `<span class="tag"># ${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        </div>
      </article>`;
  }

  function renderResume() {
    const profile = state.profile;
    const order = ["education", "work", "project", "award", "other"];
    const resumePriority = {
      "profile-r1": 1, "profile-r2": 2, "profile-r3": 3, "profile-r4": 4, "profile-r5": 5,
      "profile-a1": 1, "profile-a2": 2, "profile-a3": 3, "profile-a4": 4,
      "profile-a5": 5, "profile-a6": 6, "profile-a7": 7
    };
    const sectionHtml = order.map(kind => {
      const items = state.resumeItems
        .filter(item => item.kind === kind)
        .sort((a, b) => {
          const aPriority = resumePriority[a.id];
          const bPriority = resumePriority[b.id];
          if (aPriority && bPriority) return aPriority - bPriority;
          return String(b.start).localeCompare(String(a.start));
        });
      if (!items.length) return "";
      return `
        <section class="resume-section">
          <h3>${resumeKinds[kind]}</h3>
          ${items.map(resumeItem).join("")}
        </section>`;
    }).join("");
    const skills = state.skills.length
      ? state.skills.map(skill => `<span class="skill-chip">${escapeHtml(skill)}</span>`).join("")
      : `<span class="resume-empty-note">还没有填写技能标签</span>`;

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("PRIVATE RÉSUMÉ", "履历档案", "同一份事实可以用于回顾成长，也可以整理成可打印的履历。只展示你选择写下来的内容。",
          `<div class="record-actions" style="opacity:1">
            <button class="secondary-button" data-action="edit-profile"><svg class="icon"><use href="#i-user"></use></svg>编辑资料</button>
            <button class="secondary-button" data-action="edit-skills"><svg class="icon"><use href="#i-tag"></use></svg>编辑技能</button>
            <button class="primary-button" data-action="new" data-type="resume"><svg class="icon"><use href="#i-plus"></use></svg>新增履历</button>
            <button class="primary-button" data-action="print"><svg class="icon"><use href="#i-print"></use></svg>打印 / PDF</button>
          </div>`)}
        ${state.resumeItems.some(item => item.inferred) ? `<div class="notice-strip"><svg class="icon"><use href="#i-info"></use></svg><p>履历中的“年份推算”表示起止时间由毕业年份和常规学制倒推，不是原始档案逐项记载。</p></div>` : ""}
        ${sampleNotice()}
        <article class="resume-sheet">
          <header class="resume-top">
            <div>
              <h2 class="resume-name">${escapeHtml(profile.name)}</h2>
              <p class="resume-headline">${escapeHtml(profile.headline)}</p>
            </div>
            <div class="resume-contact">
              ${profile.location ? `<span>${escapeHtml(profile.location)}</span>` : ""}
              ${profile.email ? `<span>${escapeHtml(profile.email)}</span>` : ""}
              ${profile.phone ? `<span>${escapeHtml(profile.phone)}</span>` : ""}
              ${profile.github ? `<span>GitHub：${escapeHtml(profile.github)}</span>` : ""}
            </div>
          </header>
          ${profile.bio ? `<p class="resume-summary">${escapeHtml(profile.bio)}</p>` : ""}
          ${profile.resumeSummary ? `<section class="resume-section"><h3>个人概述</h3><p class="resume-description">${escapeHtml(profile.resumeSummary)}</p></section>` : ""}
          ${sectionHtml || `<section class="resume-section"><h3>履历条目</h3><span class="resume-empty-note">点击右上角“新增履历”，添加教育、工作、项目或荣誉。</span></section>`}
          <section class="resume-section">
            <h3>能力与技能</h3>
            <div class="skill-cloud">${skills}</div>
          </section>
        </article>
      </div>`;
  }

  function resumeItem(item) {
    return `
      <article class="resume-item">
        <div class="resume-period">${formatPeriod(item.start, item.end)}${item.inferred ? `<span class="tag inferred-tag">年份推算</span>` : ""}</div>
        <div>
          <div class="record-card-head">
            <div>
              <h4>${escapeHtml(item.title)}</h4>
              <p class="resume-org">${escapeHtml(item.organization || "")}</p>
            </div>
            <div class="record-actions">
              <button class="icon-button" title="编辑" data-action="edit" data-type="resume" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-edit"></use></svg></button>
              <button class="icon-button danger-button" title="删除这一条" data-action="delete" data-type="resume" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-trash"></use></svg></button>
            </div>
          </div>
          ${item.description ? `<p class="resume-description">${escapeHtml(item.description)}</p>` : ""}
          ${(item.tags || []).length ? `<div class="record-tags">${item.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        </div>
      </article>`;
  }

  function renderNetwork() {
    const nodes = [
      ...state.events.map(item => ({ ...item, nodeType: "event", page: "timeline" })),
      ...state.decisions.map(item => ({ ...item, nodeType: "decision", page: "decisions" })),
      ...state.resumeItems.map(item => ({ ...item, nodeType: "resume", page: "resume" })),
      ...state.notes.map(item => ({ ...item, nodeType: "note", page: "knowledge" }))
    ].sort((a, b) => String(b.sortDate || b.date || b.start || "").localeCompare(String(a.sortDate || a.date || a.start || ""))).slice(0, 22);

    const people = state.events.flatMap(item => splitPeople(item.people));
    const tags = [
      ...state.decisions.flatMap(item => item.tags || []),
      ...state.events.flatMap(item => item.tags || []),
      ...state.resumeItems.flatMap(item => item.tags || [])
    ];
    const tagCount = new Map();
    tags.forEach(tag => tagCount.set(tag, (tagCount.get(tag) || 0) + 1));
    const strongestTags = [...tagCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("CONNECTIONS", "关系地图", "把经历、决定和履历放在同一张图上。这里不追求画得密，而是帮助你看见哪些主题值得继续追踪。",
          `<button class="primary-button" data-action="new" data-type="event"><svg class="icon"><use href="#i-plus"></use></svg>增加新节点</button>`)}
        ${sampleNotice()}
        <div class="network-layout">
          <section class="network-canvas" id="networkCanvas" aria-label="个人经历关系图">
            <svg id="networkLines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>
            <button class="network-node center" title="回到概览" data-action="navigate" data-page="overview">${escapeHtml(state.profile.name)}</button>
          </section>
          <aside class="stack">
            <article class="panel">
              <header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-network"></use></svg><h3>关系概况</h3></div></header>
              <div class="legend-list">
                <div class="legend-item"><span class="legend-dot"></span>人生经历</div>
                <div class="legend-item"><span class="legend-dot decision"></span>决策复盘</div>
                <div class="legend-item"><span class="legend-dot resume"></span>履历条目</div>
                <div class="legend-item"><span class="legend-dot note"></span>知识卡片</div>
              </div>
              <div style="margin-top:16px">
                <div class="network-stat"><span>关联节点</span><strong>${nodes.length}</strong></div>
                <div class="network-stat"><span>人物索引</span><strong>${new Set(people).size}</strong></div>
                <div class="network-stat"><span>主题标签</span><strong>${tagCount.size}</strong></div>
              </div>
            </article>
            <article class="panel">
              <header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-tag"></use></svg><h3>高频主题</h3></div></header>
              <div class="record-tags">
                ${strongestTags.length
                  ? strongestTags.map(([tag, count]) => `<span class="tag"># ${escapeHtml(tag)} · ${count}</span>`).join("")
                  : `<span class="muted small">记录更多标签后出现。</span>`}
              </div>
            </article>
            <article class="panel">
              <div class="insight-box" style="margin-top:0">
                关系图只表示“你把这些内容归在相近标签下”，不自动证明因果关系。点击节点可以直接回到对应记录页。
              </div>
            </article>
          </aside>
        </div>
      </div>`;

    drawNetwork(nodes);
  }

  function drawNetwork(nodes) {
    const canvas = $("#networkCanvas");
    const svg = $("#networkLines");
    if (!canvas || !svg) return;
    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 590;
    const positions = [];
    nodes.forEach((node, index) => {
      const ring = index < 8 ? 0 : 1;
      const count = ring === 0 ? Math.min(8, nodes.length) : nodes.length - 8;
      const ringIndex = ring === 0 ? index : index - 8;
      const angle = -Math.PI / 2 + (ringIndex / Math.max(1, count)) * Math.PI * 2 + (ring === 1 ? Math.PI / Math.max(1, count) : 0);
      const radiusX = ring === 0 ? width * .29 : width * .4;
      const radiusY = ring === 0 ? height * .29 : height * .39;
      positions.push({
        ...node,
        x: 50 + Math.cos(angle) * radiusX / width * 100,
        y: 50 + Math.sin(angle) * radiusY / height * 100
      });
    });
    const lineMarkup = positions.map(node => {
      const color = node.nodeType === "decision" ? "#d69d8e" : node.nodeType === "resume" ? "#d5bd87" : "#a5c3bd";
      return `<line x1="50" y1="50" x2="${node.x.toFixed(2)}" y2="${node.y.toFixed(2)}" stroke="${color}" stroke-width="0.22" vector-effect="non-scaling-stroke" />`;
    }).join("");
    svg.innerHTML = lineMarkup;

    const fragment = document.createDocumentFragment();
    positions.forEach(node => {
      const button = document.createElement("button");
      button.className = `network-node ${node.nodeType}`;
      button.style.left = `${node.x}%`;
      button.style.top = `${node.y}%`;
      button.title = node.title;
      button.dataset.action = "navigate";
      button.dataset.page = node.page;
      button.textContent = node.title.length > 12 ? `${node.title.slice(0, 11)}…` : node.title;
      fragment.appendChild(button);
    });
    canvas.appendChild(fragment);
  }

  function getInsightModel() {
    const decisions = state.decisions;
    const reviewed = decisions.filter(item => item.status === "已复盘" && toNumber(item.outcome) > 0);
    const confidenceKnown = reviewed.filter(item => toNumber(item.confidence) > 0);
    const avgConfidence = confidenceKnown.length
      ? confidenceKnown.reduce((sum, item) => sum + toNumber(item.confidence), 0) / confidenceKnown.length
      : 0;
    const avgOutcome = reviewed.length
      ? reviewed.reduce((sum, item) => sum + toNumber(item.outcome), 0) / reviewed.length
      : 0;
    const fields = ["options", "chosen", "reasons", "expected", "lesson"];
    const completeness = decisions.length
      ? decisions.reduce((sum, item) => sum + fields.filter(key => String(item[key] || "").trim()).length / fields.length, 0) / decisions.length
      : 0;
    const platformSignals = decisions.filter(item => /平台|竞争|冲刺|强校|更高位置/.test(
      [item.title, item.chosen, item.reasons, item.expected, item.lesson, ...(item.tags || [])].join(" ")
    )).length;
    const reviewedPlatformSignals = reviewed.filter(item => /平台|竞争|冲刺|强校|更高位置/.test(
      [item.title, item.chosen, item.reasons, item.expected, item.lesson, ...(item.tags || [])].join(" ")
    )).length;
    const domainMetrics = categories.map(category => {
      const items = decisions.filter(item => item.category === category);
      const done = items.filter(item => item.status === "已复盘" && toNumber(item.outcome) > 0);
      const known = done.filter(item => toNumber(item.confidence) > 0);
      return {
        category,
        count: items.length,
        reviewed: done.length,
        confidence: known.length ? known.reduce((sum, item) => sum + toNumber(item.confidence), 0) / known.length : 0,
        outcome: done.length ? done.reduce((sum, item) => sum + toNumber(item.outcome), 0) / done.length : 0
      };
    }).filter(item => item.count > 0);
    const reviewRate = decisions.length ? reviewed.length / decisions.length : 0;
    const calibrationGap = confidenceKnown.length
      ? confidenceKnown.reduce((sum, item) => sum + Math.abs(toNumber(item.confidence) - toNumber(item.outcome)), 0) / confidenceKnown.length
      : 0;
    const projects = state.resumeItems.filter(item => item.kind === "project");
    const awards = state.resumeItems.filter(item => item.kind === "award");
    const abilities = [
      { label: "专项成绩", score: Math.min(95, 45 + awards.filter(item => /二级|统考|冠军|第六名|第三名|优秀毕业生/.test([item.title, item.description].join(" "))).length * 8), evidence: "根据履历中的成绩与荣誉计算" },
      { label: "执行兑现", score: reviewed.length ? Math.round(avgOutcome * 20) : 0, evidence: `${reviewed.length} 条复盘的平均自评结果为 ${avgOutcome.toFixed(1)}/5` },
      { label: "组织协调", score: Math.min(95, 45 + state.resumeItems.filter(item => /团支书|书记|部长|组织|团支部/.test([item.title, item.organization, item.description].join(" "))).length * 8), evidence: "根据履历中的职责与经历计算" },
      { label: "跨域实践", score: Math.min(95, 55 + projects.length * 5), evidence: `${projects.length} 个独立项目，覆盖训练、志愿、信息与本地工具` },
      { label: "复盘能力", score: decisions.length ? Math.round(50 + completeness * 30 + Math.min(3, decisions.length) * 4) : 0, evidence: "五个核心复盘字段的完整度与有效样本数" },
      { label: "风险校准", score: Math.round(calibrationGap === 0 ? 80 : Math.max(45, 88 - calibrationGap * 22)), evidence: "基于信心与实际结果的偏差；仍需更多非学业决策" }
    ];
    return {
      decisions, reviewed, confidenceKnown, avgConfidence, avgOutcome, completeness,
      platformSignals, reviewedPlatformSignals, domainMetrics, reviewRate, calibrationGap, projects, awards, abilities
    };
  }

  function abilityRadar(items) {
    const cx = 230;
    const cy = 176;
    const radius = 116;
    const count = items.length;
    const pointAt = (index, factor) => {
      const angle = -Math.PI / 2 + index * Math.PI * 2 / count;
      return [cx + Math.cos(angle) * radius * factor, cy + Math.sin(angle) * radius * factor];
    };
    const polygon = values => values.map((value, index) => pointAt(index, value).map(number => number.toFixed(1)).join(",")).join(" ");
    const rings = [.25, .5, .75, 1].map(level => `<polygon points="${polygon(items.map(() => level))}" class="radar-ring"></polygon>`).join("");
    const axes = items.map((_, index) => {
      const [x, y] = pointAt(index, 1);
      return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="radar-axis"></line>`;
    }).join("");
    const labels = items.map((item, index) => {
      const [x, y] = pointAt(index, 1.19);
      const anchor = x > cx + 8 ? "start" : x < cx - 8 ? "end" : "middle";
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" class="radar-label">${escapeHtml(item.label)}</text>`;
    }).join("");
    const scorePolygon = `<polygon points="${polygon(items.map(item => item.score / 100))}" class="radar-shape"></polygon>`;
    const scoreDots = items.map((item, index) => {
      const [x, y] = pointAt(index, item.score / 100);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="radar-dot"></circle>`;
    }).join("");
    return `<svg class="ability-radar" viewBox="0 0 460 350" role="img" aria-label="个人能力雷达图">
      <g>${rings}${axes}</g>${scorePolygon}${scoreDots}${labels}
    </svg>`;
  }

  function decisionReview(item) {
    const reviews = {
      "profile-d1": {
        verdict: "A− · 阶段性强",
        strength: "把目标、竞争结构、家庭资源和可验证的体育成绩放在同一套判断里；转项后很快拿到可量化结果。",
        risk: "对“竞争者更弱”和“家庭资源可兑现”的判断仍偏主观；当前结果很亮眼，容易产生结果偏差，忽略同一条路可能失败的情形。",
        advice: "为下一次类似选择预设30、90、180天检查点，并提前写明伤病、成绩停滞和资源无法兑现时的退路。"
      },
      "profile-d2": {
        verdict: "A · 选择清晰",
        strength: "选项明确，愿意放弃已经拿到的确定性，换取更高平台；结果与当时目标一致。",
        risk: "当前记录主要保留了成功结果，没有记录如果中考失手时的保底安排和心理成本。",
        advice: "复盘时补一句：当时愿意承受的最坏结果是什么？什么信号意味着应该接受保底方案？"
      },
      "profile-d3": {
        verdict: "B+ · 事后回报高",
        strength: "选择时考虑了学校的体育传统和长期环境，而不只看录取结果；也为后来转体育留下空间。",
        risk: "“南中适合转体育”在事后看很清楚，但当时未必有同样明确的信息；本人已承认运气因素，这是好的校准。",
        advice: "以后遇到平台选择，先写出3条当时可验证的学校差异和一个反事实条件，避免只按结果解释决定。"
      },
      "sync-decision-money-001": {
        verdict: "B+ · 储蓄纪律初显",
        strength: "把非日常必需收入直接转为长期备用金，支出边界清楚；连续三个月执行说明方案具备初步可持续性。",
        risk: "尚未设置应急动用门槛，也可能为了储蓄过度压缩正常生活质量或必要投入。",
        advice: "把资金分成应急金和发展金，分别写明可用条件；每学期核对实际到账和结余。"
      },
      "sync-decision-money-002": {
        verdict: "A · 成本控制有效",
        strength: "先判断购买必要性，再利用价格趋势提前购买；同型号同配置的现价差约4000元，结果可核对。",
        risk: "省下的是未来购买成本，不是现金收益；若忽略设备折旧和提前占用资金，可能高估投资回报。",
        advice: "记录设备预计使用年限，按“总成本÷有效使用年数”判断，而不是只看首发价与现价的差额。"
      },
      "sync-decision-health-001": {
        verdict: "B · 自主行动有效",
        strength: "目标明确，训练和校运会结果形成正反馈，也验证了较强的自主执行能力。",
        risk: "当时缺少专业训练负荷与恢复记录，成功可能同时受天赋、基础和对手水平影响。",
        advice: "继续自行训练时保留周训练量、疼痛、睡眠和成绩变化，并至少保留一个外部反馈来源。"
      },
      "sync-decision-health-002": {
        verdict: "B · 结果好但医疗风险高",
        strength: "在备考窗口内选择了低强度恢复，并观察症状变化，避免了立即采取高干扰方案。",
        risk: "对自己实施康复训练缺乏医疗监督；两个月恢复不等于该方案适用于所有膝关节问题。",
        advice: "以后出现关节肿胀、疼痛或活动受限，先接受专业评估；记录红线和转诊条件，不把一次成功当作通用处方。"
      },
      "sync-decision-relationship-001": {
        verdict: "B · 能承受不认可",
        strength: "没有把精力消耗在争辩上，持续执行长期路径，并用升学结果完成回应。",
        risk: "“保持沉默”既可能是成熟边界，也可能屏蔽了对自己有用的反馈；不能把所有质疑都归因于他人认知不足。",
        advice: "以后先区分情绪性嘲讽与有效批评：前者可以不回应，后者应提取其中可验证的信息。"
      },
      "sync-decision-relationship-002": {
        verdict: "A− · 主动更换环境",
        strength: "识别团队氛围与个人目标不匹配后主动退出，建立自己的训练系统，结果达到了全省前列。",
        risk: "独自训练会失去教练纠错、同伴支持和安全监督；成绩成功可能掩盖方法上的偶然因素。",
        advice: "保留独立训练的同时，固定一位教练、教师或可信同伴做外部检查，专门负责发现盲点。"
      },
      "sync-decision-time-001": {
        verdict: "B · 高风险高回报",
        strength: "在明确目标和有限时间下迅速提高投入，执行力和承受力很强，最终进入南中。",
        risk: "每天约4小时睡眠不可持续，也可能损害健康、情绪和长期学习能力；成功不能证明这种作息普遍正确。",
        advice: "只在高价值且短期的截止任务中谨慎使用集中冲刺，同时设置睡眠和健康红线，不透支数周。"
      },
      "sync-decision-time-002": {
        verdict: "待验证 · 规划中",
        strength: "寒假目标与教学、实践和基层经验方向一致，并给出了“两项活动”的粗略成果标准。",
        risk: "支教与裁判工作能否落实、时间是否冲突、组织是否正规以及休息是否足够都还未确认。",
        advice: "报名后补齐活动日期、组织方、安全责任和可验证成果；至少保留一周恢复时间。"
      },
      "sync-decision-20261031-001": {
        verdict: "待决定 · 条件性",
        strength: "决策目标明确，补助后的自付和全部旅行费用已经拆分；学分、证书与奖学金也被列为可验证收益。",
        risk: "项目时间短、海外附加费用高，学分与奖学金承诺尚未书面确认；若只获得结业证书，简历增益可能有限。",
        advice: "先取得学院资助、学分转换、证书签发和拉夫堡官方关系四项书面确认，再按完整预算做决定。"
      }
    };
    return reviews[item.id] || {
      verdict: "待生成",
      strength: "这条决策已经进入记录，可继续补充当时依据和结果。",
      risk: "当前可用字段不足以形成专项评价。",
      advice: "补齐选项、选择理由、预期和结果后，再到成长洞察页重新查看。"
    };
  }

  function decisionProcessAudit(item) {
    const checks = [
      { label: "列出备选方案", weight: 12, met: Boolean(item.options) },
      { label: "写明选择依据", weight: 18, met: String(item.reasons || "").length >= 20 },
      { label: "写下当时预期", weight: 12, met: Boolean(item.expected) },
      { label: "记录当时信心", weight: 10, met: toNumber(item.confidence) > 0 },
      { label: "记录实际结果", weight: 12, met: toNumber(item.outcome) > 0 },
      { label: "形成事后结论", weight: 14, met: String(item.lesson || "").length >= 10 },
      { label: "预设失败预警", weight: 10, met: Boolean(item.failureSignal) },
      { label: "预设停止条件", weight: 12, met: Boolean(item.stopCondition) }
    ];
    const score = checks.reduce((sum, check) => sum + (check.met ? check.weight : 0), 0);
    return { score, missing: checks.filter(check => !check.met).map(check => check.label) };
  }

  function decisionChainHtml() {
    const byId = Object.fromEntries(state.decisions.map(item => [item.id, item]));
    if (!byId["profile-d1"] || !byId["profile-d2"] || !byId["profile-d3"]) {
      return `<div class="empty-state"><h4>决策链尚未形成</h4><p>至少记录三条有前后关系的选择后，这里会显示关联。</p></div>`;
    }
    return `
      <div class="decision-chain-visual">
        <article><span>01 · 前置选择</span><strong>放弃求是保送</strong><p>换取冲刺更高平台的机会</p></article>
        <div class="chain-arrow"><i></i><span>创造选择集</span><i></i></div>
        <article><span>02 · 环境选择</span><strong>南中而非四中</strong><p>体育强校环境保留后续转项可能</p></article>
        <div class="chain-arrow"><i></i><span>提供条件</span><i></i></div>
        <article><span>03 · 赛道转换</span><strong>文化转向体育</strong><p>使用成绩能力与家庭资源争取新位置</p></article>
      </div>
      <div class="chain-evidence-grid">
        <div><span class="relation-strength strong">强关联</span><h4>保送 → 南中</h4><p>你明确表示放弃保送后才获得了南中与四中的选择。先后顺序和依赖关系清楚。</p></div>
        <div><span class="relation-strength medium">中强关联</span><h4>南中 → 转体育</h4><p>南中的体育传统和训练环境提供了条件，但不构成必然因果；个人能力、家庭资源和当时决心同样参与其中。</p></div>
        <div><span class="relation-strength indirect">间接关联</span><h4>保送 → 转体育</h4><p>这不是直接因果，而是前一选择扩展了后续可选项，最终形成一条路径依赖。</p></div>
      </div>`;
  }

  function renderInsights() {
    const model = getInsightModel();
    const reviewRate = Math.round(model.reviewRate * 100);
    const confidenceText = model.avgConfidence ? model.avgConfidence.toFixed(1) : "—";
    const requiredDomains = ["金钱", "健康", "关系", "时间安排"];
    const requiredCoverage = requiredDomains.filter(domain => model.domainMetrics.some(item => item.category === domain && item.count >= 2)).length;
    const evidenceLevel = model.decisions.length >= 8 ? "中等" : model.decisions.length >= 5 ? "中低" : "低";
    const domainStyles = {
      "学业": "目标明确，愿意进入竞争更强的平台",
      "职业": "关注长期路径与资格门槛",
      "金钱": "会预判价格和成本，但更重结果、较少计算流动性",
      "健康": "信心偏低仍会自主行动，较依赖身体反馈",
      "关系": "环境不匹配时倾向独立或退出",
      "时间安排": "能高强度集中投入，但需防止透支",
      "成长": "会把经历用于探索下一步路径",
      "生活": "生活类样本仍不足"
    };
    const domainRows = model.domainMetrics.map(item => `
      <div class="domain-row">
        <strong>${escapeHtml(item.category)}</strong>
        <span>${item.count} 条 / ${item.reviewed} 已复盘</span>
        <span>${item.confidence ? item.confidence.toFixed(1) : "—"}</span>
        <span>${item.outcome ? item.outcome.toFixed(1) : "—"}</span>
        <p>${escapeHtml(domainStyles[item.category])}</p>
      </div>`).join("");
    const reviewCards = model.decisions.map(item => {
      const review = decisionReview(item);
      return `
        <article class="analysis-review-card">
          <div class="analysis-review-head">
            <div><span class="eyebrow">DECISION REVIEW</span><h4>${escapeHtml(item.title)}</h4></div>
            <span class="analysis-grade">${escapeHtml(review.verdict)}</span>
          </div>
          <div class="analysis-review-grid">
            <div><label>做得好的地方</label><p>${escapeHtml(review.strength)}</p></div>
            <div><label>风险或盲点</label><p>${escapeHtml(review.risk)}</p></div>
            <div><label>下一次怎么复盘</label><p>${escapeHtml(review.advice)}</p></div>
          </div>
        </article>`;
    }).join("");

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("DECISION INSIGHTS", "成长洞察", "从已经记录的选择、结果和经历中寻找重复出现的判断方式。这里描述的是当前样本中的阶段性倾向，不是心理诊断。",
          `<button class="secondary-button" data-action="refresh-insights"><svg class="icon"><use href="#i-spark"></use></svg>重新分析</button>`)}
        <section class="insights-hero">
          <div>
            <span class="eyebrow">CURRENT SIGNAL</span>
            <h3>你的跨领域主线是：高自主、结果导向，愿意离开不合适的路径；但风险预案仍偏弱。</h3>
            <p>目前覆盖了金钱、健康、关系和时间安排，每类已有2个样本。你能在不同领域采取行动，但健康类平均信心明显低于金钱、关系和时间类，说明你对身体相关判断更谨慎，也更依赖结果反馈。</p>
          </div>
          <div class="analysis-score">
            <strong>${requiredCoverage}/4</strong>
            <span>目标领域已补齐<br>每域至少 2 条样本</span>
          </div>
        </section>
        <div class="analysis-summary-strip">
          <div><span>分析样本</span><strong>${model.decisions.length} 条决策</strong></div>
          <div><span>平均信心</span><strong>${confidenceText} / 5</strong></div>
          <div><span>平均结果</span><strong>${model.reviewed.length ? model.avgOutcome.toFixed(1) : "—"} / 5</strong></div>
          <div><span>复盘完成度</span><strong>${reviewRate}%</strong></div>
          <div><span>结论置信度</span><strong>${evidenceLevel}</strong></div>
        </div>
        <article class="panel cross-domain-panel">
          <header class="panel-head">
            <div class="panel-title"><svg class="icon"><use href="#i-network"></use></svg><h3>跨领域稳定性</h3></div>
            <span class="analysis-note">样本来自自述，结论只作阶段性参考</span>
          </header>
          <div class="domain-table">
            <div class="domain-row domain-head"><strong>领域</strong><span>样本</span><span>信心</span><span>结果</span><p>观察到的倾向</p></div>
            ${domainRows}
          </div>
          <div class="cross-domain-conclusion">
            <div><span>较稳定</span><strong>自主决定 · 快速执行 · 目标导向</strong><p>无论学习、伤病、团队关系还是时间投入，你都更倾向自己定方向并承担后果。</p></div>
            <div><span>不够稳定</span><strong>信心水平会随领域变化</strong><p>金钱、关系和时间的信心约4.5，健康只有约2.5。健康决策可能更依赖不确定性下的个人判断。</p></div>
            <div><span>共同盲点</span><strong>证据与退出条件记录不足</strong><p>很多成功案例缺少事前失败标准，容易把“这次赢了”直接总结为“这种做法长期正确”。</p></div>
          </div>
        </article>
        <article class="panel decision-relations-panel">
          <header class="panel-head">
            <div class="panel-title"><svg class="icon"><use href="#i-network"></use></svg><h3>决策之间的关联</h3></div>
            <span class="analysis-note">先后关系 ≠ 必然因果</span>
          </header>
          ${decisionChainHtml()}
        </article>
        <article class="panel rationality-panel">
          <header class="panel-head">
            <div class="panel-title"><svg class="icon"><use href="#i-check"></use></svg><h3>决策合理性拆解</h3></div>
            <span class="analysis-note">看过程，不只看结果</span>
          </header>
          <p class="question-intro">当前${model.decisions.length}条决策中，${model.reviewed.length}条已有结果。多数都记录备选、依据和预期，但仍有${model.decisions.filter(item => !item.failureSignal || !item.stopCondition).length}条缺少完整失败预警或停止条件，这是最明显的理性缺口。</p>
          <div class="rationality-list">
            ${model.decisions.map(item => {
              const audit = decisionProcessAudit(item);
              return `<div class="rationality-row">
                <div><strong>${escapeHtml(item.title)}</strong><span>过程完整度 ${audit.score}/100</span></div>
                <div class="bar"><i style="--bar:${audit.score}%"></i></div>
                <p>${audit.missing.length ? `待补：${audit.missing.map(escapeHtml).join("、")}` : "关键过程字段已完整"}</p>
              </div>`;
            }).join("")}
          </div>
          <div class="rationality-conclusion">
            <div><span>合理性判断</span><strong>方向清楚，风险控制不足</strong></div>
            <p>这些选择的理由与预期较完整，事后也有明确结论；但没有在事前写清“什么情况代表判断失败”和“何时停止”。如果结果不好，现有记录很难区分是信息不足、执行偏差还是运气变化。</p>
          </div>
        </article>
        <div class="insight-grid">
          <article class="panel ability-panel">
            <header class="panel-head">
              <div class="panel-title"><svg class="icon"><use href="#i-network"></use></svg><h3>能力画像</h3></div>
              <span class="analysis-note">0—100 · 启发式评分</span>
            </header>
            ${abilityRadar(model.abilities)}
          </article>
          <article class="panel">
            <header class="panel-head">
              <div class="panel-title"><svg class="icon"><use href="#i-spark"></use></svg><h3>能力依据</h3></div>
            </header>
            <div class="ability-list">
              ${model.abilities.map(item => `
                <div class="ability-item">
                  <div class="ability-item-head"><strong>${escapeHtml(item.label)}</strong><span>${item.score}</span></div>
                  <div class="bar"><i style="--bar:${item.score}%"></i></div>
                  <p>${escapeHtml(item.evidence)}</p>
                </div>`).join("")}
            </div>
            <div class="insight-box">分数由已有记录的数量、字段完整度、信心与结果差、项目与职责证据映射；不是标准考试，也不能用来和他人精确比较。</div>
          </article>
        </div>
        <div class="insight-grid">
          <article class="panel">
            <header class="panel-head">
              <div class="panel-title"><svg class="icon"><use href="#i-decisions"></use></svg><h3>决策风格</h3></div>
            </header>
            <div class="trait-list">
              <div class="trait-item"><span>01</span><div><strong>平台跃迁型</strong><p>倾向比较平台上限、竞争密度和未来可选路径，不只满足于眼前确定性。</p></div></div>
              <div class="trait-item"><span>02</span><div><strong>自主驱动与高投入</strong><p>${model.confidenceKnown.length}条已填写信心的决策平均为${confidenceText}；面对团队、伤病或时间冲突时倾向自己做主并坚持执行。</p></div></div>
              <div class="trait-item"><span>03</span><div><strong>会主动更换不利环境</strong><p>面对不适合的平台、队内氛围或低效方案时，更愿意退出、改道或自建方法。</p></div></div>
              <div class="trait-item caution"><span>!</span><div><strong>需要注意的结果偏差</strong><p>已复盘结果普遍为4—5分，容易高估决策过程；好结果不等于每个环节都有充分证据。</p></div></div>
            </div>
          </article>
          <article class="panel">
            <header class="panel-head">
              <div class="panel-title"><svg class="icon"><use href="#i-user"></use></svg><h3>当前呈现的个人倾向</h3></div>
            </header>
            <div class="trait-list">
              <div class="trait-item"><span>01</span><div><strong>成就导向明显</strong><p>你更关注是否进入更高层级，而不只是避免失败。</p></div></div>
              <div class="trait-item"><span>02</span><div><strong>竞争意识强</strong><p>常用竞争人数、位置和平台强弱来理解选择。</p></div></div>
              <div class="trait-item"><span>03</span><div><strong>高自主、高坚持</strong><p>偏好自行制定方案和承担后果；遇到质疑时更多用结果回应，而不是寻求共识。</p></div></div>
              <div class="trait-item caution"><span>!</span><div><strong>不要把阶段性表现当成人格定论</strong><p>不同领域每类仅2个样本，且结果多为本人自评；只能说明当前倾向，不能证明未来稳定不变。</p></div></div>
            </div>
          </article>
        </div>
        <article class="panel analysis-reviews-panel">
          <header class="panel-head">
            <div class="panel-title"><svg class="icon"><use href="#i-check"></use></svg><h3>逐条决策复盘</h3></div>
            <span class="analysis-note">评价针对决策过程，不等同于评价你本人</span>
          </header>
          <div class="analysis-review-list">${reviewCards || `<div class="empty-state"><h4>还没有可分析的决策</h4><p>先记录至少一条决策复盘。</p></div>`}</div>
        </article>
        <article class="panel">
          <header class="panel-head">
            <div class="panel-title"><svg class="icon"><use href="#i-info"></use></svg><h3>下一次复盘建议</h3></div>
          </header>
          <div class="review-prompt-grid">
            <div><span>前后对照</span><p>记录选择前的事实、当时预期和结果，避免只用结果解释当时的判断。</p></div>
            <div><span>反向条件</span><p>提前写下“出现什么情况就停止或调整”，而不是事后补充失败条件。</p></div>
            <div><span>机会成本</span><p>记录放弃的选项后来怎样，尤其是放弃保送、放弃四中这类选择。</p></div>
            <div><span>补足结果</span><p>优先跟踪储蓄、寒假实践和研学决策的实际结果，并继续积累每域第3个样本。</p></div>
          </div>
        </article>
        <p class="analysis-disclaimer">本页全部在本地计算。性格描述是从已填写文本归纳出的工作与决策倾向，不是医学或心理诊断。</p>
      </div>`;
  }

  function renderForecast() {
    const model = getInsightModel();
    const projectCount = model.projects.length;
    const trends = [
      {
        label: "学业适应",
        direction: "待建立基线",
        icon: "→",
        tone: "steady",
        basis: "已知：2026级体育教育课程与课程名称；缺失：成绩、学分完成率、每周学习时长。",
        call: "现在最需要的是第一学期成绩和稳定学习节奏，不是继续增加项目。"
      },
      {
        label: "体育理论",
        direction: "方向明确，成果待建立",
        icon: "→",
        tone: "mixed",
        basis: "事实：已决定不再继续提升竞技成绩，转向体育理论；当前缺少课程成绩、读书笔记、研究综述和可展示作品。",
        call: "未来判断重点应从“成绩有没有提高”转向“理论输出和教学分析有没有形成证据”。"
      },
      {
        label: "技术分析",
        direction: "自评优势，待外部验证",
        icon: "?",
        tone: "up",
        basis: "本人自评对运动技术掌握和理解较强、身体素质相对普通；目前没有技术分析报告、教学反馈或作品作为外部证据。",
        call: "把“理解得好”转化为文章、技术拆解、教学方案或研究成果，优势才更容易迁移到职业场景。"
      },
      {
        label: "组织领导",
        direction: "持续积累",
        icon: "↑",
        tone: "up",
        basis: "事实：高中团支书3年、田径部部长、大学专业团支部书记。",
        call: "角色经历已经连续；下一步需要可验证的组织成果，而不只是职位名称。"
      },
      {
        label: "项目实践",
        direction: "广度较高，聚焦不足",
        icon: "↗",
        tone: "mixed",
        basis: `事实：${projectCount}个项目覆盖体育、志愿服务、信息和本地工具；缺失：使用人数、持续时间、实际成效。`,
        call: "继续增加项目数量，收益可能低于选两项做深并形成可验证成果。"
      },
      {
        label: "职业路径",
        direction: "两类方向已提出，资格待核验",
        icon: "→",
        tone: "uncertain",
        basis: "方向一为高校任教，方向二为教育局、教科院、体育局等政策岗位；免师履约、读博审批和招聘资格尚未核验。",
        call: "先确认硬性资格与协议边界，再判断家庭资源能在哪一步提供帮助。"
      }
    ];

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("FORECAST & RISK", "趋势与风险", "预测未来不是给人生写结论，而是明确在哪些假设下会发生什么，以及出现哪些信号时需要调整。",
          `<button class="secondary-button" data-action="print"><svg class="icon"><use href="#i-print"></use></svg>打印摘要</button>`)}
        <div class="notice-strip forecast-warning">
          <svg class="icon"><use href="#i-info"></use></svg>
          <p><strong>预测边界：</strong>目前缺少大学成绩、理论学习产出、免师协议具体条款、读博审批规则、招聘要求和时间投入。因此本页只做条件性趋势判断，置信度为低到中等，不能视为精确概率。</p>
        </div>
        <section class="forecast-hero">
          <div>
            <span class="eyebrow">CAREER OUTLOOK</span>
            <h3>未来主线将从竞技提升，<em>转为理论、教学与公共体育治理的复合发展。</em></h3>
            <p>关键不再是把专项成绩继续推高，而是完成本硕与履约义务、建立理论和研究输出、核实读博条件，并积累足以独立证明能力的教学与政策实践。</p>
          </div>
          <div class="forecast-horizon">
            <div><span>起点</span><strong>2026.09</strong></div>
            <i></i><i></i><i></i>
            <div><span>关键阶段</span><strong>本硕 / 履约</strong></div>
            <i></i><i></i><i></i>
            <div><span>长期去向</span><strong>高校 / 政策岗</strong></div>
          </div>
        </section>
        <section class="forecast-grid">
          ${trends.map(item => `
            <article class="trend-card ${escapeAttr(item.tone)}">
              <div class="trend-top"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.icon)}</strong></div>
              <h4>${escapeHtml(item.direction)}</h4>
              <p>${escapeHtml(item.basis)}</p>
              <div class="trend-call">${escapeHtml(item.call)}</div>
            </article>`).join("")}
        </section>
        <div class="page-head compact-head">
          <div><span class="eyebrow">SCENARIO PLANNING</span><h2>三条可能路径</h2><p>这里不是三选一的命运，而是三组行动与条件对应的结果区间。</p></div>
        </div>
        <section class="scenario-grid">
          <article class="scenario-card baseline">
            <div class="scenario-label">基准路径 · 条件延续</div>
            <h3>按协议完成学业与履约，逐步形成理论专长</h3>
            <p>完成免师本硕阶段和六年履约，持续学习体育理论、技术分析与专项技能，同时积累教学和政策工作证据。</p>
            <ul>
              <li>读博路径在协议允许的范围内推进</li>
              <li>形成至少一项理论与技术分析成果</li>
              <li>通过基层工作理解教育和体育政策</li>
            </ul>
            <small>前提：免师协议允许当前读博设想，学业和履约均正常完成。</small>
          </article>
          <article class="scenario-card upside">
            <div class="scenario-label">上行路径 · 条件满足</div>
            <h3>理论成果与基层经历互相增强</h3>
            <p>在履约期间形成论文、教学研究或政策分析成果，并取得匹配的高校或体制内岗位资格。</p>
            <ul>
              <li>博士、教学实践和政策经历形成可核验组合</li>
              <li>高校路线具备学历、研究和教学证据</li>
              <li>政策路线具备写作、组织和基层经验</li>
            </ul>
            <small>前提：读博资格获批、研究产出稳定，家庭资源与个人资格共同发挥作用。</small>
          </article>
          <article class="scenario-card downside">
            <div class="scenario-label">风险路径 · 需要预警</div>
            <h3>广度增加，主线变模糊</h3>
            <p>只规划路线但不核验协议和硬资格，或把家庭资源当成录用保证，可能导致临近毕业才发现路径不可执行。</p>
            <ul>
              <li>服务期与读博安排发生冲突</li>
              <li>高校招聘要求高于当前学历或成果</li>
              <li>政策岗位缺少公开招录或能力证明</li>
            </ul>
            <small>触发条件：协议条款不明确、连续两个学期没有成果，或目标岗位硬性资格无法满足。</small>
          </article>
        </section>
        <div class="forecast-lower-grid">
          <article class="panel">
            <header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-shield"></use></svg><h3>风险矩阵</h3></div><span class="analysis-note">可能影响 × 不确定性</span></header>
            <div class="risk-table">
              <div class="risk-row risk-head"><span>风险</span><span>影响</span><span>应对</span></div>
              <div class="risk-row"><strong>履约与读博冲突</strong><span class="risk-level high">高</span><p>先取得书面协议或主管部门答复，确认读博形式、审批、服务期和违约责任。</p></div>
              <div class="risk-row"><strong>高校岗位硬资格不足</strong><span class="risk-level high">高</span><p>核对目标院校招聘公告，倒推学历、论文、教学和研究要求，再安排读博与成果。</p></div>
              <div class="risk-row"><strong>过度依赖家庭资源</strong><span class="risk-level high">高</span><p>把资源视为信息与机会渠道，同时积累离开资源也能成立的理论、教学和政策作品。</p></div>
              <div class="risk-row"><strong>理论输出不足</strong><span class="risk-level medium">中高</span><p>每学期至少完成一篇结构化学习成果，并持续积累可公开展示的技术分析或教学研究。</p></div>
              <div class="risk-row"><strong>政策岗位能力错配</strong><span class="risk-level medium">中高</span><p>通过教育政策阅读、公文写作和基层项目验证兴趣与能力，不只看岗位名称。</p></div>
              <div class="risk-row"><strong>项目过散</strong><span class="risk-level medium">中高</span><p>最多保留2个进行中的重点，其余暂停；每项必须写结果指标。</p></div>
            </div>
          </article>
          <div class="stack">
            <article class="panel">
              <header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-timeline"></use></svg><h3>先行指标</h3></div></header>
              <div class="watch-list">
                <div><span>30天</span><p>找到免师协议和培养方案原文，明确六年履约与读博的书面规则。</p></div>
                <div><span>90天</span><p>选定三个理论学习主题，完成第一份技术分析或教学研究提纲。</p></div>
                <div><span>180天</span><p>查清高校教师和体育政策岗位各一份真实招聘要求，找到能力差距。</p></div>
                <div><span>每学期</span><p>盘点理论成果、政策实践、专项技能和履约准备，更新职业情境。</p></div>
              </div>
            </article>
            <article class="panel">
              <div class="insight-box"><strong>客观边界：</strong>没有任何模型能对未来作“绝对客观”的预测。这里能保证的是把事实、假设、风险和退出条件分开写；不能保证结果发生。</div>
            </article>
          </div>
        </div>
      </div>`;
  }

  function renderQuestions() {
    const decisions = [...state.decisions].sort((a, b) => String(b.sortDate || b.date).localeCompare(String(a.sortDate || a.date)));
    const reflections = [...(state.deepReflections || [])].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const chain = decisions.map((item, index) => `
      <div class="question-chain-item">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.chosen || "尚未填写最终选择")}</p>
        </div>
      </div>`).join("");

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("THE UNASKED QUESTION", "深层追问", "把重复出现的选择放在一起，看看背后是否有一个一直没被直接问出口的问题。",
          `<button class="secondary-button" data-action="navigate" data-page="decisions"><svg class="icon"><use href="#i-decisions"></use></svg>返回决策记录</button>`)}
        <section class="deep-question-hero">
          <span class="eyebrow">当前资料中最值得追问的问题</span>
          <h3>如果暂时拿掉排名、平台、竞争和家庭资源，<br>我究竟想成为什么样的人？<em>什么才算“足够好”？</em></h3>
          <p>这不是结论，也不是心理诊断。它是一条目前比“怎样赢”更少被你直接回答的问题。</p>
        </section>
        <div class="question-layout">
          <div class="stack">
            <article class="panel">
              <header class="panel-head">
                <div class="panel-title"><svg class="icon"><use href="#i-timeline"></use></svg><h3>为什么会指向这个问题</h3></div>
              </header>
              <p class="question-intro">当前可看到的 ${decisions.length} 条决策，形成了一条很清楚的上升路径。它们证明了“怎样选择更高的平台”，但还没有回答“多高才算够、上去之后想过什么生活”。</p>
              <div class="question-chain">${chain || `<p class="muted small">记录更多决策后，这里会出现选择链条。</p>`}</div>
            </article>
            <article class="panel">
              <header class="panel-head">
                <div class="panel-title"><svg class="icon"><use href="#i-search"></use></svg><h3>尚未直接问出口的 5 个问题</h3></div>
              </header>
              <ol class="deep-question-list">
                <li><span>01</span><p>如果没有任何人知道我的学校、名次或头衔，我还会做同样的选择吗？</p></li>
                <li><span>02</span><p>如果家庭体育资源完全不存在，我真正愿意投入什么，又能靠什么建立优势？</p></li>
                <li><span>03</span><p>“超过大部分同龄人”之后，我期待的下一站究竟是自己定义的生活，还是更大的比较坐标？</p></li>
                <li><span>04</span><p>哪三件与成绩、排名、职位都无关的事，仍会让我愿意长期投入？</p></li>
                <li><span>05</span><p>我害怕停下来以后，会被证明成什么？这个担心来自事实、家庭期待，还是我自己的评价标准？</p></li>
              </ol>
            </article>
          </div>
          <div class="stack">
            <article class="panel">
              <header class="panel-head">
                <div class="panel-title"><svg class="icon"><use href="#i-network"></use></svg><h3>几种同样合理的解释</h3></div>
              </header>
              <div class="question-lens">
                <div><span>成就策略</span><p>你是在理性选择成功概率更高的赛道，并不一定是在追逐外部认可。</p></div>
                <div><span>资源整合</span><p>你敏锐利用了家庭、学校和专项能力，这本身就是一种现实判断。</p></div>
                <div><span>外部坐标</span><p>你也可能习惯用竞争和排名确认“我足够好”，但现有资料不足以证明。</p></div>
                <div><span>自主设计</span><p>你正在主动制造选择权，下一步是决定把选择权用于什么生活。</p></div>
              </div>
            </article>
            <article class="panel question-caveat">
              <div class="insight-box" style="margin-top:0">
                <strong>边界：</strong>我只能根据当前对话和本地项目资料提出这条线索。我看不到你的全部人生经历，也不能判断你“从未”想过这个问题。它之所以值得讨论，是因为现有记录中没有出现明确答案。
              </div>
            </article>
          </div>
        </div>
        <article class="panel reflection-panel">
          <header class="panel-head">
            <div class="panel-title"><svg class="icon"><use href="#i-edit"></use></svg><h3>我现在的回答</h3></div>
            <span class="analysis-note">内容只保存在本机</span>
          </header>
          <form id="reflectionForm" class="reflection-form">
            <label for="reflectionText">不急着写得正确。可以先回答：什么是我自己的“足够好”？</label>
            <textarea id="reflectionText" name="reflection" rows="6" maxlength="3000" placeholder="例如：如果不再比较排名，我最想长期保留的是……；我希望五年后的普通一天是……；没有外部认可时，我仍然愿意做……"></textarea>
            <div class="reflection-actions">
              <span>每次保存都会留下一条带日期的思考记录。</span>
              <button class="primary-button" type="submit"><svg class="icon"><use href="#i-check"></use></svg>保存这次回答</button>
            </div>
          </form>
          ${reflections.length ? `<div class="reflection-history">
            <h4>思考记录</h4>
            ${reflections.map(item => `
              <article class="reflection-entry">
                <div><time>${formatDate(item.date)}</time><p>${escapeHtml(item.text)}</p></div>
                <button class="icon-button danger-button" title="删除这条思考" data-action="delete-reflection" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-trash"></use></svg></button>
              </article>`).join("")}
          </div>` : `<div class="empty-state reflection-empty"><h4>还没有留下回答</h4><p>第一次回答不必完整，先写下此刻最真实的一句话。</p></div>`}
        </article>
        <p class="analysis-disclaimer">这条追问来自当前记录中的选择模式，不是对你人格的定论。它可以被后续经历修正或否定。</p>
      </div>`;
  }

  function daysSince(value) {
    if (!value) return Number.POSITIVE_INFINITY;
    const time = new Date(value).getTime();
    if (!Number.isFinite(time)) return Number.POSITIVE_INFINITY;
    return Math.floor((Date.now() - time) / 86400000);
  }

  function isNoteDue(item) {
    if (item.reviewDueAt) return new Date(item.reviewDueAt).getTime() <= Date.now();
    return daysSince(item.lastReviewedAt || item.updatedAt) >= 30;
  }

  function dateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function renderGoals() {
    const goals = [...(state.goals || [])].sort((a, b) => {
      if (a.status === "已完成" && b.status !== "已完成") return 1;
      if (b.status === "已完成" && a.status !== "已完成") return -1;
      return String(a.reviewDate || "9999").localeCompare(String(b.reviewDate || "9999"));
    });
    const active = goals.filter(item => item.status === "进行中" || item.status === "未开始");
    const due = goals.filter(item => item.status !== "已完成" && item.reviewDate && item.reviewDate <= todayIso());
    const average = active.length ? Math.round(active.reduce((sum, item) => sum + toNumber(item.progress), 0) / active.length) : 0;
    const cards = goals.length ? goals.map(goal => {
      const overdue = goal.status !== "已完成" && goal.reviewDate && goal.reviewDate <= todayIso();
      return `<article class="goal-card ${overdue ? "is-due" : ""}">
        <div class="goal-head">
          <div><div class="record-meta"><span class="type-pill">${escapeHtml(goal.domain)}</span><span class="tag">${escapeHtml(goal.horizon)}</span>${overdue ? `<span class="tag inferred-tag">到检查日</span>` : ""}</div><h3>${escapeHtml(goal.title)}</h3></div>
          <div class="record-actions">
            <button class="icon-button" title="编辑" data-action="edit" data-type="goal" data-id="${escapeAttr(goal.id)}"><svg class="icon"><use href="#i-edit"></use></svg></button>
            <button class="icon-button danger-button" title="删除这一条" data-action="delete" data-type="goal" data-id="${escapeAttr(goal.id)}"><svg class="icon"><use href="#i-trash"></use></svg></button>
          </div>
        </div>
        <p>${escapeHtml(goal.why || "未填写目标理由")}</p>
        <div class="goal-progress"><div><span>推进程度</span><strong>${clamp(toNumber(goal.progress), 0, 100)}%</strong></div><div class="bar"><i style="--bar:${clamp(toNumber(goal.progress), 0, 100)}%"></i></div></div>
        <div class="goal-details">
          <div><label>成功标准</label><span>${escapeHtml(goal.successMetric || "未填写")}</span></div>
          <div><label>下一步</label><span>${escapeHtml(goal.nextAction || "未填写")}</span></div>
          <div><label>检查日期</label><span>${goal.reviewDate ? formatDate(goal.reviewDate) : "未设置"}</span></div>
        </div>
        <div class="goal-actions">
          <span class="status-pill ${goal.status === "已完成" ? "reviewed" : "pending"}">${escapeHtml(goal.status)}</span>
          ${goal.status !== "已完成" ? `<button class="text-button" data-action="goal-progress" data-id="${escapeAttr(goal.id)}">推进 +10%</button><button class="text-button" data-action="goal-complete" data-id="${escapeAttr(goal.id)}">标记完成</button>` : `<button class="text-button" data-action="goal-reopen" data-id="${escapeAttr(goal.id)}">重新开始</button>`}
        </div>
      </article>`;
    }).join("") : `<div class="empty-state"><div class="empty-mark"><svg class="icon"><use href="#i-arrow"></use></svg></div><h4>还没有发展目标</h4><p>先设置一个30天内可以验证的目标，不要只写愿望。</p><button class="primary-button" data-action="new" data-type="goal">新建目标</button></div>`;
    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("GOAL BOARD", "目标推进", "目标不是愿望清单。每项目标必须有成功标准、下一步和检查日期，否则只会增加焦虑。",
          `<button class="primary-button" data-action="new" data-type="goal"><svg class="icon"><use href="#i-plus"></use></svg>新建目标</button>`)}
        <section class="metric-grid">
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-arrow"></use></svg>进行中</div><div class="metric-value">${active.length}</div><div class="metric-note">未开始与进行中目标</div></article>
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-check"></use></svg>平均推进</div><div class="metric-value">${average}%</div><div class="metric-note">只统计未完成目标</div></article>
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-calendar"></use></svg>到检查日</div><div class="metric-value">${due.length}</div><div class="metric-note">需要更新进展或调整方向</div></article>
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-spark"></use></svg>已完成</div><div class="metric-value">${goals.filter(item => item.status === "已完成").length}</div><div class="metric-note">有完成记录的目标</div></article>
        </section>
        <div class="goal-grid">${cards}</div>
      </div>`;
  }

  function renderOptions() {
    const items = [...(state.options || [])];
    const locked = items.filter(item => item.state === "已锁定");
    const open = items.filter(item => item.state !== "已锁定");
    const currentYear = new Date().getFullYear();
    const nearExpiry = items.filter(item => (String(item.expires || "").match(/20\d{2}/g) || []).some(year => Number(year) <= currentYear + 2));
    const cards = items.length ? items.map(item => `
      <article class="goal-card">
        <div class="goal-head">
          <div>
            <div class="record-meta">
              <span class="type-pill">${escapeHtml(item.kind || "期权")}</span>
              ${item.state ? `<span class="tag">${escapeHtml(item.state)}</span>` : ""}
            </div>
            <h3>${escapeHtml(item.title)}</h3>
          </div>
        </div>
        <p>${escapeHtml(item.note || "")}</p>
        <div class="goal-details">
          <div><label>触发条件</label><span>${escapeHtml(item.trigger || "未定义")}</span></div>
          <div><label>过期时间</label><span>${escapeHtml(item.expires || "未定义")}</span></div>
          <div><label>维护成本</label><span>${escapeHtml(item.cost || "未评估")}</span></div>
        </div>
      </article>`).join("") : `<div class="empty-state"><div class="empty-mark"><svg class="icon"><use href="#i-network"></use></svg></div><h4>还没有记录选项</h4><p>选项不是目标。它需要写清触发条件、过期时间和维护成本，否则会变成无限期的焦虑。</p></div>`;
    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("PATH OPTIONS", "路径选项", "不是所有没做完的事都是目标。有些只是在保留选择权：写清触发条件、过期时间和维护成本，才不会一直悬着。")}
        <section class="metric-grid">
          <article class="metric-card"><div class="metric-label">已锁定</div><div class="metric-value">${locked.length}</div><div class="metric-note">已经在执行的路径</div></article>
          <article class="metric-card"><div class="metric-label">保留中</div><div class="metric-value">${open.length}</div><div class="metric-note">等待触发条件的路径</div></article>
          <article class="metric-card"><div class="metric-label">临近评估</div><div class="metric-value">${nearExpiry.length}</div><div class="metric-note">两年内到期，需要重新判断</div></article>
          <article class="metric-card"><div class="metric-label">合计</div><div class="metric-value">${items.length}</div><div class="metric-note">含已锁定与备选</div></article>
        </section>
        <div class="goal-grid">${cards}</div>
      </div>`;
  }

  function renderRecall() {
    const candidates = (state.notes || []).filter(item => item.reviewQuestion);
    candidates.sort((a, b) => {
      const aDue = isNoteDue(a) ? 0 : 1;
      const bDue = isNoteDue(b) ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      return String(a.reviewDueAt || a.updatedAt).localeCompare(String(b.reviewDueAt || b.updatedAt));
    });
    if (!candidates.length) {
      $("#pageContent").innerHTML = `<div class="page-enter">${pageHeader("ACTIVE RECALL", "主动回忆", "把已经保存的知识转成问题和答案，用回忆检验自己，而不是只看一遍。")}<div class="empty-state"><div class="empty-mark"><svg class="icon"><use href="#i-spark"></use></svg></div><h4>还没有可回忆的知识卡片</h4><p>编辑任意知识卡片，补充“主动回忆问题”和“参考答案”。</p><button class="primary-button" data-action="navigate" data-page="knowledge">前往知识库</button></div></div>`;
      return;
    }
    const index = clamp(toNumber(state.ui.recallIndex), 0, candidates.length - 1);
    const item = candidates[index];
    const dueCount = candidates.filter(isNoteDue).length;
    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("ACTIVE RECALL", "主动回忆", "先尝试从记忆里回答，再查看答案。答错和模糊不是失败，而是下一次复习时间的信息。")}
        <section class="recall-layout">
          <article class="recall-card">
            <div class="record-meta"><span class="type-pill">${escapeHtml(item.type)}</span>${isNoteDue(item) ? `<span class="tag inferred-tag">今日到期</span>` : ""}<span>${index + 1} / ${candidates.length}</span></div>
            <h3>${escapeHtml(item.reviewQuestion)}</h3>
            ${state.ui.recallShowAnswer ? `<div class="recall-answer"><span>参考答案</span><p>${escapeHtml(item.reviewAnswer || item.content)}</p></div><div class="recall-rating"><span>这次回忆得怎么样？</span><div><button class="secondary-button" data-action="rate-recall" data-rating="forgot" data-id="${escapeAttr(item.id)}">忘记 · 1天</button><button class="secondary-button" data-action="rate-recall" data-rating="fuzzy" data-id="${escapeAttr(item.id)}">模糊 · 3天</button><button class="primary-button" data-action="rate-recall" data-rating="remembered" data-id="${escapeAttr(item.id)}">记住 · 7天</button></div></div>` : `<button class="primary-button reveal-answer" data-action="show-recall">显示答案</button>`}
          </article>
          <aside class="stack">
            <article class="panel"><header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-calendar"></use></svg><h3>本轮状态</h3></div></header><div class="network-stat"><span>可回忆卡片</span><strong>${candidates.length}</strong></div><div class="network-stat"><span>今日到期</span><strong>${dueCount}</strong></div><div class="network-stat"><span>这张已复习</span><strong>${item.reviewCount || 0} 次</strong></div><button class="secondary-button recall-next" data-action="next-recall">跳过，换一张</button></article>
            <article class="panel"><div class="insight-box" style="margin-top:0"><strong>间隔规则：</strong>忘记后1天、模糊后3天、记住后7天。它只是轻量提醒，不是完整的记忆算法。</div></article>
          </aside>
        </section>
      </div>`;
  }

  function noteCard(item) {
    return `
      <article class="record-card knowledge-card">
        <div class="record-card-head">
          <div>
            <div class="record-meta">
              <span class="type-pill">${escapeHtml(item.type)}</span>
              ${item.auto ? `<span class="tag">系统归纳</span>` : ""}
              <time>${formatDate(String(item.updatedAt || "").slice(0, 10))}</time>
              ${isNoteDue(item) ? `<span class="tag inferred-tag">待复习</span>` : ""}
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.content)}</p>
          </div>
          <div class="record-actions">
            <button class="icon-button" title="编辑" data-action="edit" data-type="note" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-edit"></use></svg></button>
            <button class="icon-button danger-button" title="删除这一条" data-action="delete" data-type="note" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-trash"></use></svg></button>
          </div>
        </div>
        <div class="knowledge-footer">
          <span>${item.source ? `来源：${escapeHtml(item.source)}` : "来源未填写"}</span>
          <button class="text-button" data-action="review-note" data-id="${escapeAttr(item.id)}">${item.reviewQuestion ? "打开主动回忆" : "标记为已复习"}</button>
        </div>
        ${(item.tags || []).length ? `<div class="record-tags">${item.tags.map(tag => `<span class="tag"># ${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      </article>`;
  }

  function renderKnowledge() {
    const allNotes = [...state.notes].sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
    const filtered = allNotes.filter(item => state.ui.knowledgeType === "全部" || item.type === state.ui.knowledgeType);
    const dueCount = allNotes.filter(isNoteDue).length;
    const tagCount = new Set(allNotes.flatMap(item => item.tags || [])).size;
    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("KNOWLEDGE BASE", "知识库", "把事实、方法、原则、灵感和风险分开保存。知识不是收藏数量，而是能在需要时被重新找到、验证和使用。",
          `<button class="primary-button" data-action="new" data-type="note"><svg class="icon"><use href="#i-plus"></use></svg>新建知识卡片</button>`)}
        <section class="metric-grid knowledge-metrics">
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-search"></use></svg>知识卡片</div><div class="metric-value">${allNotes.length}</div><div class="metric-note">全部本地条目</div></article>
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-calendar"></use></svg>待复习</div><div class="metric-value">${dueCount}</div><div class="metric-note">超过30天未复习</div></article>
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-tag"></use></svg>主题标签</div><div class="metric-value">${tagCount}</div><div class="metric-note">用于搜索和关系图</div></article>
          <article class="metric-card"><div class="metric-label"><svg class="icon"><use href="#i-spark"></use></svg>正文规模</div><div class="metric-value">${(allNotes.reduce((sum, item) => sum + String(item.content || "").length, 0) / 1000).toFixed(1)}k</div><div class="metric-note">已保存正文字数</div></article>
        </section>
        <div class="toolbar">
          <select class="filter-select" id="knowledgeType" aria-label="按知识类型筛选">
            ${["全部", ...noteTypes].map(value => `<option ${state.ui.knowledgeType === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
          </select>
          <span class="filter-label">${filtered.length} 条 · 按最近更新排序</span>
        </div>
        ${filtered.length ? `<div class="card-list">${filtered.map(noteCard).join("")}</div>` : `<div class="empty-state"><div class="empty-mark"><svg class="icon"><use href="#i-search"></use></svg></div><h4>还没有这类知识</h4><p>先记一条今天不想忘记的事实、方法或原则。</p><button class="primary-button" data-action="new" data-type="note">新建知识卡片</button></div>`}
      </div>`;
  }

  function renderReviewCenter() {
    const pendingDecisions = state.decisions.filter(item => item.status !== "已复盘" || (item.reviewDate && item.reviewDate <= todayIso()));
    const dueGoals = (state.goals || []).filter(item => item.status !== "已完成" && item.reviewDate && item.reviewDate <= todayIso());
    const dueNotes = [...state.notes]
      .filter(isNoteDue)
      .sort((a, b) => daysSince(b.lastReviewedAt || b.updatedAt) - daysSince(a.lastReviewedAt || a.updatedAt))
      .slice(0, 5);
    const reviews = [...(state.reviews || [])].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("REVIEW CENTER", "复盘中心", "把未闭环的决定、长期未使用的知识和近期经验集中处理，避免第二大脑只进不出。")}
        <section class="review-queue-grid">
          <article class="queue-card"><div class="queue-icon"><svg class="icon"><use href="#i-decisions"></use></svg></div><div><span>待处理决策</span><strong>${pendingDecisions.length}</strong><p>未闭环，或已到计划复盘日</p></div><button class="text-button" data-action="navigate" data-page="decisions">处理 →</button></article>
          <article class="queue-card"><div class="queue-icon"><svg class="icon"><use href="#i-arrow"></use></svg></div><div><span>目标到检查日</span><strong>${dueGoals.length}</strong><p>需要更新进度或调整路径</p></div><button class="text-button" data-action="navigate" data-page="goals">查看 →</button></article>
          <article class="queue-card"><div class="queue-icon"><svg class="icon"><use href="#i-search"></use></svg></div><div><span>待复习知识</span><strong>${dueNotes.length}</strong><p>超过30天没有重新使用</p></div><button class="text-button" data-action="navigate" data-page="knowledge">查看 →</button></article>
          <article class="queue-card"><div class="queue-icon"><svg class="icon"><use href="#i-check"></use></svg></div><div><span>复盘记录</span><strong>${reviews.length}</strong><p>周复盘与阶段复盘累计</p></div><button class="text-button" data-action="navigate" data-page="selfcheck">看状态 →</button></article>
        </section>
        <article class="panel review-writer">
          <header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-edit"></use></svg><h3>写一次阶段复盘</h3></div><span class="analysis-note">建议每周一次 · 5分钟</span></header>
          <form id="reviewForm" class="review-form">
            <div class="form-grid">
              <div class="field"><label for="reviewPeriod">复盘周期</label><select id="reviewPeriod" name="period"><option>本周</option><option>本月</option><option>本阶段</option></select></div>
              <div class="field"><label for="reviewDate">日期</label><input id="reviewDate" name="date" type="date" value="${todayIso()}" required></div>
              <div class="field full"><label for="reviewWin">什么进展值得保留？</label><textarea id="reviewWin" name="win" rows="2" placeholder="写下具体进展、证据或有效方法"></textarea></div>
              <div class="field full"><label for="reviewFriction">最大的阻力或偏差是什么？</label><textarea id="reviewFriction" name="friction" rows="2" placeholder="区分事实、解释和你自己的猜测"></textarea></div>
              <div class="field full"><label for="reviewNext">下一周期最重要的一步</label><textarea id="reviewNext" name="nextAction" rows="2" placeholder="只写一个可执行动作"></textarea></div>
            </div>
            <div class="reflection-actions"><span>记录不是总结成绩，而是决定下一周期保留什么、停止什么。</span><button class="primary-button" type="submit">保存复盘</button></div>
          </form>
        </article>
        <div class="review-history-grid">
          <article class="panel"><header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-calendar"></use></svg><h3>待复习知识</h3></div></header>${dueNotes.length ? dueNotes.map(item => `<div class="queue-list-item"><strong>${escapeHtml(item.title)}</strong><span>已到复习日</span></div>`).join("") : `<p class="muted small">当前没有到期知识。</p>`}</article>
          <article class="panel"><header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-check"></use></svg><h3>最近复盘</h3></div></header>${reviews.length ? reviews.slice(0, 5).map(item => `<div class="review-log"><time>${formatDate(item.date)} · ${escapeHtml(item.period)}</time><p><strong>下一步：</strong>${escapeHtml(item.nextAction || "未填写")}</p></div>`).join("") : `<p class="muted small">还没有阶段复盘记录。</p>`}</article>
        </div>
      </div>`;
  }

  function pulseField(label, name, value = 3) {
    return `<div class="pulse-field"><label>${escapeHtml(label)}</label><div class="pulse-options">${[1, 2, 3, 4, 5].map(number => `<label><input type="radio" name="${escapeAttr(name)}" value="${number}" ${number === value ? "checked" : ""}><span>${number}</span></label>`).join("")}</div><small>1 低 · 3 中 · 5 高</small></div>`;
  }

  function checkinChart(entries) {
    if (!entries.length) {
      return `<div class="empty-state"><div class="empty-mark"><svg class="icon"><use href="#i-user"></use></svg></div><h4>还没有自我审视数据</h4><p>完成第一次记录后，这里会出现连续变化。</p></div>`;
    }
    const metrics = [
      { key: "energy", label: "精力", color: "#3d7f7b" }, { key: "mood", label: "情绪", color: "#e47562" },
      { key: "calm", label: "平静", color: "#c99c52" }, { key: "focus", label: "专注", color: "#668a99" },
      { key: "agency", label: "掌控感", color: "#7d6d95" }
    ];
    const points = [...entries].reverse().slice(-10);
    const width = 680, height = 250, left = 36, right = 18, top = 20, bottom = 34;
    const plotW = width - left - right, plotH = height - top - bottom;
    const x = index => left + (points.length === 1 ? plotW / 2 : index * plotW / (points.length - 1));
    const y = value => top + (5 - value) / 4 * plotH;
    const grid = [1, 2, 3, 4, 5].map(value => `<line x1="${left}" y1="${y(value)}" x2="${width - right}" y2="${y(value)}" class="checkin-grid"></line><text x="${left - 9}" y="${y(value) + 3}" text-anchor="end" class="checkin-axis">${value}</text>`).join("");
    const dates = points.map((item, index) => `<text x="${x(index).toFixed(1)}" y="${height - 9}" text-anchor="middle" class="checkin-axis">${escapeHtml(item.date.slice(5))}</text>`).join("");
    const lines = metrics.map(metric => `<polyline points="${points.map((item, index) => `${x(index).toFixed(1)},${y(toNumber(item[metric.key], 3)).toFixed(1)}`).join(" ")}" fill="none" stroke="${metric.color}" stroke-width="2.2" stroke-linejoin="round"></polyline>`).join("");
    const dots = metrics.map(metric => points.map((item, index) => `<circle cx="${x(index).toFixed(1)}" cy="${y(toNumber(item[metric.key], 3)).toFixed(1)}" r="3.2" fill="${metric.color}" stroke="#fffdf8" stroke-width="1.5"></circle>`).join("")).join("");
    return `<div class="checkin-chart-wrap"><svg viewBox="0 0 ${width} ${height}" class="checkin-chart" role="img" aria-label="自我状态趋势图">${grid}${lines}${dots}${dates}</svg><div class="checkin-legend">${metrics.map(metric => `<span><i style="background:${metric.color}"></i>${metric.label}</span>`).join("")}</div></div>`;
  }

  function renderSelfCheck() {
    const checkins = [...(state.checkins || [])].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const recent = checkins.slice(0, 10);
    const average = key => recent.length ? recent.reduce((sum, item) => sum + toNumber(item[key], 3), 0) / recent.length : 0;
    const latest = checkins[0];
    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("SELF-OBSERVATION", "自我审视", "用固定尺度记录精力、情绪、平静、专注和掌控感。它只帮助你观察变化，不代替医学或心理诊断。")}
        <div class="notice-strip"><svg class="icon"><use href="#i-info"></use></svg><p>这些分数是主观自评，不能用于诊断疾病，也不能单独证明某种状态“变好”或“变坏”。更重要的是连续趋势和生活事件是否吻合。</p></div>
        <section class="metric-grid selfcheck-metrics">
          <article class="metric-card"><div class="metric-label">精力 · 近${recent.length}次</div><div class="metric-value">${average("energy").toFixed(1)}</div><div class="metric-note">1—5 自评</div></article>
          <article class="metric-card"><div class="metric-label">情绪 · 近${recent.length}次</div><div class="metric-value">${average("mood").toFixed(1)}</div><div class="metric-note">1—5 自评</div></article>
          <article class="metric-card"><div class="metric-label">专注 · 近${recent.length}次</div><div class="metric-value">${average("focus").toFixed(1)}</div><div class="metric-note">1—5 自评</div></article>
          <article class="metric-card"><div class="metric-label">掌控感 · 近${recent.length}次</div><div class="metric-value">${average("agency").toFixed(1)}</div><div class="metric-note">1—5 自评</div></article>
        </section>
        <div class="selfcheck-layout">
          <article class="panel"><header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-user"></use></svg><h3>记录此刻状态</h3></div><span class="analysis-note">建议每周一次</span></header><form id="checkinForm" class="checkin-form">${pulseField("精力：身体有多少可用能量？", "energy")}${pulseField("情绪：整体感受如何？", "mood")}${pulseField("平静：此刻有多安定？", "calm")}${pulseField("专注：能投入当前事情吗？", "focus")}${pulseField("掌控感：觉得能推动生活吗？", "agency")}<div class="field"><label for="checkinNote">今天有什么值得记录的背景？</label><textarea id="checkinNote" name="note" rows="3" placeholder="例如：训练量、睡眠、课程压力或一件重要的事"></textarea></div><button class="primary-button" type="submit">保存本周状态</button></form></article>
          <article class="panel"><header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-timeline"></use></svg><h3>状态趋势</h3></div><span class="analysis-note">最近10次</span></header>${checkinChart(recent)}${latest ? `<div class="insight-box">最近一次是 ${formatDate(latest.date)}。单次波动不必过度解释，至少观察连续三次以上，再结合训练、睡眠和课程负荷。</div>` : ""}</article>
        </div>
        ${checkins.length ? `<article class="panel"><header class="panel-head"><div class="panel-title"><svg class="icon"><use href="#i-edit"></use></svg><h3>审视记录</h3></div></header><div class="checkin-history">${checkins.map(item => `<div class="checkin-entry"><div><time>${formatDate(item.date)}</time><strong>精力 ${item.energy} · 情绪 ${item.mood} · 平静 ${item.calm} · 专注 ${item.focus} · 掌控 ${item.agency}</strong><p>${escapeHtml(item.note || "未填写背景")}</p></div><button class="icon-button danger-button" title="删除这一条" data-action="delete-checkin" data-id="${escapeAttr(item.id)}"><svg class="icon"><use href="#i-trash"></use></svg></button></div>`).join("")}</div></article>` : ""}
      </div>`;
  }

  function renderSettings() {
    const json = JSON.stringify(state);
    const bytes = new Blob([json]).size;
    const storagePercent = clamp(bytes / 5000000 * 100, 0.4, 100);
    const syncLogs = [...(state.syncLogs || [])].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const samples = state.decisions.filter(item => item.sample).length
      + state.events.filter(item => item.sample).length
      + state.resumeItems.filter(item => item.sample).length;

    $("#pageContent").innerHTML = `
      <div class="page-enter">
        ${pageHeader("LOCAL DATA", "数据与隐私", "这个网站默认只在本机保存；你可以选择用 GitHub 私有仓库做可选同步。无论是否同步，定期备份仍然必要。")}
        ${sampleNotice()}
        <div class="settings-grid">
          <article class="settings-card">
            <div class="panel-title"><svg class="icon"><use href="#i-download"></use></svg><h3>完整备份</h3></div>
            <p>导出一份包含个人资料、知识、目标、决策、人生轨迹、履历、复盘和自省记录的 JSON 文件。恢复时可以整体导回。</p>
            <div class="settings-actions">
              <button class="primary-button" data-action="export"><svg class="icon"><use href="#i-download"></use></svg>导出完整备份</button>
              <button class="secondary-button" data-action="import"><svg class="icon"><use href="#i-upload"></use></svg>从备份恢复</button>
            </div>
          </article>
          <article class="settings-card">
            <div class="panel-title"><svg class="icon"><use href="#i-shield"></use></svg><h3>隐私边界</h3></div>
            <ul class="safety-list">
              <li><svg class="icon"><use href="#i-check"></use></svg><span>默认没有账号、广告或访问统计；只有你主动配置 GitHub 同步时才会访问 GitHub API。</span></li>
              <li><svg class="icon"><use href="#i-check"></use></svg><span>默认只监听本机；手机访问模式下仅在同一 Wi-Fi 内可见，不直接暴露到公网。</span></li>
              <li><svg class="icon"><use href="#i-check"></use></svg><span>手机端使用独立浏览器存储；跨设备迁移请用 JSON 备份导出/导入。</span></li>
              <li><svg class="icon"><use href="#i-check"></use></svg><span>GitHub token 只保存在当前浏览器；请使用只对一个私有仓库有 Contents 读写权限的 fine-grained token。</span></li>
              <li><svg class="icon"><use href="#i-check"></use></svg><span>导出的备份没有加密，请放在受保护的磁盘中。</span></li>
            </ul>
          </article>
          <article class="settings-card">
            <div class="panel-title"><svg class="icon"><use href="#i-info"></use></svg><h3>本机存储占用</h3></div>
            <p>当前数据约 ${Math.max(1, Math.round(bytes / 1024))} KB，看起来很小，但清理浏览器数据后仍可能消失。</p>
            <div class="storage-meter"><span style="--storage:${Math.max(1, storagePercent)}%"></span></div>
            <div class="muted small">按浏览器常见的约 5 MB 本地存储上限估算，不代表浏览器实际配额。</div>
          </article>
          <article class="settings-card">
            <div class="panel-title"><svg class="icon"><use href="#i-calendar"></use></svg><h3>建议的整理节奏</h3></div>
            <ul class="safety-list">
              <li><svg class="icon"><use href="#i-check"></use></svg><span>每周：补一次待复盘的选择。</span></li>
              <li><svg class="icon"><use href="#i-check"></use></svg><span>每月：补充一个真实发生的人生节点。</span></li>
              <li><svg class="icon"><use href="#i-check"></use></svg><span>每季度：更新履历并导出 JSON 备份。</span></li>
            </ul>
          </article>
          <article class="settings-card" style="grid-column:1/-1">
            <div class="panel-title"><svg class="icon"><use href="#i-rotate"></use></svg><h3>对话同步</h3></div>
            <p>后续在本项目完成的每轮 Codex 交流，会把值得长期保留的信息追加到 <code>assets/sync-updates.js</code>。刷新页面后自动去重合并，历史对话批次不会覆盖当前记录。</p>
            <div class="network-stat"><span>已应用同步批次</span><strong>${syncLogs.length}</strong></div>
            ${syncLogs.length ? `<div class="sync-log-list">${syncLogs.slice(0, 5).map(item => `<div><time>${formatDate(String(item.createdAt).slice(0, 10))}</time><p>${escapeHtml(item.summary)}</p></div>`).join("")}</div>` : `<p class="muted small">还没有可显示的对话同步记录。</p>`}
            <div class="settings-actions"><button class="secondary-button" data-action="reload-sync"><svg class="icon"><use href="#i-rotate"></use></svg>刷新并合并同步</button></div>
          </article>
          <article class="settings-card danger-zone" style="grid-column:1/-1">
            <div class="panel-title"><svg class="icon"><use href="#i-trash"></use></svg><h3>示例数据</h3></div>
            <p>${samples ? `当前有 ${samples} 条示例记录。清除示例不会动你自己新建的内容，但删除后无法在本站直接恢复。` : "当前没有示例记录。"}</p>
            <div class="settings-actions">
              <button class="secondary-button danger-link" data-action="clear-samples" ${samples ? "" : "disabled"}>
                <svg class="icon"><use href="#i-trash"></use></svg>清除 ${samples} 条示例
              </button>
            </div>
          </article>
        </div>
      </div>`;
  }

  function render() {
    const currentPage = pageMeta[state.ui.page] ? state.ui.page : "overview";
    const [title, eyebrow] = pageMeta[currentPage];
    $("#pageTitle").textContent = title;
    $("#pageEyebrow").textContent = eyebrow;
    $$(".nav-item").forEach(button => button.classList.toggle("is-active", button.dataset.page === currentPage));

    if (currentPage === "overview") renderOverview();
    if (currentPage === "decisions") renderDecisions();
    if (currentPage === "timeline") renderTimeline();
    if (currentPage === "resume") renderResume();
    if (currentPage === "network") renderNetwork();
    if (currentPage === "insights") renderInsights();
    if (currentPage === "forecast") renderForecast();
    if (currentPage === "questions") renderQuestions();
    if (currentPage === "knowledge") renderKnowledge();
    if (currentPage === "recall") renderRecall();
    if (currentPage === "goals") renderGoals();
    if (currentPage === "options") renderOptions();
    if (currentPage === "review") renderReviewCenter();
    if (currentPage === "selfcheck") renderSelfCheck();
    if (currentPage === "settings") renderSettings();
    window.dispatchEvent(new CustomEvent("xiantu:render"));
  }

  function navigate(page) {
    if (!pageMeta[page]) return;
    state.ui.page = page;
    persist();
    render();
    document.body.classList.remove("sidebar-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function field(label, name, options = {}) {
    const {
      type = "text", value = "", required = false, placeholder = "", full = false,
      min = "", max = "", rows = 3, hint = ""
    } = options;
    const requiredMark = required ? `<span class="required"> *</span>` : "";
    const classes = `field${full ? " full" : ""}`;
    if (type === "textarea") {
      return `<div class="${classes}">
        <label for="field-${escapeAttr(name)}">${escapeHtml(label)}${requiredMark}</label>
        <textarea id="field-${escapeAttr(name)}" name="${escapeAttr(name)}" rows="${rows}" placeholder="${escapeAttr(placeholder)}" ${required ? "required" : ""}>${escapeHtml(value)}</textarea>
        ${hint ? `<small>${escapeHtml(hint)}</small>` : ""}
      </div>`;
    }
    return `<div class="${classes}">
      <label for="field-${escapeAttr(name)}">${escapeHtml(label)}${requiredMark}</label>
      <input id="field-${escapeAttr(name)}" name="${escapeAttr(name)}" type="${escapeAttr(type)}" value="${escapeAttr(value)}" placeholder="${escapeAttr(placeholder)}" ${required ? "required" : ""} ${min !== "" ? `min="${escapeAttr(min)}"` : ""} ${max !== "" ? `max="${escapeAttr(max)}"` : ""}>
      ${hint ? `<small>${escapeHtml(hint)}</small>` : ""}
    </div>`;
  }

  function selectField(label, name, values, current, full = false) {
    return `<div class="field${full ? " full" : ""}">
      <label for="field-${escapeAttr(name)}">${escapeHtml(label)}</label>
      <select id="field-${escapeAttr(name)}" name="${escapeAttr(name)}">
        ${values.map(item => {
          const value = typeof item === "string" ? item : item.value;
          const text = typeof item === "string" ? item : item.label;
          return `<option value="${escapeAttr(value)}" ${String(current) === String(value) ? "selected" : ""}>${escapeHtml(text)}</option>`;
        }).join("")}
      </select>
    </div>`;
  }

  function scaleField(label, name, value = 3, allowUnknown = false) {
    const values = allowUnknown ? [0, 1, 2, 3, 4, 5] : [1, 2, 3, 4, 5];
    return `<div class="field full">
      <label>${escapeHtml(label)}</label>
      <div class="scale-row">
        ${values.map(number => `
          <label><input type="radio" name="${escapeAttr(name)}" value="${number}" ${Number(value) === number ? "checked" : ""}><span>${number || "未填"}</span></label>
        `).join("")}
      </div>
      <small>1 表示很低，5 表示很高；当前无法确定时选择“未填”。</small>
    </div>`;
  }

  function formTabs(type, editing) {
    if (editing) return "";
    return `<div class="entry-type-tabs" style="margin-bottom:18px">
      <button type="button" class="${type === "decision" ? "is-active" : ""}" data-form-type="decision">决策复盘</button>
      <button type="button" class="${type === "event" ? "is-active" : ""}" data-form-type="event">人生经历</button>
      <button type="button" class="${type === "resume" ? "is-active" : ""}" data-form-type="resume">履历条目</button>
      <button type="button" class="${type === "note" ? "is-active" : ""}" data-form-type="note">知识卡片</button>
      <button type="button" class="${type === "goal" ? "is-active" : ""}" data-form-type="goal">目标</button>
    </div>`;
  }

  function openRecordDialog(type = "decision", editId = "") {
    if (!["decision", "event", "resume", "note", "goal", "profile", "skills"].includes(type)) type = "decision";
    const isEditing = Boolean(editId);
    let data = {};
    if (type === "decision" && editId) data = state.decisions.find(item => item.id === editId) || {};
    if (type === "event" && editId) data = state.events.find(item => item.id === editId) || {};
    if (type === "resume" && editId) data = state.resumeItems.find(item => item.id === editId) || {};
    if (type === "note" && editId) data = state.notes.find(item => item.id === editId) || {};
    if (type === "goal" && editId) data = state.goals.find(item => item.id === editId) || {};
    if (type === "profile") data = state.profile;
    if (type === "skills") data = { skills: state.skills.join("，") };

    const form = $("#recordForm");
    form.dataset.type = type;
    form.dataset.editId = editId;
    $("#recordDialogTitle").textContent = isEditing
      ? `编辑${type === "decision" ? "决策" : type === "event" ? "经历" : type === "note" ? "知识卡片" : type === "goal" ? "目标" : "履历"}`
      : type === "profile" ? "编辑个人资料" : type === "skills" ? "编辑技能标签" : "新建记录";

    if (type === "decision") {
      $("#formFields").innerHTML = `
        ${formTabs(type, isEditing)}
        <section class="form-section">
          <h3 class="form-section-title">当时发生了什么</h3>
          <div class="form-grid">
            ${field("日期", "date", { type: "date", value: data.date || todayIso(), required: true })}
            ${selectField("决策类型", "category", categories, data.category || "成长")}
            ${field("一句话标题", "title", { value: data.title || "", required: true, placeholder: "例如：要不要接受这次机会？", full: true })}
            ${field("当时有哪些选项", "options", { type: "textarea", value: data.options || "", placeholder: "用分号隔开每个选项", full: true })}
            ${field("最终选择", "chosen", { type: "textarea", value: data.chosen || "", placeholder: "你实际做了什么？", full: true })}
            ${field("为什么这样选", "reasons", { type: "textarea", value: data.reasons || "", placeholder: "当时掌握的信息、担心和考虑", full: true })}
            ${field("当时的情绪", "feeling", { value: data.feeling || "", placeholder: "例如：兴奋但焦虑" })}
          </div>
        </section>
        <section class="form-section">
          <h3 class="form-section-title">当时的判断</h3>
          <div class="form-grid">
            ${scaleField("重要程度", "importance", data.importance ?? 3, true)}
            ${scaleField("当时有多大信心", "confidence", data.confidence ?? 3, true)}
            ${field("预期会发生什么", "expected", { type: "textarea", value: data.expected || "", full: true })}
            ${field("计划复盘日", "reviewDate", { type: "date", value: data.reviewDate || "" })}
            ${field("失败预警信号", "failureSignal", { type: "textarea", value: data.failureSignal || "", rows: 2, full: true, placeholder: "出现什么现象时，说明原判断可能不成立？" })}
            ${field("停止或调整条件", "stopCondition", { type: "textarea", value: data.stopCondition || "", rows: 2, full: true, placeholder: "满足什么条件时必须暂停、转向或求助？" })}
          </div>
        </section>
        <section class="form-section">
          <h3 class="form-section-title">后来发生了什么</h3>
          <div class="form-grid">
            ${selectField("复盘状态", "status", ["待复盘", "已复盘"], data.status || "待复盘")}
            ${selectField("实际结果", "outcome", [{ value: "0", label: "尚未复盘" }, { value: "1", label: "1 · 很糟" }, { value: "2", label: "2 · 低于预期" }, { value: "3", label: "3 · 一般" }, { value: "4", label: "4 · 不错" }, { value: "5", label: "5 · 很好" }], data.outcome ?? 0)}
            ${field("事后结论", "lesson", { type: "textarea", value: data.lesson || "", placeholder: "下次会保留什么、改变什么？", full: true })}
            ${field("标签", "tags", { value: (data.tags || []).join("，"), placeholder: "机会，边界，验证", full: true, hint: "用逗号或分号分隔，最多 12 个" })}
          </div>
        </section>`;
    }

    if (type === "event") {
      $("#formFields").innerHTML = `
        ${formTabs(type, isEditing)}
        <section class="form-section">
          <div class="form-grid">
            ${field("日期或阶段", "date", { value: data.date || todayIso(), required: true, placeholder: "例如：2026-10-30、2026-04 或 五年级" })}
            ${selectField("经历类型", "type", eventTypes, data.type || "成长")}
            ${field("发生了什么", "title", { value: data.title || "", required: true, placeholder: "例如：第一次独立完成……", full: true })}
            ${field("地点", "place", { value: data.place || "", placeholder: "城市、学校或线上" })}
            ${field("相关人物", "people", { value: data.people || "", placeholder: "用逗号分隔" })}
            ${field("这件事为什么重要", "description", { type: "textarea", value: data.description || "", rows: 6, placeholder: "背景、你做了什么、结果和感受", full: true })}
            ${field("标签", "tags", { value: (data.tags || []).join("，"), placeholder: "项目，转折，朋友", full: true })}
          </div>
        </section>`;
    }

    if (type === "resume") {
      $("#formFields").innerHTML = `
        ${formTabs(type, isEditing)}
        <section class="form-section">
          <div class="form-grid">
            ${selectField("履历类型", "kind", Object.entries(resumeKinds).map(([value, label]) => ({ value, label })), data.kind || "education")}
            ${field("标题", "title", { value: data.title || "", required: true, placeholder: "专业、岗位或项目名" })}
            ${field("组织 / 角色", "organization", { value: data.organization || "", placeholder: "学校、单位或你的角色" })}
            ${field("开始时间", "start", { value: data.start || "", placeholder: "2024-09" })}
            ${field("结束时间", "end", { value: data.end || "", placeholder: "2026-06 或 至今" })}
            ${field("具体内容", "description", { type: "textarea", value: data.description || "", rows: 6, placeholder: "尽量写清动作、方法、规模和可验证结果", full: true })}
            ${field("标签", "tags", { value: (data.tags || []).join("，"), placeholder: "技能，领域", full: true })}
          </div>
        </section>`;
    }

    if (type === "note") {
      $("#formFields").innerHTML = `
        ${formTabs(type, isEditing)}
        <section class="form-section">
          <div class="form-grid">
            ${selectField("知识类型", "type", noteTypes, data.type || "事实")}
            ${field("标题", "title", { value: data.title || "", required: true, placeholder: "一句能快速找回内容的话" })}
            ${field("正文", "content", { type: "textarea", value: data.content || "", rows: 7, full: true, placeholder: "记录事实、方法、原则、灵感或风险。尽量区分事实和判断。", required: true })}
            ${field("来源", "source", { value: data.source || "", placeholder: "书籍、网页、对话或个人经验" })}
            ${field("来源链接", "url", { value: data.url || "", type: "url", placeholder: "https://..." })}
            ${field("主动回忆问题（可选）", "reviewQuestion", { value: data.reviewQuestion || "", placeholder: "例如：这条知识的核心结论是什么？", full: true })}
            ${field("参考答案（可选）", "reviewAnswer", { type: "textarea", value: data.reviewAnswer || "", rows: 3, placeholder: "不填也可以，之后可在知识卡片中补充", full: true })}
            ${field("标签", "tags", { value: (data.tags || []).join("，"), placeholder: "训练，教学，方法", full: true })}
          </div>
        </section>`;
    }

    if (type === "goal") {
      $("#formFields").innerHTML = `
        ${formTabs(type, isEditing)}
        <section class="form-section">
          <div class="form-grid">
            ${selectField("发展领域", "domain", goalDomains, data.domain || "成长")}
            ${selectField("时间范围", "horizon", goalHorizons, data.horizon || "30天")}
            ${field("目标标题", "title", { value: data.title || "", required: true, placeholder: "例如：完成100米专项冬训阶段测试", full: true })}
            ${field("为什么重要", "why", { type: "textarea", value: data.why || "", rows: 3, full: true, placeholder: "这个目标服务于什么长期方向？" })}
            ${field("可验证的成功标准", "successMetric", { type: "textarea", value: data.successMetric || "", rows: 3, full: true, placeholder: "例如：100米达到某成绩，或完成一次可展示成果" })}
            ${field("下一步行动", "nextAction", { value: data.nextAction || "", placeholder: "只写一个具体动作", full: true })}
            ${field("检查日期", "reviewDate", { type: "date", value: data.reviewDate || "" })}
            ${field("当前进度（0-100）", "progress", { type: "number", value: data.progress ?? 0, min: 0, max: 100 })}
            ${selectField("状态", "status", ["未开始", "进行中", "已暂停", "已完成"], data.status || "进行中")}
            ${field("标签", "tags", { value: (data.tags || []).join("，"), placeholder: "短跑，课程，职业", full: true })}
          </div>
        </section>`;
    }

    if (type === "profile") {
      $("#formFields").innerHTML = `
        <section class="form-section">
          <h3 class="form-section-title">基本资料</h3>
          <div class="form-grid">
            ${field("姓名或称呼", "name", { value: data.name || "", required: true })}
            ${field("一句话概括", "headline", { value: data.headline || "" })}
            ${field("所在城市", "location", { value: data.location || "" })}
            ${field("邮箱", "email", { value: data.email || "", type: "email" })}
            ${field("电话（可选）", "phone", { value: data.phone || "" })}
            ${field("GitHub 账号", "github", { value: data.github || "" })}
            ${field("个人简介", "bio", { type: "textarea", value: data.bio || "", rows: 4, full: true })}
            ${field("履历上的个人概述", "resumeSummary", { type: "textarea", value: data.resumeSummary || "", rows: 5, full: true })}
          </div>
        </section>`;
    }

    if (type === "skills") {
      $("#formFields").innerHTML = `
        <section class="form-section">
          <div class="form-grid">
            ${field("技能标签", "skills", { type: "textarea", value: data.skills || "", rows: 6, full: true, placeholder: "Excel，数据分析，活动策划", hint: "用逗号或分号分隔" })}
          </div>
        </section>`;
    }

    const dialog = $("#recordDialog");
    if (!dialog.open) dialog.showModal();
    window.setTimeout(() => $("[name='title'], [name='name'], [name='skills']", form)?.focus(), 40);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const type = form.dataset.type;
    const editId = form.dataset.editId;
    const formData = new FormData(form);
    const value = name => String(formData.get(name) || "").trim();
    const now = new Date().toISOString();

    if (type === "decision") {
      const existing = state.decisions.find(item => item.id === editId);
      const item = {
        id: existing?.id || uid("decision"),
        date: value("date"),
        title: value("title"),
        category: value("category"),
        importance: toNumber(value("importance"), 3),
        confidence: toNumber(value("confidence"), 3),
        options: value("options"),
        chosen: value("chosen"),
        reasons: value("reasons"),
        feeling: value("feeling"),
        expected: value("expected"),
        reviewDate: value("reviewDate"),
        failureSignal: value("failureSignal"),
        stopCondition: value("stopCondition"),
        outcome: toNumber(value("outcome")),
        status: value("status"),
        lesson: value("lesson"),
        tags: splitTags(value("tags")),
        sample: false,
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };
      if (existing) state.decisions = state.decisions.map(entry => entry.id === existing.id ? item : entry);
      else state.decisions.unshift(item);
      showToast(existing ? "决策复盘已更新" : "决策复盘已保存");
    }

    if (type === "event") {
      const existing = state.events.find(item => item.id === editId);
      const item = {
        id: existing?.id || uid("event"),
        date: value("date"),
        group: existing?.group || "",
        sortDate: existing?.sortDate || value("date"),
        title: value("title"),
        type: value("type"),
        place: value("place"),
        people: value("people"),
        description: value("description"),
        tags: splitTags(value("tags")),
        inferred: existing?.inferred || false,
        sample: false,
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };
      if (existing) state.events = state.events.map(entry => entry.id === existing.id ? item : entry);
      else state.events.unshift(item);
      showToast(existing ? "人生记录已更新" : "人生记录已保存");
    }

    if (type === "resume") {
      const existing = state.resumeItems.find(item => item.id === editId);
      const item = {
        id: existing?.id || uid("resume"),
        kind: value("kind"),
        title: value("title"),
        organization: value("organization"),
        start: value("start"),
        end: value("end"),
        description: value("description"),
        tags: splitTags(value("tags")),
        inferred: existing?.inferred || false,
        sample: false,
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };
      if (existing) state.resumeItems = state.resumeItems.map(entry => entry.id === existing.id ? item : entry);
      else state.resumeItems.unshift(item);
      showToast(existing ? "履历条目已更新" : "履历条目已保存");
    }

    if (type === "note") {
      const existing = state.notes.find(item => item.id === editId);
      const item = {
        id: existing?.id || uid("note"),
        type: value("type"),
        title: value("title"),
        content: value("content"),
        source: value("source"),
        url: value("url"),
        reviewQuestion: value("reviewQuestion"),
        reviewAnswer: value("reviewAnswer"),
        reviewDueAt: existing?.reviewDueAt || "",
        reviewCount: existing?.reviewCount || 0,
        tags: splitTags(value("tags")),
        auto: false,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
        lastReviewedAt: existing?.lastReviewedAt || now
      };
      if (existing) state.notes = state.notes.map(entry => entry.id === existing.id ? item : entry);
      else state.notes.unshift(item);
      showToast(existing ? "知识卡片已更新" : "知识卡片已保存");
    }

    if (type === "goal") {
      const existing = state.goals.find(item => item.id === editId);
      const item = {
        id: existing?.id || uid("goal"),
        domain: value("domain"),
        horizon: value("horizon"),
        title: value("title"),
        why: value("why"),
        successMetric: value("successMetric"),
        nextAction: value("nextAction"),
        reviewDate: value("reviewDate"),
        progress: clamp(toNumber(value("progress")), 0, 100),
        status: value("status"),
        tags: splitTags(value("tags")),
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };
      if (existing) state.goals = state.goals.map(entry => entry.id === existing.id ? item : entry);
      else state.goals.unshift(item);
      showToast(existing ? "目标已更新" : "目标已保存");
    }

    if (type === "profile") {
      state.profile = {
        ...state.profile,
        name: value("name"),
        headline: value("headline"),
        location: value("location"),
        email: value("email"),
        phone: value("phone"),
        github: value("github"),
        bio: value("bio"),
        resumeSummary: value("resumeSummary")
      };
      showToast("个人资料已更新");
    }

    if (type === "skills") {
      state.skills = splitTags(value("skills"));
      showToast("技能标签已更新");
    }

    persist();
    $("#recordDialog").close();
    render();
  }

  function deleteItem(type, id) {
    const labels = { decision: "决策记录", event: "人生经历", resume: "履历条目", note: "知识卡片", goal: "发展目标" };
    if (!labels[type]) return;
    if (!window.confirm(`确定只删除这一条${labels[type]}吗？删除后无法在本站直接恢复，建议先导出备份。`)) return;
    if (type === "decision") state.decisions = state.decisions.filter(item => item.id !== id);
    if (type === "event") state.events = state.events.filter(item => item.id !== id);
    if (type === "resume") state.resumeItems = state.resumeItems.filter(item => item.id !== id);
    if (type === "note") state.notes = state.notes.filter(item => item.id !== id);
    if (type === "goal") state.goals = state.goals.filter(item => item.id !== id);
    persist();
    render();
    showToast("这一条记录已删除");
  }

  function clearSamples() {
    const count = state.decisions.filter(item => item.sample).length
      + state.events.filter(item => item.sample).length
      + state.resumeItems.filter(item => item.sample).length;
    if (!count) return;
    if (!window.confirm(`将清除 ${count} 条标有“示例”的记录。你自己新建的内容不会受影响。确定继续吗？`)) return;
    state.decisions = state.decisions.filter(item => !item.sample);
    state.events = state.events.filter(item => !item.sample);
    state.resumeItems = state.resumeItems.filter(item => !item.sample);
    persist();
    render();
    showToast("示例数据已清除");
  }

  function openSearch() {
    $("#searchDialog").showModal();
    $("#searchInput").value = "";
    renderSearch("");
    window.setTimeout(() => $("#searchInput").focus(), 40);
  }

  function collectSearchable() {
    return [
      ...state.decisions.map(item => ({
        id: item.id,
        page: "decisions",
        label: "决策",
        title: item.title,
        date: item.date,
        text: [item.category, item.options, item.chosen, item.reasons, item.expected, item.failureSignal, item.stopCondition, item.lesson, ...(item.tags || [])].join(" ")
      })),
      ...state.events.map(item => ({
        id: item.id,
        page: "timeline",
        label: "经历",
        title: item.title,
        date: item.date,
        text: [item.type, item.place, item.people, item.description, ...(item.tags || [])].join(" ")
      })),
      ...state.resumeItems.map(item => ({
        id: item.id,
        page: "resume",
        label: "履历",
        title: item.title,
        date: item.start,
        text: [resumeKinds[item.kind], item.organization, item.description, ...(item.tags || [])].join(" ")
      })),
      ...state.notes.map(item => ({
        id: item.id,
        page: "knowledge",
        label: "知识",
        title: item.title,
        date: String(item.updatedAt || item.createdAt || "").slice(0, 10),
        text: [item.type, item.content, item.reviewQuestion, item.reviewAnswer, item.source, ...(item.tags || [])].join(" ")
      })),
      ...(state.goals || []).map(item => ({
        id: item.id,
        page: "goals",
        label: "目标",
        title: item.title,
        date: item.reviewDate || "",
        text: [item.domain, item.horizon, item.why, item.successMetric, item.nextAction, ...(item.tags || [])].join(" ")
      })),
      ...(state.reviews || []).map(item => ({
        id: item.id,
        page: "review",
        label: "复盘",
        title: `${item.period}复盘`,
        date: item.date,
        text: [item.win, item.friction, item.nextAction].join(" ")
      })),
      ...(state.deepReflections || []).map(item => ({
        id: item.id,
        page: "questions",
        label: "深层追问",
        title: item.text.length > 34 ? `${item.text.slice(0, 34)}…` : item.text,
        date: item.date,
        text: item.text
      })),
      ...(state.checkins || []).map(item => ({
        id: item.id,
        page: "selfcheck",
        label: "自我审视",
        title: `精力${item.energy} · 情绪${item.mood} · 专注${item.focus}`,
        date: item.date,
        text: item.note || ""
      }))
    ];
  }

  function renderSearch(query) {
    const normalized = query.trim().toLowerCase();
    const results = collectSearchable()
      .filter(item => !normalized || `${item.title} ${item.text} ${item.date}`.toLowerCase().includes(normalized))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .slice(0, 30);
    const resultIcons = { decisions: "decisions", timeline: "timeline", resume: "resume", knowledge: "search", goals: "arrow", questions: "info", review: "check", selfcheck: "user" };
    $("#searchResults").innerHTML = results.length
      ? results.map(item => `
          <button class="search-result" data-action="search-jump" data-page="${item.page}">
            <svg class="icon"><use href="#i-${resultIcons[item.page] || "search"}"></use></svg>
            <span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.label)} · ${formatDate(item.date)}</span></span>
            <svg class="icon"><use href="#i-arrow"></use></svg>
          </button>`).join("")
      : `<div class="empty-state">
          <div class="empty-mark"><svg class="icon"><use href="#i-search"></use></svg></div>
          <h4>没有找到匹配内容</h4>
          <p>换一个标题、人名或标签试试。</p>
        </div>`;
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `弦图-私人备份-${todayIso()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("备份文件已导出");
  }

  function importBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ""));
        const valid = parsed
          && typeof parsed === "object"
          && Array.isArray(parsed.decisions)
          && Array.isArray(parsed.events)
          && Array.isArray(parsed.resumeItems)
          && parsed.profile
          && typeof parsed.profile === "object";
        if (!valid) throw new Error("invalid");
        if (!window.confirm("恢复备份会覆盖当前浏览器里的全部数据。确定继续吗？建议先导出当前数据。")) return;
        state = {
          ...seedState(),
          ...parsed,
          profile: { ...seedState().profile, ...parsed.profile },
          ui: { ...seedState().ui, page: state.ui.page }
        };
        persist();
        render();
        showToast("备份已恢复");
      } catch {
        window.alert("这个文件不是有效的弦图备份，当前数据没有改变。");
      } finally {
        $("#importFile").value = "";
      }
    };
    reader.readAsText(file);
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-action], [data-page], [data-close-dialog], [data-form-type]");
    if (!button) return;

    if (button.dataset.formType) {
      openRecordDialog(button.dataset.formType);
      return;
    }
    if (button.dataset.closeDialog) {
      $(`#${button.dataset.closeDialog}`)?.close();
      return;
    }

    const action = button.dataset.action;
    if (!action && button.dataset.page) {
      navigate(button.dataset.page);
      return;
    }

    if (action === "navigate" || action === "search-jump") {
      if (action === "search-jump") $("#searchDialog").close();
      navigate(button.dataset.page);
      return;
    }
    if (action === "new") openRecordDialog(button.dataset.type || "decision");
    if (action === "edit") openRecordDialog(button.dataset.type, button.dataset.id);
    if (action === "delete") deleteItem(button.dataset.type, button.dataset.id);
    if (action === "review-note") {
      const note = state.notes.find(item => item.id === button.dataset.id);
      if (note) {
        if (note.reviewQuestion) {
          const queue = state.notes.filter(item => item.reviewQuestion);
          state.ui.recallIndex = Math.max(0, queue.findIndex(item => item.id === note.id));
          state.ui.recallShowAnswer = false;
          state.ui.page = "recall";
          persist();
          render();
        } else {
          note.lastReviewedAt = new Date().toISOString();
          note.reviewDueAt = dateAfterDays(30);
          persist();
          renderKnowledge();
          showToast("已记录这次复习");
        }
      }
    }
    if (action === "show-recall") {
      state.ui.recallShowAnswer = true;
      persist();
      renderRecall();
    }
    if (action === "next-recall") {
      const count = state.notes.filter(item => item.reviewQuestion).length;
      state.ui.recallIndex = count ? (toNumber(state.ui.recallIndex) + 1) % count : 0;
      state.ui.recallShowAnswer = false;
      persist();
      renderRecall();
    }
    if (action === "rate-recall") {
      const note = state.notes.find(item => item.id === button.dataset.id);
      const intervals = { forgot: 1, fuzzy: 3, remembered: 7 };
      if (note) {
        const days = intervals[button.dataset.rating] || 3;
        note.lastReviewedAt = new Date().toISOString();
        note.reviewDueAt = dateAfterDays(days);
        note.reviewCount = toNumber(note.reviewCount) + 1;
        state.ui.recallShowAnswer = false;
        const queueCount = state.notes.filter(item => item.reviewQuestion).length;
        state.ui.recallIndex = queueCount ? (toNumber(state.ui.recallIndex) + 1) % queueCount : 0;
        persist();
        renderRecall();
        showToast(`已安排 ${days} 天后再次复习`);
      }
    }
    if (action === "goal-progress") {
      const goal = state.goals.find(item => item.id === button.dataset.id);
      if (goal) {
        goal.progress = clamp(toNumber(goal.progress) + 10, 0, 100);
        goal.status = "进行中";
        goal.updatedAt = new Date().toISOString();
        persist();
        renderGoals();
      }
    }
    if (action === "goal-complete" || action === "goal-reopen") {
      const goal = state.goals.find(item => item.id === button.dataset.id);
      if (goal) {
        goal.status = action === "goal-complete" ? "已完成" : "进行中";
        if (goal.status === "已完成") goal.progress = 100;
        goal.updatedAt = new Date().toISOString();
        persist();
        renderGoals();
      }
    }
    if (action === "delete-reflection") {
      if (!window.confirm("确定删除这一条思考记录吗？删除后无法在本站直接恢复。")) return;
      state.deepReflections = (state.deepReflections || []).filter(item => item.id !== button.dataset.id);
      persist();
      renderQuestions();
      showToast("这条思考记录已删除");
    }
    if (action === "delete-checkin") {
      if (!window.confirm("确定删除这一条自我审视记录吗？删除后无法在本站直接恢复。")) return;
      state.checkins = (state.checkins || []).filter(item => item.id !== button.dataset.id);
      persist();
      renderSelfCheck();
      showToast("这条自我审视记录已删除");
    }
    if (action === "clear-samples") clearSamples();
    if (action === "edit-profile") openRecordDialog("profile");
    if (action === "edit-skills") openRecordDialog("skills");
    if (action === "search") openSearch();
    if (action === "export") exportBackup();
    if (action === "import") $("#importFile").click();
    if (action === "print") window.print();
    if (action === "reload-sync") window.location.reload();
    if (action === "refresh-insights") {
      renderInsights();
      showToast("分析已根据当前记录重新生成");
    }
  });

  document.addEventListener("change", event => {
    if (event.target.id === "decisionCategory") {
      state.ui.decisionCategory = event.target.value;
      persist();
      renderDecisions();
    }
    if (event.target.id === "decisionStatus") {
      state.ui.decisionStatus = event.target.value;
      persist();
      renderDecisions();
    }
    if (event.target.id === "timelineType") {
      state.ui.timelineType = event.target.value;
      persist();
      renderTimeline();
    }
    if (event.target.id === "knowledgeType") {
      state.ui.knowledgeType = event.target.value;
      persist();
      renderKnowledge();
    }
  });

  $("#searchInput").addEventListener("input", event => {
    clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => renderSearch(event.target.value), 90);
  });
  $("#recordForm").addEventListener("submit", handleFormSubmit);
  document.addEventListener("submit", event => {
    if (event.target.id === "reflectionForm") {
      event.preventDefault();
      const text = String(new FormData(event.target).get("reflection") || "").trim();
      if (!text) {
        showToast("先写下一句回答，再保存");
        return;
      }
      state.deepReflections = Array.isArray(state.deepReflections) ? state.deepReflections : [];
      state.deepReflections.unshift({ id: uid("reflection"), date: todayIso(), text, createdAt: new Date().toISOString() });
      persist();
      renderQuestions();
      showToast("这次回答已保存在本机");
      return;
    }
    if (event.target.id === "reviewForm") {
      event.preventDefault();
      const formData = new FormData(event.target);
      const nextAction = String(formData.get("nextAction") || "").trim();
      if (!nextAction) {
        showToast("先写下一步最重要的动作");
        return;
      }
      state.reviews = Array.isArray(state.reviews) ? state.reviews : [];
      state.reviews.unshift({
        id: uid("review"),
        period: String(formData.get("period") || "本周"),
        date: String(formData.get("date") || todayIso()),
        win: String(formData.get("win") || "").trim(),
        friction: String(formData.get("friction") || "").trim(),
        nextAction,
        createdAt: new Date().toISOString()
      });
      persist();
      renderReviewCenter();
      showToast("阶段复盘已保存");
      return;
    }
    if (event.target.id === "checkinForm") {
      event.preventDefault();
      const formData = new FormData(event.target);
      const now = new Date().toISOString();
      const date = todayIso();
      const existing = (state.checkins || []).find(item => item.date === date);
      const entry = {
        id: existing?.id || uid("checkin"),
        date,
        energy: toNumber(formData.get("energy"), 3),
        mood: toNumber(formData.get("mood"), 3),
        calm: toNumber(formData.get("calm"), 3),
        focus: toNumber(formData.get("focus"), 3),
        agency: toNumber(formData.get("agency"), 3),
        note: String(formData.get("note") || "").trim(),
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };
      state.checkins = existing
        ? state.checkins.map(item => item.id === existing.id ? entry : item)
        : [entry, ...(state.checkins || [])];
      persist();
      renderSelfCheck();
      showToast(existing ? "今天的状态记录已更新" : "状态记录已保存");
    }
  });
  $("#importFile").addEventListener("change", event => importBackup(event.target.files?.[0]));
  $("#menuButton").addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
  $("#sidebarBackdrop").addEventListener("click", () => document.body.classList.remove("sidebar-open"));
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });

  window.XIANTU = {
    getState: () => state,
    replaceState: next => {
      if (!next || typeof next !== "object") return false;
      const base = cleanState();
      state = {
        ...base,
        ...next,
        profile: { ...base.profile, ...(next.profile || {}) },
        ui: { ...state.ui, ...(next.ui || {}) }
      };
      persist();
      render();
      return true;
    },
    getSeed: () => seedState()
  };

  persist();
  render();
})();
