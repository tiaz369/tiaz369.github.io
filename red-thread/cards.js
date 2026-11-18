/* =========================================================
   缘分卡内容 · Card content
   想改文字？直接改这个文件里引号中的内容就行。
   中文寄语里的 / 表示结果卡上的换行位置。
   To edit wording, change the text inside the quotes.
   ========================================================= */

window.CARDS = [
  {
    zh: { name: "初见", message: "好的相遇，/常常发生在你不着急的时候。", question: "最近一次对一个人感到好奇，是什么时候？", action: "今天对一个陌生人微笑一次。" },
    en: { name: "First Glance", message: "The best meetings often come when you stop rushing.", question: "When did someone last make you curious?", action: "Smile at a stranger today." },
    symbol: "eye"
  },
  {
    zh: { name: "红线", message: "缘分不是等来的，/是一次次真诚走近的结果。", question: "有没有一个人，你一直想主动联系？", action: "给一个在意的人发一条问候。" },
    en: { name: "The Red Thread", message: "Fate isn't waited for; it's walked toward, honestly.", question: "Is there someone you keep meaning to reach out to?", action: "Send one warm message to someone you care about." },
    symbol: "thread"
  },
  {
    zh: { name: "月下", message: "先温柔对待自己，/你会更清楚想被怎样爱。", question: "你最希望被怎样对待？", action: "今晚为自己做一件小小的好事。" },
    en: { name: "Under the Moon", message: "Be gentle with yourself first; you'll learn how you want to be loved.", question: "How do you most want to be treated?", action: "Do one small kind thing for yourself tonight." },
    symbol: "moon"
  },
  {
    zh: { name: "归途", message: "你要找的，是能一起回家的人，/不只是让你心动的人。", question: "什么样的人让你感到安心？", action: "写下理想伴侣最重要的三个特质。" },
    en: { name: "The Way Home", message: "Look for someone to go home with, not only someone who makes your heart race.", question: "Who makes you feel safe?", action: "Write down three qualities that matter most in a partner." },
    symbol: "home"
  },
  {
    zh: { name: "春信", message: "新的季节正在来，/给新的人留一点位置。", question: "你愿意为新的开始放下什么？", action: "整理一个角落，给新年腾出空间。" },
    en: { name: "Spring Letter", message: "A new season is coming; leave a little room for someone new.", question: "What are you ready to let go of for a new start?", action: "Clear one corner to make space for the new year." },
    symbol: "blossom"
  },
  {
    zh: { name: "结", message: "有些结要先解开，/才系得上新的。", question: "你心里还有哪个结没解开？", action: "把一句没说出口的话写下来。" },
    en: { name: "The Knot", message: "Some knots must be untied before a new one can be tied.", question: "What knot is still tied in your heart?", action: "Write down one thing you never said." },
    symbol: "knot"
  },
  {
    zh: { name: "灯", message: "你身上的光，/会被对的人看见。", question: "你最喜欢自己的哪一点？", action: "穿一件让你感觉最像自己的衣服出门。" },
    en: { name: "The Lantern", message: "The right person will see your light.", question: "What do you like most about yourself?", action: "Wear something that feels most like you." },
    symbol: "lantern"
  },
  {
    zh: { name: "远山", message: "距离不是问题，/方向一致才重要。", question: "你未来三年最想去的方向是什么？", action: "和一个人聊聊彼此的未来计划。" },
    en: { name: "Distant Mountains", message: "Distance matters less than walking the same way.", question: "Where do you want to be in three years?", action: "Talk with someone about your plans for the future." },
    symbol: "mountain"
  },
  {
    zh: { name: "同舟", message: "能一起面对小事的人，/才陪得了大事。", question: "你希望伴侣怎样和你一起面对困难？", action: "和朋友或伴侣一起完成一件小事。" },
    en: { name: "The Same Boat", message: "Someone who shares the small things can stay for the big ones.", question: "How do you want a partner to face hard times with you?", action: "Do one small task together with a friend or partner." },
    symbol: "boat"
  },
  {
    zh: { name: "茶", message: "慢一点，/好的关系需要时间泡开。", question: "你最近是不是太急着要一个答案？", action: "安静地喝一杯茶，什么也不想。" },
    en: { name: "Tea for Two", message: "Slow down; good love needs time to steep.", question: "Have you been rushing for an answer lately?", action: "Drink a cup of tea slowly, thinking of nothing." },
    symbol: "tea"
  },
  {
    zh: { name: "镜", message: "你被什么样的人吸引，/也在告诉你自己是谁。", question: "你常被什么样的人吸引？为什么？", action: "写下一个你欣赏的人，和你欣赏他的原因。" },
    en: { name: "The Mirror", message: "Who you're drawn to tells you who you are.", question: "What kind of person draws you in, and why?", action: "Write down someone you admire and why." },
    symbol: "mirror"
  },
  {
    zh: { name: "温羊", message: "温柔也是一种力量，/今年让它带你走近对的人。", question: "今年你想成为怎样的自己？", action: "给新年的自己写一句祝福。" },
    en: { name: "The Gentle Goat", message: "Gentleness is strength; this year, let it lead you to the right person.", question: "Who do you want to be this year?", action: "Write one wish for yourself for the new year." },
    symbol: "goat",
    special: true   // 羊年限定 · 金色边框
  }
];

/* 按状态加的一行小字 · Line based on relationship status */
window.STATUS_LINES = {
  single:  { zh: "这张卡想提醒单身的你：先把心打开一点点。",       en: "For you, single and open: let a little light in." },
  maybe:   { zh: "这张卡想提醒暧昧中的你：真诚比猜测更有力量。",     en: "For you, in the in-between: honesty beats guessing." },
  inlove:  { zh: "这张卡想提醒恋爱中的你：把今天的小事说给对方听。", en: "For you, in love: share one small thing today." },
  healing: { zh: "这张卡想提醒正在疗愈的你：线断了，你还在。",       en: "For you, healing: the thread broke, but you remain." }
};
