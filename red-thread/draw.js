/* =========================================================
   抽卡规则 · Draw rule
   - 用 昵称 + 生日 + 日期 算出一个固定数字 → 同一天结果不变
   - 优先从“还没收集到”的卡里选 → 连续 12 天就能集齐
   - 集齐之后，从全部 12 张里选
   ========================================================= */
(function (root) {
  "use strict";

  // FNV-1a 哈希：同样的输入永远得到同样的数字
  function hash(str) {
    let h = 0x811c9dc5;
    for (const ch of str) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
    return h >>> 0;
  }

  // collected：已经收集到的卡片编号（0–11），total：卡片总数
  function drawCard(nickname, month, day, dateStr, collected, total) {
    const n = hash(String(nickname).trim().toLowerCase() + "|" + month + "-" + day + "|" + dateStr);
    const have = new Set(collected || []);
    const pool = [];
    for (let i = 0; i < total; i++) if (!have.has(i)) pool.push(i);
    if (pool.length === 0) return n % total;
    return pool[n % pool.length];
  }

  root.RT_DRAW = { hash: hash, drawCard: drawCard };
})(typeof window !== "undefined" ? window : globalThis);
