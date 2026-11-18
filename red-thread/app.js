/* =========================================================
   红线 · 缘分卡 — 主程序
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 以后要填的设置 · Settings to fill in later ---------- */
  // 候补名单表单地址（例如 Formspree：https://formspree.io/f/xxxx）。留空 = 暂不提交。
  const WAITLIST_URL = "";
  // 结果卡图片底部显示的网址
  const SITE_URL = "redthread.example";

  /* ---------- 界面文字 · UI text ---------- */
  const T = {
    zh: {
      eyebrow: "月老 · 姻缘",
      title: "红线 · 缘分卡",
      subtitle: "月老的一根红线，今天为你牵出一句话。",
      start: "系上红线",
      seeToday: "查看今天的卡片",
      limited: "羊年限定 · 2027",
      formTitle: "留下你的名字",
      nickname: "昵称（最多 12 字）",
      birthday: "生日",
      month: "月", day: "日",
      status: "你现在的状态",
      st_single: "单身", st_maybe: "暧昧中", st_inlove: "恋爱中", st_healing: "刚结束一段关系",
      draw: "牵线",
      privacy: "信息只保存在你的手机上，不会上传。",
      errName: "请填写昵称", errBday: "请选择生日", errStatus: "请选择你现在的状态",
      tying: "红线正在系上……",
      question: "反思问题",
      action: "今日小行动",
      sizePost: "帖子 4:5", sizeStory: "Story 9:16",
      save: "保存结果卡",
      saving: "正在生成……",
      oneADay: "明天再来抽 · 每人每天一张",
      restart: "重新填写",
      wlTitle: "加入 Inner Lab 候补名单",
      wlDesc: "更多关于爱与自我的小实验，即将开放。",
      wlPlaceholder: "你的邮箱",
      wlJoin: "加入",
      wlThanks: "谢谢！我们会第一时间通知你。",
      wlSoon: "候补名单即将开放，谢谢你的关注！",
      wlError: "提交失败，请稍后再试。",
      disclaimer: "本内容仅供娱乐与自我反思，不构成任何建议。",
      special: "羊年限定",
      forName: (n) => "赠 · " + n,
      brand: "红线 · 缘分卡 2027",
      longPress: "长按图片保存，或点击下方按钮下载",
      download: "下载图片",
      close: "关闭"
    },
    en: {
      eyebrow: "THE OLD MAN UNDER THE MOON",
      title: "Red Thread · Love Card",
      subtitle: "One red thread, one message for your heart today.",
      start: "Tie the Thread",
      seeToday: "See today's card",
      limited: "Year of the Goat · 2027",
      formTitle: "Tell the thread who you are",
      nickname: "Nickname (up to 12 characters)",
      birthday: "Birthday",
      month: "Month", day: "Day",
      status: "Where are you right now?",
      st_single: "Single", st_maybe: "Something's starting", st_inlove: "In a relationship", st_healing: "Healing from one",
      draw: "Draw My Card",
      privacy: "Your info stays on your device.",
      errName: "Please enter a nickname", errBday: "Please choose your birthday", errStatus: "Please choose where you are right now",
      tying: "Tying the thread…",
      question: "Reflect",
      action: "Today's small step",
      sizePost: "Post 4:5", sizeStory: "Story 9:16",
      save: "Save my card",
      saving: "Creating…",
      oneADay: "One card a day · come back tomorrow",
      restart: "Start over",
      wlTitle: "Join the Inner Lab waitlist",
      wlDesc: "More small experiments in love and self, coming soon.",
      wlPlaceholder: "Your email",
      wlJoin: "Join",
      wlThanks: "Thank you! We'll let you know first.",
      wlSoon: "The waitlist opens soon. Thank you for your interest!",
      wlError: "Something went wrong. Please try again later.",
      disclaimer: "For entertainment and self-reflection only.",
      special: "Year of the Goat",
      forName: (n) => "For " + n,
      brand: "Red Thread · Love Card 2027",
      longPress: "Press and hold the image to save, or tap below to download",
      download: "Download",
      close: "Close"
    }
  };

  const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 本地存储（失败也没关系） ---------- */
  const KEY = "redthread.v1";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }
  let store = load();

  /* ---------- 统计占位：以后接入分析工具时在这里发送事件 ---------- */
  function track(name) {
    // 例如：window.someAnalytics && someAnalytics.track(name);
    // events: "start", "complete", "download", "waitlist"
  }

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);
  let lang = store.lang || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en");
  let current = null; // { index, status, nickname }

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  // FNV-1a 哈希：同样的输入永远得到同样的数字
  function hash(str) {
    let h = 0x811c9dc5;
    for (const ch of str) {
      h ^= ch.codePointAt(0);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }
  function pickCard(nickname, month, day) {
    const key = nickname.trim().toLowerCase() + "|" + month + "-" + day + "|" + todayStr();
    return hash(key) % window.CARDS.length;
  }

  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("is-active"));
    $(id).classList.add("is-active");
    window.scrollTo(0, 0);
  }

  /* ---------- 语言 ---------- */
  function applyLang() {
    const t = T[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t[el.dataset.i18n];
      if (typeof v === "string") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t[el.dataset.i18nPlaceholder];
    });
    fillBirthday();
    if (current) renderResult(false);
    store.lang = lang; save(store);
  }

  /* ---------- 生日下拉 ---------- */
  function fillBirthday() {
    const t = T[lang];
    const m = $("bMonth"), d = $("bDay");
    const mv = m.value, dv = d.value;
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

  /* ---------- 卡面插画（简洁线条图形） ---------- */
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
      mountain: `<path d="M30 145 L80 75 L110 115 L130 90 L170 145Z" fill="none" stroke="${I}" stroke-width="3" ${s}/><circle cx="140" cy="62" r="12" fill="${R}"/><path d="M45 158 H155" stroke="${G}" stroke-width="2.5" ${s}/>`,
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

  /* ---------- 显示结果 ---------- */
  function renderResult(flip) {
    const c = window.CARDS[current.index];
    const t = T[lang];
    const txt = c[lang];
    const other = c[lang === "zh" ? "en" : "zh"];
    const front = $("cardFront");

    $("cardNo").textContent = "No. " + String(current.index + 1).padStart(2, "0") + " / " + window.CARDS.length;
    $("cardArt").innerHTML = symbolSVG(c.symbol, c.special);
    $("cardName").textContent = txt.name;
    $("cardNameSub").textContent = other.name;
    front.classList.toggle("special", !!c.special);
    const oldTag = front.querySelector(".card-tag");
    if (oldTag) oldTag.remove();
    if (c.special) front.insertAdjacentHTML("beforeend", '<div class="card-tag">' + t.special + "</div>");

    $("rMessage").textContent = txt.message;
    $("rStatus").textContent = (window.STATUS_LINES[current.status] || {})[lang] || "";
    $("rQuestion").textContent = txt.question;
    $("rAction").textContent = txt.action;

    if (flip) {
      const card = $("card");
      card.classList.remove("is-flipped");
      void card.offsetWidth;
      setTimeout(() => card.classList.add("is-flipped"), REDUCED ? 0 : 250);
    }
  }

  function goToResult() {
    show("screen-result");
    renderResult(true);
  }

  /* ---------- 表单 ---------- */
  function onSubmit(e) {
    e.preventDefault();
    const t = T[lang];
    const nickname = $("nickname").value.trim().slice(0, 12);
    const month = $("bMonth").value, day = $("bDay").value;
    const statusEl = document.querySelector('input[name="status"]:checked');
    const err = $("formError");
    if (!nickname) { err.textContent = t.errName; $("nickname").focus(); return; }
    if (!month || !day) { err.textContent = t.errBday; return; }
    if (!statusEl) { err.textContent = t.errStatus; return; }
    err.textContent = "";

    const index = pickCard(nickname, month, day);
    current = { index, status: statusEl.value, nickname };
    store.profile = { nickname, month, day, status: statusEl.value };
    store.today = { date: todayStr(), index, status: statusEl.value, nickname };
    save(store);
    track("complete");

    show("screen-tie");
    setTimeout(goToResult, REDUCED ? 300 : 2000);
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

  /* ---------- 生成分享图片 ---------- */
  function wrapText(ctx, text, maxWidth) {
    // 中文按字断行，英文按词断行
    const tokens = text.match(/[　-鿿＀-￯]|[^\s　-鿿＀-￯]+|\s+/g) || [];
    const lines = [];
    let line = "";
    for (const tok of tokens) {
      const test = line + tok;
      if (ctx.measureText(test).width > maxWidth && line.trim()) {
        lines.push(line.trim());
        line = /^\s+$/.test(tok) ? "" : tok;
      } else {
        line = test;
      }
    }
    if (line.trim()) lines.push(line.trim());
    // 避免标点出现在行首
    for (let i = 1; i < lines.length; i++) {
      if (/^[，。、；：！？）」』,.;:!?]/.test(lines[i])) {
        lines[i - 1] += lines[i][0];
        lines[i] = lines[i].slice(1);
      }
    }
    return lines.filter(Boolean);
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function makeImage(size) {
    const c = window.CARDS[current.index];
    const t = T[lang];
    const txt = c[lang];
    const other = c[lang === "zh" ? "en" : "zh"];
    const W = 1080, H = size === "story" ? 1920 : 1350;
    const ZH = '"Noto Serif SC", serif', EN = '"Cormorant Garamond", "Noto Serif SC", serif';
    const mainFont = lang === "zh" ? ZH : EN;

    // 确保字体已加载
    try {
      const sample = txt.name + other.name + txt.message + t.brand + t.forName(current.nickname);
      await Promise.all([
        document.fonts.load('500 60px "Noto Serif SC"', sample),
        document.fonts.load('400 60px "Noto Serif SC"', sample),
        document.fonts.load('500 60px "Cormorant Garamond"', sample),
        document.fonts.load('italic 400 60px "Cormorant Garamond"', sample)
      ]);
    } catch (e) { /* 用系统字体也可以 */ }

    const canvas = $("shareCanvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");

    // 背景 + 纸纹
    ctx.fillStyle = "#F6F0E6";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(43,37,34,0.035)";
    for (let y = 0; y < H; y += 9) for (let x = (y / 9) % 2 ? 4 : 0; x < W; x += 9) ctx.fillRect(x, y, 1.5, 1.5);

    // 金边
    const gold = "#C9A66B";
    ctx.strokeStyle = gold;
    ctx.lineWidth = c.special ? 5 : 2.5;
    roundRect(ctx, 48, 48, W - 96, H - 96, 36); ctx.stroke();
    ctx.lineWidth = c.special ? 2.5 : 1.2;
    roundRect(ctx, 66, 66, W - 132, H - 132, 26); ctx.stroke();

    // 排版：先算总高度，再上下居中
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    const maxW = W - 260;
    const msgSize = lang === "zh" ? 54 : 64;
    const msgLH = lang === "zh" ? 92 : 80;
    ctx.font = (lang === "zh" ? "500 " : "500 ") + msgSize + "px " + mainFont;
    const msgLines = wrapText(ctx, txt.message, maxW);
    let artSize = size === "story" ? 420 : 340;

    const blocks = [
      { h: 40, draw: (y) => { ctx.font = "400 30px " + ZH; ctx.fillStyle = gold; letterSpaced(ctx, "No. " + String(current.index + 1).padStart(2, "0") + " / " + window.CARDS.length, W / 2, y + 32, 8); } },
      { h: 30 },
      { h: artSize, art: true },
      { h: 40 },
      { h: 100, draw: (y) => {
          ctx.fillStyle = "#2B2522";
          if (lang === "zh") { ctx.font = "500 88px " + ZH; letterSpaced(ctx, txt.name, W / 2, y + 86, 18); }
          else { ctx.font = "500 84px " + EN; ctx.fillText(txt.name, W / 2, y + 80); }
        } },
      { h: 56, draw: (y) => { ctx.fillStyle = "#6E625A"; ctx.font = lang === "zh" ? "italic 400 44px " + EN : "400 38px " + ZH; ctx.fillText(other.name + (c.special ? "  ·  " + t.special : ""), W / 2, y + 44); } },
      { h: 50 },
      { h: 40, draw: (y) => drawThread(ctx, W / 2, y + 20) },
      { h: 50 },
      { h: msgLines.length * msgLH, draw: (y) => {
          ctx.fillStyle = "#2B2522";
          ctx.font = "500 " + msgSize + "px " + mainFont;
          msgLines.forEach((l, i) => ctx.fillText(l, W / 2, y + msgSize + i * msgLH));
        } },
      { h: 60 },
      { h: 50, draw: (y) => { ctx.fillStyle = "#B8302A"; ctx.font = (lang === "zh" ? "400 40px " : "italic 400 46px ") + mainFont; ctx.fillText(t.forName(current.nickname), W / 2, y + 42); } }
    ];
    // 内容区：顶部 110 到底部品牌文字上方，放不下就缩小插画
    const top = 110, bottom = H - 230;
    let total = blocks.reduce((a, b) => a + b.h, 0);
    if (total > bottom - top) {
      const artBlock = blocks.find((b) => b.art);
      const shrink = Math.min(artSize - 180, total - (bottom - top));
      artSize -= shrink; artBlock.h = artSize; total -= shrink;
    }
    let y = Math.max(top, top + (bottom - top - total) / 2);

    const artImg = await loadImage("data:image/svg+xml;charset=utf-8," + encodeURIComponent(symbolSVG(c.symbol, c.special))).catch(() => null);
    for (const b of blocks) {
      if (b.art && artImg) ctx.drawImage(artImg, (W - artSize) / 2, y, artSize, artSize);
      if (b.draw) b.draw(y);
      y += b.h;
    }

    // 底部：品牌 + 网址
    ctx.fillStyle = "#2B2522";
    ctx.font = (lang === "zh" ? "500 38px " : "500 42px ") + mainFont;
    ctx.fillText(t.brand, W / 2, H - 150);
    ctx.fillStyle = "#6E625A";
    ctx.font = "400 32px " + EN;
    ctx.fillText(SITE_URL, W / 2, H - 104);

    return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
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
  function letterSpaced(ctx, text, cx, y, spacing) {
    const chars = [...text];
    const widths = chars.map((ch) => ctx.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
    let x = cx - total / 2;
    const align = ctx.textAlign;
    ctx.textAlign = "left";
    chars.forEach((ch, i) => { ctx.fillText(ch, x, y); x += widths[i] + spacing; });
    ctx.textAlign = align;
  }
  function drawThread(ctx, cx, cy) {
    ctx.strokeStyle = "#B8302A"; ctx.lineWidth = 4; ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx - 220, cy);
    ctx.bezierCurveTo(cx - 140, cy - 26, cx - 70, cy + 26, cx - 16, cy);
    ctx.moveTo(cx + 16, cy);
    ctx.bezierCurveTo(cx + 70, cy - 26, cx + 140, cy + 26, cx + 220, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy, 16, 11, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  async function onSave() {
    const btn = $("btnSave");
    const t = T[lang];
    btn.disabled = true; btn.textContent = t.saving;
    try {
      const size = document.querySelector('input[name="size"]:checked').value;
      const blob = await makeImage(size);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "red-thread-card.png";
      document.body.appendChild(a); a.click(); a.remove();
      showPreview(url);
      track("download");
    } catch (e) {
      console.error(e);
    } finally {
      btn.disabled = false; btn.textContent = t.save;
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

  /* ---------- 候补名单 ---------- */
  async function onWaitlist(e) {
    e.preventDefault();
    const t = T[lang];
    const msg = $("wlMsg");
    const email = $("wlEmail").value.trim();
    if (!$("wlEmail").checkValidity() || !email) { $("wlEmail").reportValidity(); return; }
    if (!WAITLIST_URL) { msg.textContent = t.wlSoon; return; }
    try {
      const fd = new FormData();
      fd.append("email", email);
      fd.append("lang", lang);
      await fetch(WAITLIST_URL, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      msg.textContent = t.wlThanks;
      $("wlEmail").value = "";
      track("waitlist");
    } catch (err) {
      msg.textContent = t.wlError;
    }
  }

  /* ---------- 启动 ---------- */
  function init() {
    applyLang();
    prefill();

    const today = store.today;
    if (today && today.date === todayStr() && typeof today.index === "number" && window.CARDS[today.index]) {
      $("btnSeeToday").classList.remove("hidden");
    }

    $("langToggle").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; applyLang(); });
    $("btnStart").addEventListener("click", () => { track("start"); show("screen-input"); });
    $("btnSeeToday").addEventListener("click", () => {
      current = { index: store.today.index, status: store.today.status, nickname: store.today.nickname };
      goToResult();
    });
    $("bMonth").addEventListener("change", () => fillDays($("bDay").value));
    $("inputForm").addEventListener("submit", onSubmit);
    $("btnSave").addEventListener("click", onSave);
    $("btnRestart").addEventListener("click", () => show("screen-input"));
    $("waitlistForm").addEventListener("submit", onWaitlist);
  }

  init();
})();
