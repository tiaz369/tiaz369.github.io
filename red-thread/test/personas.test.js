// 运行方法：在 red-thread 文件夹里执行  node test/personas.test.js
// 列出 12 种组合对应的人格，并检查每种人格都能被测出来。
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "personas.js"), "utf8"), ctx);
const W = ctx.window;

const LABEL = { moon: "月", lantern: "灯", tea: "茶", mountain: "山", fast: "快", slow: "慢", steady: "稳" };
const expected = ["流萤型", "月光型", "玉石型", "烟火型", "灯笼型", "炉火型", "春风型", "清茶型", "竹林型", "流星型", "远山型", "磐石型"];

const seen = new Set();
console.log("风格+节奏 → 人格");
for (const style of W.STYLES) {
  for (const pace of W.PACES) {
    const i = W.personaIndex(style, pace);
    const p = W.PERSONAS[i];
    assert.ok(p, `没有人格：${style}+${pace}`);
    assert.strictEqual(p.style, style);
    assert.strictEqual(p.pace, pace);
    seen.add(i);
    console.log(`${LABEL[style]}+${LABEL[pace]}  →  ${String(i + 1).padStart(2, "0")} ${p.zh.name} · ${p.en.name}`);
  }
}
assert.strictEqual(seen.size, 12, "应该正好 12 种不同人格");
W.PERSONAS.forEach((p, i) => assert.strictEqual(p.zh.name, expected[i], `编号 ${i + 1} 应该是 ${expected[i]}`));

// 双人组合：4 种风格两两配对 = 10 种，不分先后都能找到
let pairs = 0;
for (const a of W.STYLES) for (const b of W.STYLES) {
  const l = W.pairLine(a, b);
  assert.ok(l && l.zh && l.en, `缺少组合寄语：${a}+${b}`);
  assert.deepStrictEqual(l, W.pairLine(b, a));
  if (a <= b) pairs++;
}
assert.strictEqual(Object.keys(W.PAIR_LINES).length, 10);
// Q3 小字
["understood", "spark", "safe", "freedom"].forEach((k) => assert.ok(W.WANT_LINES[k]));
console.log("\n✓ 12 种人格全部可以测出，10 种双人组合全部有寄语");
