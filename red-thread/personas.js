/* =========================================================
   红线人格 · Personas —— 想改文字，直接改引号里的内容
   人格 = Q1 风格 × Q2 节奏（4 × 3 = 12 种）
   ========================================================= */

// Q1 风格（顺序决定人格编号，不要改顺序）
window.STYLES = ["moon", "lantern", "tea", "mountain"];
// Q2 节奏（顺序决定人格编号，不要改顺序）
window.PACES = ["fast", "slow", "steady"];

window.QUESTIONS = [
  {
    key: "style",
    zh: "心动的时候，你更像…",
    en: "When you like someone, you…",
    options: [
      { value: "moon",     zh: "先安静观察，再慢慢靠近", en: "watch quietly, then come closer" },
      { value: "lantern",  zh: "热情直接，会主动表达",   en: "show it warmly and directly" },
      { value: "tea",      zh: "像朋友一样自然相处",     en: "keep it easy, like friends" },
      { value: "mountain", zh: "需要深聊，灵魂契合最重要", en: "need deep talks and a real connection" }
    ]
  },
  {
    key: "pace",
    zh: "你的恋爱节奏是…",
    en: "Your pace in love is…",
    options: [
      { value: "fast",   zh: "很快心动",       en: "I fall fast" },
      { value: "slow",   zh: "慢慢升温",       en: "I warm up slowly" },
      { value: "steady", zh: "想清楚了才投入", en: "I commit once I'm sure" }
    ]
  },
  {
    key: "want",
    zh: "你现在最想要的是…",
    en: "Right now, you most want…",
    options: [
      { value: "understood", zh: "被理解",     en: "to be understood" },
      { value: "spark",      zh: "心动的感觉", en: "to feel the spark" },
      { value: "safe",       zh: "安全感",     en: "to feel safe" },
      { value: "freedom",    zh: "自由和空间", en: "freedom and space" }
    ]
  }
];

// 12 种人格，按编号 01–12 排列
window.PERSONAS = [
  { style: "moon", pace: "fast",
    zh: { name: "流萤型", desc: "安静的时候不显眼，遇到对的人会突然发光。", shine: "真诚、不做作", tip: "心动了，就让对方知道一点点。" },
    en: { name: "The Firefly", desc: "Quiet most days, you light up when the right person appears.", shine: "Sincere and unforced", tip: "When you feel it, let them see a little." } },
  { style: "moon", pace: "slow",
    zh: { name: "月光型", desc: "你的爱不刺眼，却会一点点照进对方心里。", shine: "温柔、细腻", tip: "别总是等，偶尔也先迈一步。" },
    en: { name: "The Moonlight", desc: "Your love isn't loud, but it slowly lights someone's heart.", shine: "Gentle and attentive", tip: "Don't always wait; take the first step sometimes." } },
  { style: "moon", pace: "steady",
    zh: { name: "玉石型", desc: "内敛、有分寸，越久越能看出你的好。", shine: "可靠、经得起时间", tip: "让对的人看见你柔软的一面。" },
    en: { name: "The Jade", desc: "Reserved and graceful, your worth shows more with time.", shine: "Reliable and lasting", tip: "Let the right person see your softer side." } },
  { style: "lantern", pace: "fast",
    zh: { name: "烟火型", desc: "你爱得热烈直接，让人一眼就记住。", shine: "勇敢、有感染力", tip: "热烈之后，也给关系一点慢慢生长的时间。" },
    en: { name: "The Firework", desc: "You love brightly and boldly; people remember you.", shine: "Brave and full of life", tip: "After the spark, give love time to grow." } },
  { style: "lantern", pace: "slow",
    zh: { name: "灯笼型", desc: "你的温暖不张扬，却会被对的人慢慢看见。", shine: "温暖、让人安心", tip: "照亮别人的同时，也照顾好自己。" },
    en: { name: "The Lantern", desc: "Your warmth is quiet, and the right person will see it.", shine: "Warm and comforting", tip: "While you light others, care for yourself too." } },
  { style: "lantern", pace: "steady",
    zh: { name: "炉火型", desc: "你的爱像炉火，不一定最亮，却最持久。", shine: "长情、有担当", tip: "也要允许自己被照顾。" },
    en: { name: "The Hearth", desc: "Like a hearth, your love may not be the brightest, but it lasts.", shine: "Devoted and dependable", tip: "Allow yourself to be cared for too." } },
  { style: "tea", pace: "fast",
    zh: { name: "春风型", desc: "你轻松自在，很快就能拉近两个人的距离。", shine: "亲和、有趣", tip: "轻松之外，也说说你认真的那一面。" },
    en: { name: "The Spring Breeze", desc: "Easy and light, you bring people close quickly.", shine: "Friendly and fun", tip: "Beyond the ease, share your serious side." } },
  { style: "tea", pace: "slow",
    zh: { name: "清茶型", desc: "你像一杯清茶，越相处越有味道。", shine: "耐看、真实", tip: "别怕被看穿，真实就是你的魅力。" },
    en: { name: "The Green Tea", desc: "Like green tea, you grow richer the longer someone knows you.", shine: "Genuine and quietly charming", tip: "Don't fear being seen; being real is your charm." } },
  { style: "tea", pace: "steady",
    zh: { name: "竹林型", desc: "你自在有分寸，在关系里也保留自己的空间。", shine: "独立、清醒", tip: "空间很重要，靠近也很重要。" },
    en: { name: "The Bamboo", desc: "Free yet balanced, you keep your own space in love.", shine: "Independent and clear-minded", tip: "Space matters, and so does closeness." } },
  { style: "mountain", pace: "fast",
    zh: { name: "流星型", desc: "遇到灵魂契合的人，你会一眼认定。", shine: "深情、有直觉", tip: "认定之前，也看看对方是否同样认真。" },
    en: { name: "The Shooting Star", desc: "When you meet a true connection, you know at once.", shine: "Deep and intuitive", tip: "Before you decide, see if they're just as sincere." } },
  { style: "mountain", pace: "slow",
    zh: { name: "远山型", desc: "你的深情需要时间，一旦走近就很难忘。", shine: "深刻、专一", tip: "别让距离感挡住想靠近你的人。" },
    en: { name: "The Distant Mountain", desc: "Your depth takes time, and once close, you're unforgettable.", shine: "Profound and loyal", tip: "Don't let your distance keep good people away." } },
  { style: "mountain", pace: "steady",
    zh: { name: "磐石型", desc: "你认定一个人，就会很长久。", shine: "坚定、给人安全感", tip: "坚定之外，也记得表达浪漫。" },
    en: { name: "The Rock", desc: "When you choose someone, it's for the long run.", shine: "Steady and safe to be with", tip: "Beyond being steady, remember to show romance." } }
];

// Q3 个性化小字
window.WANT_LINES = {
  understood: { zh: "今年，愿你遇到一个愿意听你把话说完的人。", en: "This year, may you meet someone who listens to the end." },
  spark:      { zh: "今年，愿你重新找回心跳加速的感觉。",       en: "This year, may your heart race again." },
  safe:       { zh: "今年，愿你遇到一个让你安心做自己的人。",   en: "This year, may you find someone you can safely be yourself with." },
  freedom:    { zh: "今年，愿你的爱给你翅膀，而不是束缚。",     en: "This year, may love give you wings, not walls." }
};

// 双人组合寄语（按两人的“风格”配对，不分先后）
window.PAIR_LINES = {
  "moon+moon":         { zh: "两束月光，安静却懂彼此。",       en: "Two moonbeams: quiet, but you understand each other." },
  "lantern+moon":      { zh: "一个照亮，一个温柔回应。",       en: "One shines, one answers softly." },
  "moon+tea":          { zh: "不急不躁，舒服是你们的默契。",   en: "Unhurried; comfort is your shared language." },
  "moon+mountain":     { zh: "慢慢靠近，越走越深。",           en: "You draw close slowly, and go deep." },
  "lantern+lantern":   { zh: "两盏灯，热闹又温暖。",           en: "Two lanterns: lively and warm." },
  "lantern+tea":       { zh: "热情遇见自在，日子很有趣。",     en: "Warmth meets ease; life together is fun." },
  "lantern+mountain":  { zh: "一个点燃，一个守住。",           en: "One sparks, the other keeps the flame." },
  "tea+tea":           { zh: "像老朋友一样相爱。",             en: "You love like old friends." },
  "mountain+tea":      { zh: "轻松里有深度，平淡里有心动。",   en: "Depth within ease, a spark within calm." },
  "mountain+mountain": { zh: "两座山，彼此是最稳的依靠。",     en: "Two mountains, each the other's steadiest support." }
};

/* ---------- 计算工具（测试也会用到） ---------- */
// 返回人格编号 0–11（显示时 +1）
window.personaIndex = function (style, pace) {
  const s = window.STYLES.indexOf(style), p = window.PACES.indexOf(pace);
  if (s < 0 || p < 0) return -1;
  return s * window.PACES.length + p;
};
// 两种风格 → 组合寄语
window.pairLine = function (styleA, styleB) {
  const key = [styleA, styleB].sort().join("+");
  return window.PAIR_LINES[key] || null;
};
