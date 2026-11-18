/* =========================================================
   设置 · Settings —— 上线后只需要改这个文件
   ========================================================= */

// 网站地址（结果卡二维码 + 双人红线链接都用它）。
// 以后换成自己的域名（例如 Cloudflare Pages 地址），改这里即可。
window.SITE_URL = "https://tiaz369.github.io/red-thread/";

// ① Formspree 表单地址，例如 "https://formspree.io/f/abcdwxyz"
//    FORM_URL     = 付费测试弹窗的邮箱
//    WAITLIST_URL = 「Inner Lab 候补名单」的邮箱（可以和上面填同一个）
//    留空 = 还没开通：用户提交时会看到“邮箱提交功能还没开通”的提示，不会假装成功。
window.FORM_URL = "";
window.WAITLIST_URL = "";

// ② Cloudflare Web Analytics 的 token（只统计访问量），例如 "0123456789abcdef0123456789abcdef"
window.CF_ANALYTICS_TOKEN = "";

// ③ GoatCounter 的代码（统计按钮事件：开始测试、完成测试、保存卡、牵线、打开双人链接、点付费、提交邮箱）
//    Cloudflare Web Analytics 只能统计访问量，不能统计按钮事件，所以事件用 GoatCounter。
//    例如你的后台网址是 https://redthread.goatcounter.com ，这里就填 "redthread"
window.GOATCOUNTER_CODE = "";
