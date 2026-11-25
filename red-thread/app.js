/* =========================================================
   红线 Red Thread v3 — 主程序
   设置在 config.js，卡片文字在 cards.js，人格文字在 personas.js
   ========================================================= */
(function () {
  "use strict";

  const CARDS = window.CARDS, PERSONAS = window.PERSONAS, QUESTIONS = window.QUESTIONS;

  /* ---------- 界面文字 · UI text ---------- */
  const T = {
    zh: {
      edition: "2027 爱情特别版",
      title: "你是哪一种|东方恋人？",  // | = 手机上允许换行的位置
      subtitle: "1 分钟测出你的红线人格，再邀请 TA 看看你们合不合拍。",
      tag1: "1 分钟", tag2: "12 种人格", tag3: "双人合拍",
      aboutQ: "什么是红线？",
      aboutA: "传说唐代有位“月下老人”，用一根看不见的红线系住命中注定的两个人。无论相隔多远，红线都会把他们牵到一起。",
      start: "开始测试",
      mascotHello: "来，月老帮你牵根线",
      mascotTied: "红线系好啦！",
      seeToday: "查看今天的红线",
      seeDuo: "看看我们的组合",
      invite: (n) => n + " 给你牵了一根红线，看看你们是什么组合？",
      valentine: (d) => "距情人节还有 " + d + " 天",
      valentineToday: "今天是情人节 ♡",
      formTitle: "留下你的名字",
      nickname: "昵称（最多 12 字）",
      birthday: "生日",
      month: "月", day: "日",
      status: "你现在的状态",
      st_single: "单身", st_maybe: "暧昧中", st_inlove: "恋爱中", st_healing: "刚结束一段关系",
      next: "下一步",
      privacy: "信息只保存在你的手机上，不会上传。",
      errName: "请填写昵称", errBday: "请选择生日", errStatus: "请选择你现在的状态",
      back: "上一步",
      step: (i, n) => "第 " + i + " / " + n + " 题",
      tying: "红线正在系上……",
      youAre: "你是",
      personaName: (p) => p.zh.name + "恋人",
      shine: "你的闪光点",
      tip: "小提醒",
      todayCard: "今日缘分卡",
      question: "反思问题",
      action: "今日小行动",
      save: "保存结果卡",
      saving: "正在生成……",
      send: "把红线牵给 TA",
      reportTitle: "解锁你们的双人合拍深度报告",
      reportPrice: "£3.99",
      reportItems: ["你们的相处方式", "你们最容易卡住的地方", "3 个值得一起聊的问题", "属于你们的东方典故"],
      reportBlur: [
        "你们在一起时，一个更习惯先表达，另一个更习惯先观察，这让你们……",
        "当节奏不一样的时候，你们最容易在……的问题上互相误会……",
        "第一个问题：最近一次你觉得被对方理解，是什么时候？第二个……",
        "像古人的……一样，你们的故事里藏着一份……"
      ],
      reportBtn: "解锁报告",
      // 两个付费选项（付费意愿测试，现在不会真的收费）
      planReportName: "单份双人报告", planReportPrice: "£3.99", planReportTerms: "一次性付款",
      planMemberName: "红线会员", planMemberPrice: "£4.99/月", planMemberTerms: "随时取消",
      planMemberBadge: "更多人选择",
      planMemberPerks: ["每周一个双人小仪式或聊天问题", "每月新卡和新典故", "所有双人报告免费", "春节、情人节、七夕限定卡"],
      planMemberBtn: "加入会员",
      plansTitle: "想更深入地了解你们的红线？",
      freeLabel: "免费", freeList: "人格测试 · 每日缘分卡 · 典故 · 红线册",
      memberLabel: "会员另享", memberList: "每周双人仪式 · 每月新卡 · 双人报告 · 节日限定卡",
      reportLockedNote: "邀请 TA 完成测试后解锁",
      reportLockedBtn: "先邀请 TA",
      planChosen: "你选择的是：",
      memberModalTitle: "红线会员即将上线！留下邮箱，首发时送你 1 个月免费。",
      memberThanks: "谢谢！会员上线时，我们会把 1 个月免费会员发到你的邮箱。",
      noCharge: "现在不会收取任何费用。",
      reportNote: "报告根据你们的答题生成，仅供娱乐与关系反思。",
      inviteUnlock: "邀请 TA 完成测试，可以解锁你们的双人合拍报告。",
      locked: "今天的红线已系好，明天 00:00 再来",
      duoLabel: "双人红线",
      duoTitle: (a, b) => a + " × " + b + " 的红线",
      saveDuo: "保存双人卡",
      duoNote: "组合结果仅供娱乐，真实的关系靠真实的相处。",
      shareTitle: "红线 Red Thread · 你是哪一种东方恋人？",
      shareText: (n) => n + " 给你牵了一根红线，看看你们是什么组合？",
      copied: "链接已复制，发给 TA 吧",
      copyFail: "复制失败，请手动复制这个链接：",
      payModalTitle: "报告即将上线！留下邮箱，首发时免费送你们一份。",
      payModalDesc: "报告根据你们的答题生成，仅供娱乐与关系反思。",
      payAgree: "我同意接收上线通知",
      paySubmit: "提交",
      payThanks: "谢谢！报告上线时，我们会把免费报告发到你的邮箱。",
      errEmail: "请填写正确的邮箱",
      errAgree: "请勾选同意接收上线通知",
      wlTitle: "加入 Inner Lab 候补名单",
      wlDesc: "更多关于爱与自我的小实验，即将开放。",
      wlPlaceholder: "你的邮箱",
      wlJoin: "加入",
      wlThanks: "谢谢！我们会第一时间通知你。",
      wlError: "提交失败，请检查网络后再试。",
      notReady: "邮箱提交功能还没开通，请稍后再试。",
      disclaimer: "本内容仅供娱乐与自我反思，不构成任何建议。",
      storyTitle: "这张卡的故事",
      expand: "展开", collapse: "收起",
      sourcePrefix: "出处：",
      bookEntry: (n, total) => "我的红线册 " + n + " / " + total,
      bookTitle: "我的红线册",
      bookDesc: (n, total) => "已收集 " + n + " / " + total + " 张。每天一张，集齐解锁月老的完整故事。",
      bookDone: "12 张已集齐！月老的完整故事和金色卡面已解锁。",
      bookNote: "清除浏览器数据会丢失收集记录。",
      bookBack: "返回",
      bookTap: "点开已收集的卡片，可以重看寄语和典故。",
      legendLocked: (n, total) => "集齐 12 张，解锁月老的完整故事（" + n + " / " + total + "）",
      legendOpen: "✦ 月老的完整故事 · 已解锁",
      collectTip: "明天再来，集齐 12 张，解锁月老的完整故事。",
      goldFace: "金色限定卡面",
      special: "羊年限定",
      forName: (n) => "致 " + n,
      brand: "红线 Red Thread",
      edition: "2027 爱情特别版",
      duoHeader: "红线 · 双人卡",
      longPress: "长按图片保存，或点击下方按钮下载",
      download: "下载图片",
      close: "关闭"
    },
    en: {
      edition: "2027 Love Edition",
      title: "Which Eastern lover|are you?",
      subtitle: "Find your Red Thread type in one minute, then invite them to see how you match.",
      tag1: "1 min", tag2: "12 types", tag3: "Duo match",
      aboutQ: "What is the Red Thread?",
      aboutA: "Chinese legend tells of the Old Man Under the Moon, who ties an invisible red thread between two people destined to meet. However far apart, the thread brings them together.",
      start: "Start",
      mascotHello: "Come, let the Old Man tie your thread",
      mascotTied: "Your thread is tied!",
      seeToday: "See today's thread",
      seeDuo: "See what we are together",
      invite: (n) => n + " sent you a red thread. See what you are together?",
      valentine: (d) => d + (d === 1 ? " day" : " days") + " until Valentine's Day",
      valentineToday: "Happy Valentine's Day ♡",
      formTitle: "Tell the thread who you are",
      nickname: "Nickname (up to 12 characters)",
      birthday: "Birthday",
      month: "Month", day: "Day",
      status: "Where are you right now?",
      st_single: "Single", st_maybe: "Something's starting", st_inlove: "In a relationship", st_healing: "Healing from one",
      next: "Next",
      privacy: "Your info stays on your device.",
      errName: "Please enter a nickname", errBday: "Please choose your birthday", errStatus: "Please choose where you are right now",
      back: "Back",
      step: (i, n) => "Question " + i + " of " + n,
      tying: "Tying the thread…",
      youAre: "You are",
      personaName: (p) => p.en.name,
      shine: "Your light",
      tip: "A gentle reminder",
      todayCard: "Today's card",
      question: "Reflect",
      action: "Today's small step",
      save: "Save my card",
      saving: "Creating…",
      send: "Send a thread to someone",
      reportTitle: "Unlock your Duo Match Report",
      reportPrice: "£3.99",
      reportItems: ["How you two connect", "Where you might get stuck", "3 questions to talk about together", "Your Eastern love story"],
      reportBlur: [
        "When you're together, one of you tends to speak first while the other watches, which means…",
        "When your paces differ, you're most likely to misread each other about…",
        "First: when did you last feel truly understood by them? Second…",
        "Like the old tale of…, your story holds a quiet…"
      ],
      reportBtn: "Unlock the report",
      planReportName: "Single Duo Report", planReportPrice: "£3.99", planReportTerms: "one-off",
      planMemberName: "Red Thread Membership", planMemberPrice: "£4.99/month", planMemberTerms: "cancel anytime",
      planMemberBadge: "Most popular",
      planMemberPerks: ["A small ritual or conversation prompt for two, every week", "New cards and new stories every month", "Every Duo Report included free", "Limited cards for Lunar New Year, Valentine's Day and Qixi"],
      planMemberBtn: "Become a member",
      plansTitle: "Want to go deeper together?",
      freeLabel: "Free", freeList: "Persona test · Daily card · Stories · Red Thread Book",
      memberLabel: "Members also get", memberList: "Weekly rituals for two · New cards monthly · Duo Reports · Festival cards",
      reportLockedNote: "Unlocks after they finish the test",
      reportLockedBtn: "Invite them first",
      planChosen: "You chose: ",
      memberModalTitle: "Membership is coming soon! Leave your email for one free month at launch.",
      memberThanks: "Thank you! We'll email your free month at launch.",
      noCharge: "You won't be charged anything now.",
      reportNote: "Based on your answers. For fun and reflection.",
      inviteUnlock: "Invite them to unlock your Duo Match Report.",
      locked: "Today's thread is tied. Come back after midnight.",
      duoLabel: "Two threads",
      duoTitle: (a, b) => a + " × " + b + "'s Red Thread",
      saveDuo: "Save our card",
      duoNote: "Just for fun: real relationships are built by real time together.",
      shareTitle: "Red Thread · Which Eastern lover are you?",
      shareText: (n) => n + " sent you a red thread. See what you are together?",
      copied: "Link copied. Send it to them!",
      copyFail: "Couldn't copy. Please copy this link:",
      payModalTitle: "Coming soon! Leave your email and get your first report free at launch.",
      payModalDesc: "Based on your answers. For fun and reflection.",
      payAgree: "I agree to receive a launch notification",
      paySubmit: "Submit",
      payThanks: "Thank you! We'll email your free report at launch.",
      errEmail: "Please enter a valid email",
      errAgree: "Please tick the box to receive the notification",
      wlTitle: "Join the Inner Lab waitlist",
      wlDesc: "More small experiments in love and self, coming soon.",
      wlPlaceholder: "Your email",
      wlJoin: "Join",
      wlThanks: "Thank you! We'll let you know first.",
      wlError: "Couldn't submit. Please check your connection and try again.",
      notReady: "Email sign-up isn't open yet. Please try again later.",
      disclaimer: "For entertainment and self-reflection only.",
      storyTitle: "The story behind this card",
      expand: "Read more", collapse: "Show less",
      sourcePrefix: "Source: ",
      bookEntry: (n, total) => "My Red Thread Book " + n + " / " + total,
      bookTitle: "My Red Thread Book",
      bookDesc: (n, total) => n + " of " + total + " collected. One card a day; collect all 12 to unlock the full legend.",
      bookDone: "All 12 collected! The full legend and the gold card face are unlocked.",
      bookNote: "Clearing browser data will reset your collection.",
      bookBack: "Back",
      bookTap: "Tap a collected card to read its message and story again.",
      legendLocked: (n, total) => "Collect all 12 to unlock the full legend (" + n + " / " + total + ")",
      legendOpen: "✦ The full legend · Unlocked",
      collectTip: "Come back tomorrow. Collect all 12 to unlock the full legend.",
      goldFace: "Gold edition",
      special: "Year of the Goat",
      forName: (n) => "For " + n,
      brand: "Red Thread 红线",
      edition: "2027 Love Edition",
      duoHeader: "Red Thread · Together",
      longPress: "Press and hold the image to save, or tap below to download",
      download: "Download",
      close: "Close"
    }
  };

  const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const VALENTINE = new Date(2027, 1, 14); // 2027-02-14
  const STYLE_ICON = { moon: "moon", lantern: "lantern", tea: "tea", mountain: "mountain" };
  // 人格图标：默认用风格图标；个别人格有自己的图标
  const PERSONA_ICON = { 0: "firefly" };
  function personaIcon(pi) { return PERSONA_ICON[pi] || STYLE_ICON[PERSONAS[pi].style]; }

  /* ---------- 本地存储（失败也没关系） ---------- */
  const KEY = "redthread.v1";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }
  let store = load();

  /* ---------- 统计事件位置 ----------
     以后接统计工具时，在 track() 里把事件发出去即可。
     注意：Cloudflare Web Analytics 目前只统计访问量，不支持自定义事件；
     如需统计下面这些按钮，可以换用 Plausible / Umami / Google Analytics 等。
     事件名：
       "start"            点击「系上红线」
       "quiz_done"        做完 3 道题（完成体验）
       "save_card"        保存结果卡
       "save_duo"         保存双人卡
       "send_thread"      点击「把红线牵给 TA」
       "invite_open"      通过双人链接打开网站
       "pay_click"        点击付费选项：pay_click-duo-report（单份报告）、pay_click-membership（会员）、
                          pay_click-duo-report-solo（单人用户点了还没解锁的报告 → 会直接打开邀请）
       "pay_email_submit" 在付费弹窗里提交邮箱（只在真正提交成功后记录），同样带 -duo-report 或 -membership
       "waitlist"         加入 Inner Lab 候补名单                    */
  function track(name, data) {
    // GoatCounter：每个事件在后台显示为 “event-事件名”；
    // 付费按钮会多带一个选项名，例如 “event-pay_click-membership”。
    // 只允许 product / plan 这两个固定值，不会记录昵称、生日或邮箱。
    const tag = data && (data.product || data.plan);
    const path = "event-" + name + (tag && /^[a-z0-9-]+$/.test(tag) ? "-" + tag : "");
    const send = () => {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: path, title: path.slice(6), event: true });
        return true;
      }
      return false;
    };
    if (!send()) setTimeout(send, 2500); // 统计脚本还没加载完时，稍后再试一次
  }
  // 按 config.js 里的设置加载统计脚本（留空就不加载）
  function loadAnalytics() {
    const cf = (window.CF_ANALYTICS_TOKEN || "").trim();
    if (cf) {
      const sc = document.createElement("script");
      sc.defer = true;
      sc.src = "https://static.cloudflareinsights.com/beacon.min.js";
      sc.setAttribute("data-cf-beacon", JSON.stringify({ token: cf }));
      document.head.appendChild(sc);
    }
    const gc = (window.GOATCOUNTER_CODE || "").trim();
    if (/^[a-z0-9-]+$/i.test(gc)) {
      const sg = document.createElement("script");
      sg.async = true;
      sg.src = "https://gc.zgo.at/count.js";
      sg.setAttribute("data-goatcounter", "https://" + gc + ".goatcounter.com/count");
      document.head.appendChild(sg);
    }
  }

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);
  let lang = store.lang || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en");
  let answers = {};
  let quizStep = 0;
  let current = null; // 今天的结果
  let invite = readInvite();

  function pad2(n) { return String(n).padStart(2, "0"); }
  function todayStr() {
    const d = new Date();
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }
  // 抽卡规则在 draw.js：同一天结果不变，并优先抽还没收集到的卡
  function pickCard(nickname, month, day) {
    return window.RT_DRAW.drawCard(nickname, month, day, todayStr(), getCollected(), CARDS.length);
  }
  /* ---------- 红线册（收集记录） ---------- */
  function getCollected() {
    const arr = Array.isArray(store.collected) ? store.collected : [];
    return arr.filter((i) => Number.isInteger(i) && i >= 0 && i < CARDS.length);
  }
  function addCollected(i) {
    const arr = getCollected();
    if (!arr.includes(i)) { arr.push(i); store.collected = arr; save(); }
  }
  function isComplete() { return getCollected().length >= CARDS.length; }
  function cleanName(s) {
    return String(s || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 12);
  }
  function readInvite() {
    try {
      const q = new URLSearchParams(location.search);
      const from = cleanName(q.get("from"));
      const p = parseInt(q.get("p"), 10);
      if (from && p >= 1 && p <= PERSONAS.length) return { from, p: p - 1 };
    } catch (e) { /* ignore */ }
    return null;
  }
  function siteUrl() {
    const s = (window.SITE_URL || "").trim();
    if (s && !/example/.test(s)) return s;
    return location.href.split(/[?#]/)[0]; // 还没设置时，用当前网址
  }
  function inviteLink() {
    const base = siteUrl();
    return base + (base.includes("?") ? "&" : "?") +
      "from=" + encodeURIComponent(current.nickname) + "&p=" + pad2(current.persona + 1);
  }
  function hasToday() {
    const t = store.today;
    return !!(t && t.date === todayStr() && CARDS[t.index] && PERSONAS[t.persona]);
  }
  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
    $(id).classList.add("is-active");
    window.scrollTo(0, 0);
  }
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function msgLines(card, l) {
    return card[l].message.split("/").map((s) => s.trim()).filter(Boolean);
  }
  function msgPlain(card, l) { return card[l].message.replace(/\s*\/\s*/g, l === "en" ? " " : ""); }

  /* ---------- 语言 ---------- */
  function applyLang() {
    const t = T[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t[el.dataset.i18n];
      if (typeof v === "string") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t[el.dataset.i18nPlaceholder]; });
    fillBirthday();
    renderHome();
    if ($("screen-quiz").classList.contains("is-active")) renderQuiz();
    if (current) renderResult(false);
    if ($("screen-book").classList.contains("is-active")) renderBook();
    if (!$("sheet").classList.contains("hidden")) closeSheet();
    if (!$("payModal").classList.contains("hidden")) renderPayModal();
    store.lang = lang; save();
  }

  /* ---------- 首页 ---------- */
  function renderHome() {
    const t = T[lang];
    const done = hasToday();
    $("btnStart").textContent = done ? (invite ? t.seeDuo : t.seeToday) : t.start;

    renderFan();
    // 老用户：首页显示红线册入口
    const nGot = getCollected().length;
    $("bookEntryHome").textContent = t.bookEntry(nGot, CARDS.length);
    $("bookEntryHome").classList.toggle("hidden", nGot === 0);
    // 主标题：只在 | 处换行，避免一行只剩一两个字
    const title = document.querySelector("#screen-home .title");
    title.textContent = "";
    t.title.split("|").forEach((part, i) => {
      if (i) title.appendChild(document.createTextNode(lang === "zh" ? "" : " "));
      const sp = document.createElement("span");
      sp.className = "nb";
      sp.textContent = part;
      title.appendChild(sp);
    });

    const inv = $("inviteLine");
    if (invite) { inv.textContent = t.invite(invite.from); inv.classList.remove("hidden"); }
    else inv.classList.add("hidden");

    // 距情人节还有 X 天（过了就隐藏）
    const now = new Date();
    const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.round((VALENTINE - today0) / 86400000);
    const v = $("valentine");
    if (days < 0) v.classList.add("hidden");
    else { v.textContent = days === 0 ? t.valentineToday : t.valentine(days); v.classList.remove("hidden"); }
  }

  // 首页扇形展开的 3 张人格卡：灯笼型、月光型、流萤型
  const FAN_PERSONAS = [4, 1, 0];
  function renderFan() {
    const fan = $("fan");
    if (!fan) return;
    fan.querySelectorAll(".fan-card").forEach((n) => n.remove());
    FAN_PERSONAS.forEach((pi) => {
      const p = PERSONAS[pi];
      const card = document.createElement("div");
      card.className = "fan-card";
      const art = document.createElement("div");
      art.className = "fan-art";
      setPersonaArt(art, pi);
      const name = document.createElement("div");
      name.className = "fan-name";
      name.textContent = lang === "zh" ? p.zh.name : p.en.name;
      const sub = document.createElement("div");
      sub.className = "fan-sub";
      sub.textContent = lang === "zh" ? p.en.name : p.zh.name;
      card.append(art, name, sub);
      fan.appendChild(card);
    });
  }
  // 人格插画：images/persona-01.png … persona-12.png；没有就用风格图标
  function setPersonaArt(el, pi) {
    el.innerHTML = symbolSVG(personaIcon(pi));
    const img = new Image();
    img.alt = "";
    img.onload = () => { el.innerHTML = ""; el.appendChild(img); };
    img.src = "images/persona-" + pad2(pi + 1) + ".png";
  }

  /* ---------- 生日下拉 ---------- */
  function fillBirthday() {
    const t = T[lang];
    const m = $("bMonth");
    const mv = m.value, dv = $("bDay").value;
    m.innerHTML = '<option value="">' + t.month + "</option>";
    for (let i = 1; i <= 12; i++) {
      m.insertAdjacentHTML("beforeend", '<option value="' + i + '">' + (lang === "zh" ? i + " 月" : MONTHS_EN[i - 1]) + "</option>");
    }
    m.value = mv;
    fillDays(dv);
  }
  function fillDays(keep) {
    const t = T[lang];
    const d = $("bDay");
    const max = DAYS_IN_MONTH[(parseInt($("bMonth").value, 10) || 1) - 1];
    d.innerHTML = '<option value="">' + t.day + "</option>";
    for (let i = 1; i <= max; i++) {
      d.insertAdjacentHTML("beforeend", '<option value="' + i + '">' + (lang === "zh" ? i + " 日" : i) + "</option>");
    }
    if (keep && parseInt(keep, 10) <= max) d.value = keep;
  }

  /* ---------- 插画：图标（没有图片时的占位） ---------- */
  function symbolSVG(name, special) {
    const R = "#B8302A", I = "#2B2522", G = "#C9A66B";
    const s = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
    const shapes = {
      eye: `<path d="M50 100 Q100 55 150 100 Q100 145 50 100Z" stroke="${I}" stroke-width="3" ${s}/><circle cx="100" cy="100" r="15" fill="${R}"/>`,
      thread: `<path d="M35 120 C60 70 85 150 100 100 C110 70 130 85 118 100 C105 115 90 95 100 100 C120 120 140 70 165 85" stroke="${R}" stroke-width="3.5" ${s}/>`,
      moon: `<path d="M118 55 A48 48 0 1 0 140 135 A38 38 0 1 1 118 55Z" fill="${R}" opacity=".9"/><path d="M45 150 Q70 138 95 150 T145 150" stroke="${G}" stroke-width="3" ${s}/>`,
      home: `<path d="M55 100 L100 62 L145 100" stroke="${I}" stroke-width="3.5" ${s}/><path d="M66 95 V145 H134 V95" stroke="${I}" stroke-width="3" ${s}/><rect x="90" y="115" width="20" height="30" fill="${R}"/>`,
      blossom: [0, 72, 144, 216, 288].map((a) => `<ellipse cx="100" cy="72" rx="16" ry="26" fill="${R}" opacity=".85" transform="rotate(${a} 100 100)"/>`).join("") + `<circle cx="100" cy="100" r="9" fill="${G}"/>`,
      knot: `<path d="M40 100 C70 100 80 60 100 75 C120 90 80 125 100 125 C120 125 80 90 100 75 C120 60 130 100 160 100" stroke="${R}" stroke-width="4" ${s}/>`,
      lantern: `<line x1="100" y1="40" x2="100" y2="55" stroke="${I}" stroke-width="3"/><rect x="82" y="55" width="36" height="8" fill="${I}"/><ellipse cx="100" cy="100" rx="40" ry="38" fill="${R}"/><path d="M100 62 V138 M80 66 Q70 100 80 134 M120 66 Q130 100 120 134" stroke="${G}" stroke-width="2" ${s}/><rect x="82" y="137" width="36" height="8" fill="${I}"/><path d="M100 145 V168" stroke="${R}" stroke-width="3" ${s}/>`,
      mountain: `<path d="M30 145 L80 75 L110 115 L130 90 L170 145Z" stroke="${I}" stroke-width="3" ${s}/><circle cx="140" cy="62" r="12" fill="${R}"/><path d="M45 158 H155" stroke="${G}" stroke-width="2.5" ${s}/>`,
      firefly: `<path d="M42 152 Q78 146 96 118 T120 80" stroke="${G}" stroke-width="2.5" stroke-dasharray="1 9" ${s}/><circle cx="120" cy="80" r="24" fill="${G}" opacity=".28"/><circle cx="120" cy="80" r="10" fill="${R}"/><circle cx="74" cy="112" r="15" fill="${G}" opacity=".28"/><circle cx="74" cy="112" r="5.5" fill="${R}"/><circle cx="140" cy="136" r="11" fill="${G}" opacity=".28"/><circle cx="140" cy="136" r="4" fill="${R}"/>`,
      boat: `<path d="M45 120 H155 L138 142 H62Z" fill="${I}"/><path d="M100 120 V55 L140 110 H100" fill="${R}" opacity=".9"/><path d="M35 158 Q60 148 85 158 T135 158 T175 158" stroke="${G}" stroke-width="2.5" ${s}/>`,
      tea: `<path d="M60 100 H140 Q138 150 100 150 Q62 150 60 100Z" fill="${R}"/><path d="M140 108 Q160 110 152 128 Q146 136 136 132" stroke="${R}" stroke-width="4" ${s}/><path d="M85 85 Q78 72 88 62 M110 85 Q103 72 113 60" stroke="${G}" stroke-width="2.5" ${s}/><path d="M55 160 H145" stroke="${I}" stroke-width="3" ${s}/>`,
      mirror: `<circle cx="100" cy="88" r="40" stroke="${I}" stroke-width="3.5" ${s}/><circle cx="100" cy="88" r="31" fill="${R}" opacity=".12"/><path d="M85 72 Q92 64 102 64" stroke="${R}" stroke-width="3" ${s}/><path d="M100 128 V162 M88 162 H112" stroke="${I}" stroke-width="3.5" ${s}/>`,
      goat: `<path d="M78 70 C55 60 50 92 70 98 M122 70 C145 60 150 92 130 98" stroke="${G}" stroke-width="5" ${s}/><path d="M76 78 Q100 64 124 78 L116 130 Q100 146 84 130Z" fill="${R}" opacity=".9"/><circle cx="90" cy="98" r="3.5" fill="#FBF7F0"/><circle cx="110" cy="98" r="3.5" fill="#FBF7F0"/><path d="M92 146 Q100 160 108 146" stroke="${I}" stroke-width="2.5" ${s}/>`
    };
    const ring = special
      ? `<circle cx="100" cy="100" r="92" stroke="${G}" stroke-width="3" fill="none"/><circle cx="100" cy="100" r="85" stroke="${G}" stroke-width="1" fill="none"/>`
      : `<circle cx="100" cy="100" r="90" stroke="${G}" stroke-width="1.5" fill="none" opacity=".8"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">${ring}${shapes[name] || ""}</svg>`;
  }
  function svgURL(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function cardImagePath(i) { return "images/card-" + pad2(i + 1) + ".png"; }

  // 网页上的卡面插画：先试图片，失败就用图标
  function setCardArt(el, i) {
    const c = CARDS[i];
    const img = new Image();
    img.alt = "";
    img.onload = () => { el.innerHTML = ""; el.appendChild(img); };
    img.onerror = () => { el.innerHTML = symbolSVG(c.symbol, c.special); };
    el.innerHTML = symbolSVG(c.symbol, c.special);
    img.src = cardImagePath(i);
  }

  /* ---------- 情景题 ---------- */
  function renderQuiz() {
    const q = QUESTIONS[quizStep];
    const t = T[lang];
    $("quizStep").textContent = t.step(quizStep + 1, QUESTIONS.length);
    [...$("quizDots").children].forEach((d, i) => d.classList.toggle("on", i <= quizStep));
    $("quizQ").textContent = q[lang];
    const box = $("quizOptions");
    box.innerHTML = "";
    q.options.forEach((o, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "quiz-opt" + (answers[q.key] === o.value ? " selected" : "");
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", answers[q.key] === o.value ? "true" : "false");
      const letter = document.createElement("b");
      letter.textContent = "ABCD"[i];
      const label = document.createElement("span");
      label.textContent = o[lang];
      b.append(letter, label);
      b.addEventListener("click", () => chooseAnswer(q.key, o.value, b));
      box.appendChild(b);
    });
  }
  let quizBusy = false;
  function chooseAnswer(key, value, btn) {
    if (quizBusy) return;
    quizBusy = true;
    answers[key] = value;
    document.querySelectorAll(".quiz-opt").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    setTimeout(() => {
      quizBusy = false;
      if (quizStep < QUESTIONS.length - 1) { quizStep++; renderQuiz(); }
      else finishQuiz();
    }, REDUCED ? 80 : 320);
  }
  function quizBack() {
    if (quizStep > 0) { quizStep--; renderQuiz(); }
    else show("screen-input");
  }
  function finishQuiz() {
    const p = store.profile;
    const persona = window.personaIndex(answers.style, answers.pace);
    const index = pickCard(p.nickname, p.month, p.day); // 先抽卡，再记进红线册
    store.today = {
      date: todayStr(),
      index: index,
      persona: persona,
      want: answers.want,
      status: p.status,
      nickname: p.nickname
    };
    save();
    addCollected(index);
    current = Object.assign({}, store.today);
    track("quiz_done", { persona: persona + 1 });
    show("screen-tie");
    setTimeout(goToResult, REDUCED ? 300 : 2000);
  }

  /* ---------- 表单 ---------- */
  function onSubmit(e) {
    e.preventDefault();
    const t = T[lang];
    const nickname = cleanName($("nickname").value);
    const month = $("bMonth").value, day = $("bDay").value;
    const statusEl = document.querySelector('input[name="status"]:checked');
    const err = $("formError");
    if (!nickname) { err.textContent = t.errName; $("nickname").focus(); return; }
    if (!month || !day) { err.textContent = t.errBday; return; }
    if (!statusEl) { err.textContent = t.errStatus; return; }
    err.textContent = "";
    store.profile = { nickname, month, day, status: statusEl.value };
    save();
    answers = {};
    quizStep = 0;
    show("screen-quiz");
    renderQuiz();
  }
  function prefill() {
    const p = store.profile;
    if (!p) return;
    $("nickname").value = p.nickname || "";
    $("bMonth").value = p.month || "";
    fillDays(p.day);
    const r = document.querySelector('input[name="status"][value="' + p.status + '"]');
    if (r) r.checked = true;
  }

  /* ---------- 结果页 ---------- */
  function goToResult() {
    show("screen-result");
    renderResult(true);
  }
  function setLines(el, lines) {
    el.textContent = "";
    lines.forEach((l, i) => { if (i) el.appendChild(document.createElement("br")); el.appendChild(document.createTextNode(l)); });
  }
  function renderResult(flip) {
    const t = T[lang];
    const other = lang === "zh" ? "en" : "zh";
    const c = CARDS[current.index];
    const p = PERSONAS[current.persona];

    // 1. 人格
    $("pArt").innerHTML = symbolSVG(personaIcon(current.persona));
    const label = $("pLabel");
    label.textContent = "";
    const small = document.createElement("small");
    small.textContent = t.youAre + " · No. " + pad2(current.persona + 1);
    label.append(small, document.createTextNode(t.personaName(p)));
    $("pDesc").textContent = p[lang].desc;
    $("pShine").textContent = p[lang].shine;
    $("pTip").textContent = p[lang].tip;
    $("pWant").textContent = (window.WANT_LINES[current.want] || {})[lang] || "";
    $("rStatus").textContent = (window.STATUS_LINES[current.status] || {})[lang] || "";

    // 2. 今日缘分卡
    const front = $("cardFront");
    $("cardNo").textContent = "No. " + pad2(current.index + 1) + " / " + CARDS.length;
    setCardArt($("cardArt"), current.index);
    $("cardName").textContent = c[lang].name;
    $("cardNameSub").textContent = c[other].name;
    const gold = !!c.special || isComplete(); // 集齐 12 张后，所有卡片都用金色卡面
    front.classList.toggle("special", gold);
    const oldTag = front.querySelector(".card-tag");
    if (oldTag) oldTag.remove();
    if (c.special || gold) front.insertAdjacentHTML("beforeend", '<div class="card-tag">' + (c.special ? t.special : t.goldFace) + "</div>");
    setLines($("rMessage"), lang === "zh" ? msgLines(c, "zh") : [msgPlain(c, "en")]);
    $("rMessageSub").textContent = msgPlain(c, other);
    renderStory(c);
    $("rQuestion").textContent = c[lang].question;
    $("rAction").textContent = c[lang].action;

    // 双人卡
    renderDuo();

    // 红线册入口 + 明天再来提示
    const n = getCollected().length;
    $("bookEntryResult").textContent = t.bookEntry(n, CARDS.length);
    $("collectTip").textContent = isComplete() ? t.bookDone : t.collectTip;

    if (flip) {
      const card = $("card");
      card.classList.remove("is-flipped");
      void card.offsetWidth;
      setTimeout(() => card.classList.add("is-flipped"), REDUCED ? 0 : 250);
    }
    startCountdown();
  }
  // “这张卡的故事”：默认显示前两行，点“展开”看全文
  let storyOpen = false;
  function renderStory(c) {
    const t = T[lang];
    $("storyText").textContent = c.story[lang];
    $("storySource").textContent = t.sourcePrefix + c.source[lang];
    $("storyText").classList.toggle("clamp", !storyOpen);
    $("storyToggle").textContent = storyOpen ? t.collapse : t.expand;
    $("storyToggle").setAttribute("aria-expanded", storyOpen ? "true" : "false");
  }
  function toggleStory() {
    storyOpen = !storyOpen;
    renderStory(CARDS[current.index]);
  }

  /* ---------- 红线册页面 ---------- */
  function renderBook() {
    const t = T[lang];
    const got = getCollected();
    const done = isComplete();
    $("bookTitle").textContent = t.bookTitle;
    $("bookMascot").src = "images/mascot/web/" + (done ? "cheer" : "hug") + ".webp";
    $("bookDesc").textContent = done ? t.bookDone : t.bookDesc(got.length, CARDS.length);
    const legend = $("legendBtn");
    legend.textContent = done ? t.legendOpen : t.legendLocked(got.length, CARDS.length);
    legend.disabled = !done;
    legend.classList.toggle("unlocked", done);
    const grid = $("bookGrid");
    grid.innerHTML = "";
    CARDS.forEach((c, i) => {
      const has = got.includes(i);
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "book-cell" + (has ? " has" : " empty") + (has && (done || c.special) ? " gold" : "");
      const no = document.createElement("span");
      no.className = "book-no";
      no.textContent = pad2(i + 1);
      if (has) {
        const art = document.createElement("span");
        art.className = "book-art";
        setCardArt(art, i);
        const name = document.createElement("span");
        name.className = "book-name";
        name.textContent = c[lang].name;
        cell.append(no, art, name);
        cell.setAttribute("aria-label", c[lang].name);
        cell.addEventListener("click", () => openBookCard(i));
      } else {
        const q = document.createElement("span");
        q.className = "book-q";
        q.textContent = "？";
        cell.append(no, q);
        cell.disabled = true;
        cell.setAttribute("aria-label", "No. " + pad2(i + 1) + " ?");
      }
      grid.appendChild(cell);
    });
  }
  function openBook() {
    renderBook();
    show("screen-book");
  }
  function closeBook() {
    if (current) { show("screen-result"); renderResult(false); }
    else { renderHome(); show("screen-home"); }
  }
  function openSheet(build) {
    const body = $("sheetBody");
    body.innerHTML = "";
    build(body);
    $("sheet").classList.remove("hidden");
  }
  function closeSheet() { $("sheet").classList.add("hidden"); }
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function openBookCard(i) {
    const c = CARDS[i], t = T[lang], other = lang === "zh" ? "en" : "zh";
    openSheet((b) => {
      const art = el("div", "sheet-art");
      setCardArt(art, i);
      b.append(
        el("p", "book-no-big", "No. " + pad2(i + 1) + " / " + CARDS.length),
        art,
        el("h3", "sheet-title", c[lang].name),
        el("p", "sheet-sub", c[other].name),
        (() => { const m = el("p", "sheet-message"); setLines(m, lang === "zh" ? msgLines(c, "zh") : [msgPlain(c, "en")]); return m; })(),
        el("span", "reading-label", t.storyTitle),
        el("p", "sheet-story", c.story[lang]),
        el("p", "story-source", t.sourcePrefix + c.source[lang])
      );
    });
  }
  function openLegend() {
    if (!isComplete()) return;
    const L = window.LEGEND, t = T[lang];
    openSheet((b) => {
      b.append(el("p", "book-no-big", "✦ 12 / 12 " + (lang === "zh" ? "已集齐" : "collected")), el("h3", "sheet-title", L.title[lang]));
      String(L[lang]).split(/\n\n+/).forEach((para) => b.append(el("p", "sheet-story", para)));
    });
  }

  function renderDuo() {
    const box = $("duo");
    const t = T[lang];
    const isDuo = !!(invite && current);
    // 单人用户：在“把红线牵给 TA”下面提示可以解锁双人报告
    document.querySelectorAll(".invite-unlock").forEach((n) => { n.textContent = t.inviteUnlock; n.classList.toggle("hidden", isDuo); });
    renderPlans(isDuo);
    if (!isDuo) { box.classList.add("hidden"); return; }
    const a = PERSONAS[invite.p], b = PERSONAS[current.persona];
    $("duoTitle").textContent = t.duoTitle(invite.from, current.nickname);
    $("duoArtA").innerHTML = symbolSVG(personaIcon(invite.p));
    $("duoArtB").innerHTML = symbolSVG(personaIcon(current.persona));
    $("duoNameA").textContent = invite.from;
    $("duoNameB").textContent = current.nickname;
    $("duoPA").textContent = a[lang].name;
    $("duoPB").textContent = b[lang].name;
    $("duoLine").textContent = (window.pairLine(a.style, b.style) || {})[lang] || "";
    box.classList.remove("hidden");
  }

  // 付费意愿测试：两个选项。双人用户放在双人卡里；单人用户放在“今日小行动”下面。
  // 单人用户的“单份报告”还不能买：显示“邀请 TA 完成测试后解锁”，按钮变成“先邀请 TA”。
  function renderPlans(isDuo) {
    const t = T[lang];
    const sec = $("plansSection");
    if (isDuo) $("duoPlansSlot").appendChild(sec);
    else $("soloPlansSlot").appendChild(sec);
    sec.classList.toggle("standalone", !isDuo);
    $("planReport").classList.toggle("locked", !isDuo);
    $("planReportLocked").classList.toggle("hidden", isDuo);
    $("planReportLocked").textContent = "🔒 " + t.reportLockedNote;
    $("planReportBtn").textContent = isDuo ? t.reportBtn : t.reportLockedBtn;
    $("freeVs").textContent = "";
    [[t.freeLabel, t.freeList, "fv-free"], [t.memberLabel, t.memberList, "fv-member"]].forEach(([label, list, cls]) => {
      const row = document.createElement("p");
      row.className = cls;
      const b = document.createElement("b");
      b.textContent = label;
      row.append(b, document.createTextNode(list));
      $("freeVs").appendChild(row);
    });
    // 双人合拍深度报告：目录 + 模糊的“锁住”内容
    const toc = $("reportToc");
    toc.innerHTML = "";
    t.reportItems.forEach((name, i) => {
      const li = document.createElement("li");
      const h = document.createElement("span");
      h.className = "report-item";
      h.textContent = (i + 1) + ". " + name;
      const blur = document.createElement("span");
      blur.className = "report-blur";
      blur.setAttribute("aria-hidden", "true");
      blur.textContent = t.reportBlur[i];
      const lock = document.createElement("span");
      lock.className = "report-lock";
      lock.setAttribute("aria-hidden", "true");
      lock.textContent = "🔒";
      li.append(h, blur, lock);
      toc.appendChild(li);
    });
    const perks = $("memberPerks");
    perks.innerHTML = "";
    t.planMemberPerks.forEach((txt) => {
      const li = document.createElement("li");
      li.textContent = txt;
      perks.appendChild(li);
    });
  }

  /* ---------- 倒计时到明天 00:00 ---------- */
  let cdTimer = null;
  function startCountdown() {
    clearInterval(cdTimer);
    const startDate = todayStr();
    const tick = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const s = Math.max(0, Math.floor((next - now) / 1000));
      $("countdown").textContent = pad2(Math.floor(s / 3600)) + ":" + pad2(Math.floor((s % 3600) / 60)) + ":" + pad2(s % 60);
      if (todayStr() !== startDate) { clearInterval(cdTimer); location.reload(); }
    };
    tick();
    cdTimer = setInterval(tick, 1000);
  }

  /* ---------- 画图工具 ---------- */
  const ZH = '"Noto Serif SC", serif', EN = '"Cormorant Garamond", "Noto Serif SC", serif';
  const INK = "#2B2522", SOFT = "#6E625A", RED = "#B8302A", GOLD = "#C9A66B", PAPER = "#F6F0E6";

  async function loadHead() {
    if (!headImg) headImg = await loadImage("images/mascot/web/head.webp").catch(() => null);
  }
  async function ensureFonts(sample) {
    await loadHead();
    try {
      await Promise.all([
        document.fonts.load('500 60px "Noto Serif SC"', sample),
        document.fonts.load('400 60px "Noto Serif SC"', sample),
        document.fonts.load('500 60px "Cormorant Garamond"', sample),
        document.fonts.load('italic 400 60px "Cormorant Garamond"', sample)
      ]);
    } catch (e) { /* 用系统字体也可以 */ }
  }
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  // 中文按字断行，英文按词断行
  function wrapText(ctx, text, maxWidth) {
    const tokens = text.match(/[　-鿿＀-￯]|[^\s　-鿿＀-￯]+|\s+/g) || [];
    const lines = [];
    let line = "";
    for (const tok of tokens) {
      const test = line + tok;
      if (ctx.measureText(test).width > maxWidth && line.trim()) {
        lines.push(line.trim());
        line = /^\s+$/.test(tok) ? "" : tok;
      } else line = test;
    }
    if (line.trim()) lines.push(line.trim());
    for (let i = 1; i < lines.length; i++) { // 标点不放行首
      if (/^[，。、；：！？）」』,.;:!?]/.test(lines[i])) { lines[i - 1] += lines[i][0]; lines[i] = lines[i].slice(1); }
    }
    return lines.filter(Boolean);
  }
  // 均衡断行：保持行数不变，把每行宽度尽量拉平，避免最后一行只剩一个词
  function balancedWrap(ctx, text, maxWidth) {
    let lines = wrapText(ctx, text, maxWidth);
    if (lines.length < 2) return lines;
    const n = lines.length;
    let lo = maxWidth * 0.4, hi = maxWidth;
    for (let k = 0; k < 14; k++) {
      const mid = (lo + hi) / 2;
      if (wrapText(ctx, text, mid).length <= n) hi = mid; else lo = mid;
    }
    lines = wrapText(ctx, text, hi);
    // 保险：如果最后一行还是只有一个英文单词，从上一行挪一个词下来
    const last = lines[lines.length - 1];
    if (lines.length >= 2 && /^[^\s\u3000-\u9fff]+$/.test(last)) {
      const prev = lines[lines.length - 2].split(" ");
      if (prev.length > 2) {
        const moved = prev.pop();
        const candidate = moved + " " + last;
        if (ctx.measureText(candidate).width <= maxWidth) {
          lines[lines.length - 2] = prev.join(" ");
          lines[lines.length - 1] = candidate;
        }
      }
    }
    return lines;
  }
  // 中文寄语：按 / 分行，单行太长时再自动断
  function zhLines(ctx, card, maxWidth) {
    return msgLines(card, "zh").flatMap((l) => (ctx.measureText(l).width > maxWidth ? balancedWrap(ctx, l, maxWidth) : [l]));
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function letterSpaced(ctx, text, x, y, spacing, align) {
    const chars = [...text];
    const widths = chars.map((ch) => ctx.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
    let cx = align === "left" ? x : x - total / 2;
    const old = ctx.textAlign;
    ctx.textAlign = "left";
    chars.forEach((ch, i) => { ctx.fillText(ch, cx, y); cx += widths[i] + spacing; });
    ctx.textAlign = old;
    return total;
  }
  function drawPaper(ctx, W, H, special) {
    if (special) { // 金色卡面：暖金色渐变底
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#FBF5E6"); g.addColorStop(1, "#EFDDB4");
      ctx.fillStyle = g;
    } else ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(43,37,34,0.035)";
    for (let y = 0; y < H; y += 9) for (let x = (y / 9) % 2 ? 4 : 0; x < W; x += 9) ctx.fillRect(x, y, 1.5, 1.5);
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = special ? 5 : 2.5;
    roundRect(ctx, 48, 48, W - 96, H - 96, 36); ctx.stroke();
    ctx.lineWidth = special ? 2.5 : 1.2;
    roundRect(ctx, 66, 66, W - 132, H - 132, 26); ctx.stroke();
  }
  // 红色方形印章：竖排“丁未”，下方“羊年 2027”
  function drawSeal(ctx, x, y, size) {
    ctx.fillStyle = RED;
    roundRect(ctx, x, y, size, size, 6); ctx.fill();
    ctx.strokeStyle = "rgba(251,247,240,.55)"; ctx.lineWidth = 1.5;
    roundRect(ctx, x + 6, y + 6, size - 12, size - 12, 3); ctx.stroke();
    ctx.fillStyle = "#FBF7F0";
    ctx.textAlign = "center";
    ctx.font = "600 " + Math.round(size * 0.36) + "px " + ZH;
    ctx.fillText("丁", x + size / 2, y + size * 0.45);
    ctx.fillText("未", x + size / 2, y + size * 0.85);
    ctx.fillStyle = SOFT;
    ctx.font = "400 22px " + ZH;
    ctx.fillText("羊年 2027", x + size / 2, y + size + 32);
  }
  function drawQR(ctx, text, x, y, size) {
    if (typeof window.qrcode !== "function") return;
    const qr = window.qrcode(0, "M");
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    ctx.fillStyle = "#FFFDF8";
    roundRect(ctx, x, y, size, size, 8); ctx.fill();
    const quiet = 2;
    const cell = size / (n + quiet * 2);
    ctx.fillStyle = INK;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) ctx.fillRect(x + (c + quiet) * cell, y + (r + quiet) * cell, cell + 0.4, cell + 0.4);
      }
    }
  }
  let headImg = null; // 小月老头像，画在结果卡左下角品牌字旁边
  function drawFooter(ctx, W, H, t) {
    const qrSize = 132;
    const textX = headImg ? 208 : 108;
    if (headImg) {
      const hw = 86, hh = Math.round(86 * headImg.height / headImg.width);
      ctx.drawImage(headImg, 108, H - 100 - hh, hw, hh);
    }
    drawQR(ctx, siteUrl(), W - 100 - qrSize, H - 100 - qrSize, qrSize);
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(110,98,90,.8)";
    ctx.font = (lang === "zh" ? "500 28px " + ZH : "500 32px " + EN);
    ctx.fillText(t.brand, textX, H - 132);
    // 小徽章：2027 爱情特别版
    ctx.font = (lang === "zh" ? "400 20px " + ZH : "500 22px " + EN);
    const bw = ctx.measureText(t.edition).width + 28;
    ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5;
    roundRect(ctx, textX, H - 116, bw, 34, 17); ctx.stroke();
    ctx.fillStyle = GOLD;
    ctx.fillText(t.edition, textX + 14, H - 92);
  }
  function knot(ctx, x, y) {
    ctx.beginPath();
    ctx.ellipse(x, y, 13, 9, -0.3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 6, y + 7); ctx.quadraticCurveTo(x - 14, y + 26, x - 4, y + 34);
    ctx.moveTo(x + 6, y + 7); ctx.quadraticCurveTo(x + 16, y + 22, x + 12, y + 32);
    ctx.stroke();
  }
  function toBlob(canvas) { return new Promise((resolve) => canvas.toBlob(resolve, "image/png")); }

  /* ---------- 结果卡图片 1080×1350 ---------- */
  async function makeCardImage() {
    const t = T[lang];
    const other = lang === "zh" ? "en" : "zh";
    const c = CARDS[current.index];
    const p = PERSONAS[current.persona];
    const W = 1080, H = 1350;
    const mainFont = lang === "zh" ? ZH : EN;
    await ensureFonts(c.zh.name + c.en.name + c.zh.message + c.en.message + p.zh.name + p.en.name + t.brand + t.edition + t.forName(current.nickname) + c.source.zh + c.source.en + t.sourcePrefix + t.goldFace + "丁未羊年致…");

    const canvas = $("shareCanvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    const goldFace = !!c.special || isComplete();
    drawPaper(ctx, W, H, goldFace);
    ctx.textBaseline = "alphabetic";

    // 右上印章
    drawSeal(ctx, W - 100 - 84, 92, 84);

    // 1. 全卡最醒目：你是 · XX型恋人（居中，避开右上印章）
    const labelMain = lang === "zh" ? "你是 · " + p.zh.name + "恋人" : "You are · " + p.en.name;
    const labelSub = lang === "zh" ? "You are · " + p.en.name : "你是 · " + p.zh.name + "恋人";
    let labelSize = lang === "zh" ? 66 : 66;
    ctx.font = "500 " + labelSize + "px " + mainFont;
    while (ctx.measureText(labelMain).width > 660 && labelSize > 36) {
      labelSize -= 2;
      ctx.font = "500 " + labelSize + "px " + mainFont;
    }
    ctx.textAlign = "center";
    ctx.fillStyle = INK;
    ctx.fillText(labelMain, W / 2, 170);
    ctx.fillStyle = GOLD;
    ctx.font = (lang === "zh" ? "italic 500 30px " + EN : "500 26px " + ZH);
    ctx.fillText(labelSub, W / 2, 216);

    // 2. 今日缘分卡名 + 编号（放在人格标签下面，字号比人格标签小）
    const parts = [
      { text: c[lang].name, font: lang === "zh" ? "500 40px " + ZH : "500 42px " + EN, color: INK, sp: lang === "zh" ? 6 : 0 },
      { text: c[other].name, font: lang === "zh" ? "italic 400 30px " + EN : "400 28px " + ZH, color: SOFT, sp: 0 },
      { text: "·  No. " + pad2(current.index + 1) + " / " + CARDS.length + (c.special ? "  ·  " + t.special : ""), font: "400 24px " + ZH, color: GOLD, sp: 0 }
    ];
    const gap = 18;
    parts.forEach((pt) => { ctx.font = pt.font; pt.w = ctx.measureText(pt.text).width + pt.sp * ([...pt.text].length - 1); });
    let px = (W - (parts.reduce((a, b) => a + b.w, 0) + gap * (parts.length - 1))) / 2;
    ctx.textAlign = "left";
    parts.forEach((pt) => {
      ctx.font = pt.font; ctx.fillStyle = pt.color;
      if (pt.sp) letterSpaced(ctx, pt.text, px, 282, pt.sp, "left"); else ctx.fillText(pt.text, px, 282);
      px += pt.w + gap;
    });

    // 先量好下方文字的高度，再决定插画大小
    const maxW = 820;
    ctx.font = (lang === "zh" ? "500 46px " + ZH : "500 50px " + EN);
    const mainLines = lang === "zh" ? zhLines(ctx, c, maxW) : balancedWrap(ctx, msgPlain(c, "en"), maxW);
    const mainLH = lang === "zh" ? 66 : 60;
    ctx.font = (lang === "zh" ? "italic 400 30px " + EN : "400 26px " + ZH);
    const subLines = balancedWrap(ctx, msgPlain(c, other), maxW);
    const subLH = 40;

    const NAME_BASE_MAX = 1100;         // “致 xxx” 的基线不能低于这里（下面是二维码）
    const below = 34 + mainLines.length * mainLH + 4 + subLines.length * subLH + 30 + 58;
    // 出处小字（卡名下面一行）
    ctx.textAlign = "center";
    ctx.fillStyle = SOFT;
    ctx.font = (lang === "zh" ? "400 22px " + ZH : "italic 400 26px " + EN);
    let src = t.sourcePrefix + c.source[lang];
    while (ctx.measureText(src).width > 700 && src.length > 4) src = src.slice(0, -2) + "…";
    ctx.fillText(src + (goldFace && !c.special ? "  ·  " + t.goldFace : ""), W / 2, 320);

    const artTop = 344;
    const art = Math.max(360, Math.min(640, NAME_BASE_MAX - artTop - below));
    const artX = (W - art) / 2;

    // 3. 插画（图片优先，没有就用图标）
    let artImg = await loadImage(cardImagePath(current.index)).catch(() => null);
    if (artImg) {
      ctx.save();
      roundRect(ctx, artX, artTop, art, art, 18); ctx.clip();
      ctx.drawImage(artImg, artX, artTop, art, art);
      ctx.restore();
      ctx.strokeStyle = "rgba(201,166,107,.6)"; ctx.lineWidth = 1.5;
      roundRect(ctx, artX, artTop, art, art, 18); ctx.stroke();
    } else {
      artImg = await loadImage(svgURL(symbolSVG(c.symbol, c.special))).catch(() => null);
      if (artImg) { const s = art * 0.82; ctx.drawImage(artImg, (W - s) / 2, artTop + (art - s) / 2, s, s); }
    }

    let y = artTop + art + 34;
    const threadUnderArt = artTop + art + 18;
    ctx.textAlign = "center";

    // 7. 寄语 + 另一语言小字
    ctx.fillStyle = INK;
    ctx.font = (lang === "zh" ? "500 46px " + ZH : "500 50px " + EN);
    mainLines.forEach((l, i) => ctx.fillText(l, W / 2, y + 46 + i * mainLH));
    y += mainLines.length * mainLH + 4;
    ctx.fillStyle = SOFT;
    ctx.font = (lang === "zh" ? "italic 400 30px " + EN : "400 26px " + ZH);
    subLines.forEach((l, i) => ctx.fillText(l, W / 2, y + 30 + i * subLH));
    y += subLines.length * subLH + 30;

    // 8. 致 名字（朱砂红，第二醒目）
    const nameText = t.forName(current.nickname);
    ctx.fillStyle = RED;
    ctx.font = (lang === "zh" ? "500 52px " + ZH : "italic 500 60px " + EN);
    const nameBase = Math.min(y + 50, NAME_BASE_MAX);
    ctx.fillText(nameText, W / 2, nameBase);
    const nameRight = W / 2 + ctx.measureText(nameText).width / 2;

    // 4. 红线：从左边缘出发 → 绕过插画下方 → 沿右侧弯下来 → 在名字旁打结
    const knotX = Math.min(nameRight + 34, W - 120), knotY = nameBase - 18;
    const rightX = W - 92;
    ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(48, artTop + art * 0.32);
    ctx.bezierCurveTo(150, artTop + art * 0.55, 150, threadUnderArt, W / 2 - 120, threadUnderArt);
    ctx.bezierCurveTo(W / 2 + 200, threadUnderArt, rightX, threadUnderArt - 20, rightX, threadUnderArt + 120);
    ctx.lineTo(rightX, knotY - 110);
    ctx.bezierCurveTo(rightX, knotY - 30, knotX + 70, knotY, knotX + 12, knotY);
    ctx.stroke();
    knot(ctx, knotX, knotY);

    // 9. 底部：品牌 + 二维码
    drawFooter(ctx, W, H, t);
    return toBlob(canvas);
  }

  /* ---------- 双人卡图片 1080×1350 ---------- */
  async function makeDuoImage() {
    const t = T[lang];
    const other = lang === "zh" ? "en" : "zh";
    const a = PERSONAS[invite.p], b = PERSONAS[current.persona];
    const line = window.pairLine(a.style, b.style) || { zh: "", en: "" };
    const W = 1080, H = 1350;
    const title = t.duoTitle(invite.from, current.nickname);
    await ensureFonts(title + a.zh.name + b.zh.name + a.en.name + b.en.name + line.zh + line.en + t.brand + t.edition + t.duoHeader + t.duoNote + "丁未羊年恋人");

    const canvas = $("shareCanvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    drawPaper(ctx, W, H, false);
    drawSeal(ctx, W - 100 - 84, 92, 84);

    ctx.textAlign = "left"; ctx.fillStyle = GOLD;
    ctx.font = (lang === "zh" ? "400 28px " + ZH : "500 32px " + EN);
    letterSpaced(ctx, t.duoHeader, 108, 136, lang === "zh" ? 4 : 1, "left");

    // 标题
    ctx.textAlign = "center"; ctx.fillStyle = RED;
    ctx.font = (lang === "zh" ? "500 58px " + ZH : "500 64px " + EN);
    const tl = wrapText(ctx, title, 820);
    tl.forEach((l, i) => ctx.fillText(l, W / 2, 300 + i * 74));
    let y = 300 + (tl.length - 1) * 74 + 70;

    // 两个人格
    const icon = 230, cxA = W / 2 - 230, cxB = W / 2 + 230;
    const [ia, ib] = await Promise.all([
      loadImage(svgURL(symbolSVG(personaIcon(invite.p)))).catch(() => null),
      loadImage(svgURL(symbolSVG(personaIcon(current.persona)))).catch(() => null)
    ]);
    if (ia) ctx.drawImage(ia, cxA - icon / 2, y, icon, icon);
    if (ib) ctx.drawImage(ib, cxB - icon / 2, y, icon, icon);
    // 红线连接两人，中间打结
    const ty = y + icon / 2;
    ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cxA + icon / 2 + 6, ty);
    ctx.bezierCurveTo(W / 2 - 60, ty - 40, W / 2 - 40, ty + 30, W / 2 - 12, ty);
    ctx.moveTo(W / 2 + 12, ty);
    ctx.bezierCurveTo(W / 2 + 40, ty - 30, W / 2 + 60, ty + 40, cxB - icon / 2 - 6, ty);
    ctx.stroke();
    knot(ctx, W / 2, ty);
    y += icon + 60;

    [[cxA, invite.from, a], [cxB, current.nickname, b]].forEach(([cx, name, p]) => {
      ctx.fillStyle = INK;
      ctx.font = (lang === "zh" ? "500 40px " + ZH : "500 44px " + EN);
      ctx.fillText(name, cx, y);
      ctx.fillStyle = GOLD;
      ctx.font = (lang === "zh" ? "500 32px " + ZH : "500 34px " + EN);
      ctx.fillText(lang === "zh" ? p.zh.name + "恋人" : p.en.name, cx, y + 50);
      ctx.fillStyle = SOFT;
      ctx.font = (lang === "zh" ? "italic 400 28px " + EN : "400 24px " + ZH);
      ctx.fillText(lang === "zh" ? p.en.name : p.zh.name + "恋人", cx, y + 90);
    });
    y += 180;

    // 组合寄语
    ctx.fillStyle = INK;
    ctx.font = (lang === "zh" ? "500 50px " + ZH : "500 54px " + EN);
    const ml = balancedWrap(ctx, line[lang], 840);
    ml.forEach((l, i) => ctx.fillText(l, W / 2, y + i * 70));
    y += (ml.length - 1) * 70 + 54;
    ctx.fillStyle = SOFT;
    ctx.font = (lang === "zh" ? "italic 400 32px " + EN : "400 28px " + ZH);
    balancedWrap(ctx, line[other], 840).forEach((l, i) => ctx.fillText(l, W / 2, y + i * 42));

    // 声明
    ctx.fillStyle = "rgba(110,98,90,.85)";
    ctx.font = (lang === "zh" ? "400 24px " + ZH : "italic 400 28px " + EN);
    balancedWrap(ctx, t.duoNote, 600).forEach((l, i) => ctx.fillText(l, W / 2 - 60, H - 250 + i * 34));

    drawFooter(ctx, W, H, t);
    return toBlob(canvas);
  }

  /* ---------- 保存 / 下载 ---------- */
  async function saveImage(btn, maker, labelKey, eventName) {
    const t = T[lang];
    btn.disabled = true; btn.textContent = t.saving;
    try {
      const blob = await maker();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "red-thread-card.png";
      document.body.appendChild(a); a.click(); a.remove();
      showPreview(url);
      track(eventName);
    } catch (e) {
      console.error(e);
    } finally {
      btn.disabled = false; btn.textContent = T[lang][labelKey];
    }
  }
  // 预览层：微信等内置浏览器不能直接下载时，可长按图片保存
  function showPreview(url) {
    const t = T[lang];
    const old = document.querySelector(".preview");
    if (old) old.remove();
    const wrap = document.createElement("div");
    wrap.className = "preview";
    wrap.innerHTML =
      '<div class="preview-box"><img alt="" src="' + url + '"/>' +
      '<p class="small-note">' + t.longPress + "</p>" +
      '<a class="btn btn-primary" download="red-thread-card.png" href="' + url + '">' + t.download + "</a>" +
      '<button type="button" class="btn-link">' + t.close + "</button></div>";
    wrap.addEventListener("click", (e) => { if (e.target === wrap || e.target.tagName === "BUTTON") wrap.remove(); });
    document.body.appendChild(wrap);
  }

  /* ---------- 把红线牵给 TA ---------- */
  async function onSend() {
    const t = T[lang];
    const url = inviteLink();
    track("send_thread");
    if (navigator.share) {
      try {
        await navigator.share({ title: t.shareTitle, text: t.shareText(current.nickname), url });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return; // 用户自己取消
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast(t.copied);
    } catch (e) {
      window.prompt(t.copyFail, url);
    }
  }

  /* ---------- 付费意愿测试弹窗 ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let payContext = "";
  let payPlan = "duo-report"; // "duo-report" 或 "membership"
  const PLANS = ["duo-report", "membership"];
  function renderPayModal() {
    const t = T[lang];
    const member = payPlan === "membership";
    $("payModalTitle").textContent = member ? t.memberModalTitle : t.payModalTitle;
    $("payModalDesc").textContent = member ? "" : t.payModalDesc;
    $("payModalDesc").classList.toggle("hidden", member);
    $("payChosen").textContent = t.planChosen + (member
      ? t.planMemberName + " · " + t.planMemberPrice
      : t.planReportName + " · " + t.planReportPrice);
    $("payNoCharge").textContent = t.noCharge;
  }
  function openPay(plan) {
    payPlan = PLANS.includes(plan) ? plan : "duo-report";
    track("pay_click", { product: payPlan });
    // 记下是哪一对人格（例如 05x12），提交邮箱时一起发给 Formspree，方便以后分析
    payContext = invite && current ? pad2(invite.p + 1) + "x" + pad2(current.persona + 1) : "";
    renderPayModal();
    $("payError").textContent = "";
    $("payModal").classList.remove("hidden");
    setTimeout(() => $("payEmail").focus(), 50);
  }
  function closePay() { $("payModal").classList.add("hidden"); }
  async function postEmail(endpoint, data) {
    const fd = new FormData();
    Object.keys(data).forEach((k) => fd.append(k, data[k]));
    const res = await fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
    if (!res.ok && res.type !== "opaque") throw new Error("HTTP " + res.status);
  }
  async function onPaySubmit(e) {
    e.preventDefault();
    const t = T[lang];
    const email = $("payEmail").value.trim();
    const err = $("payError");
    if (!EMAIL_RE.test(email)) { err.textContent = t.errEmail; $("payEmail").focus(); return; }
    if (!$("payAgree").checked) { err.textContent = t.errAgree; return; }
    err.textContent = "";
    try {
      if (!window.FORM_URL) { err.textContent = t.notReady; return; } // 没设置地址：不假装成功
      await postEmail(window.FORM_URL, { email, lang, source: "pay-test", plan: payPlan, mode: invite ? "duo" : "solo", pair: payContext });
      track("pay_email_submit", { plan: payPlan });
      closePay();
      $("payEmail").value = ""; $("payAgree").checked = false;
      toast(payPlan === "membership" ? t.memberThanks : t.payThanks);
    } catch (ex) {
      err.textContent = t.wlError;
    }
  }

  /* ---------- Inner Lab 候补名单 ---------- */
  async function onWaitlist(e) {
    e.preventDefault();
    const t = T[lang];
    const msg = $("wlMsg");
    const email = $("wlEmail").value.trim();
    if (!EMAIL_RE.test(email)) { msg.textContent = t.errEmail; return; }
    try {
      if (!window.WAITLIST_URL) { msg.textContent = t.notReady; return; } // 没设置地址：不假装成功
      await postEmail(window.WAITLIST_URL, { email, lang, source: "inner-lab" });
      msg.textContent = t.wlThanks;
      $("wlEmail").value = "";
      track("waitlist");
    } catch (err) {
      msg.textContent = t.wlError;
    }
  }

  /* ---------- 启动 ---------- */
  function init() {
    // 旧版本用户：把今天已经抽到的卡补记进红线册
    if (store.today && CARDS[store.today.index] && !getCollected().includes(store.today.index)) addCollected(store.today.index);
    loadAnalytics();
    applyLang();
    prefill();
    if (invite) track("invite_open", { p: invite.p + 1 });

    $("langToggle").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; applyLang(); });
    $("btnStart").addEventListener("click", () => {
      if (hasToday()) { current = Object.assign({}, store.today); goToResult(); return; }
      track("start");
      show("screen-input");
    });
    $("bMonth").addEventListener("change", () => fillDays($("bDay").value));
    $("inputForm").addEventListener("submit", onSubmit);
    $("quizBack").addEventListener("click", quizBack);
    $("btnSave").addEventListener("click", () => saveImage($("btnSave"), makeCardImage, "save", "save_card"));
    $("btnSaveDuo").addEventListener("click", () => saveImage($("btnSaveDuo"), makeDuoImage, "saveDuo", "save_duo"));
    $("btnSend").addEventListener("click", onSend);
    $("storyToggle").addEventListener("click", toggleStory);
    $("bookEntryHome").addEventListener("click", openBook);
    $("bookEntryResult").addEventListener("click", openBook);
    $("bookBack").addEventListener("click", closeBook);
    $("legendBtn").addEventListener("click", openLegend);
    $("sheetClose").addEventListener("click", closeSheet);
    $("sheet").addEventListener("click", (e) => { if (e.target === $("sheet")) closeSheet(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });
    $("btnSave2").addEventListener("click", () => saveImage($("btnSave2"), makeCardImage, "save", "save_card"));
    $("btnSend2").addEventListener("click", onSend);
    // 点整张选项卡（或卡里的按钮）都会打开弹窗
    $("planReport").addEventListener("click", () => {
      if (invite && current) { openPay("duo-report"); return; }
      // 单人用户还不能买双人报告：记录“对报告感兴趣”，然后直接打开邀请
      track("pay_click", { product: "duo-report-solo" });
      onSend();
    });
    $("planMember").addEventListener("click", () => openPay("membership"));
    $("payClose").addEventListener("click", closePay);
    $("payModal").addEventListener("click", (e) => { if (e.target === $("payModal")) closePay(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePay(); });
    $("payForm").addEventListener("submit", onPaySubmit);
    $("waitlistForm").addEventListener("submit", onWaitlist);
  }

  init();
})();
