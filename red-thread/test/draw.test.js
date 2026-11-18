// 运行方法：在 red-thread 文件夹里执行  node test/draw.test.js
// 模拟连续 12 天每天抽一张：每天都应该是新卡，第 12 天集齐；同一天重复抽结果不变。
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "draw.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "cards.js"), "utf8"), ctx);
const { drawCard } = ctx.window.RT_DRAW;
const CARDS = ctx.window.CARDS;
const TOTAL = CARDS.length;

function dateStr(start, plusDays) {
  const d = new Date(start); d.setDate(d.getDate() + plusDays);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

// 多个用户、多个开始日期都测一遍
const users = [["小鱼", 5, 2], ["Michelle", 12, 31], ["Tia", 1, 9], ["WWWWWWWWWWWW", 2, 29], ["月老", 7, 7]];
const starts = ["2026-11-18", "2027-01-30", "2027-02-14"];
for (const [name, m, d] of users) {
  for (const start of starts) {
    const collected = [];
    for (let day = 0; day < TOTAL; day++) {
      const ds = dateStr(start, day);
      const pick = drawCard(name, m, d, ds, collected, TOTAL);
      assert.strictEqual(drawCard(name, m, d, ds, collected, TOTAL), pick, "同一天结果应该不变");
      assert.ok(!collected.includes(pick), `${name} 第 ${day + 1} 天抽到了重复的卡`);
      collected.push(pick);
    }
    assert.strictEqual(new Set(collected).size, TOTAL, "12 天应该集齐");
    // 集齐后还能继续每天抽（从全部卡里选）
    const after = drawCard(name, m, d, dateStr(start, TOTAL), collected, TOTAL);
    assert.ok(after >= 0 && after < TOTAL);
  }
}

// 打印一个例子
const demo = [];
for (let day = 0; day < TOTAL; day++) {
  const pick = drawCard("小鱼", 5, 2, dateStr("2026-11-18", day), demo, TOTAL);
  demo.push(pick);
  console.log(`第 ${String(day + 1).padStart(2)} 天 ${dateStr("2026-11-18", day)} → ${String(pick + 1).padStart(2, "0")} ${CARDS[pick].zh.name}   （已收集 ${demo.length}/12）`);
}
// 每张卡都有中英文典故和出处
CARDS.forEach((c, i) => assert.ok(c.story && c.story.zh && c.story.en && c.source.zh && c.source.en, `第 ${i + 1} 张缺典故`));
console.log("\n✓ 5 位用户 × 3 个开始日期：每天都是新卡，第 12 天集齐；同一天结果不变；12 张卡都有中英文典故");
