// 把 Supabase 项目的两项信息填在引号里（Supabase 后台 → Project Settings → API Keys / Data API）
// 这两项本来就是公开给网页用的，放在网站里是安全的；数据靠数据库的行级权限保护，每人只能读写自己的进度。
window.N4_CONFIG = {
  SUPABASE_URL: '',   // 例如 'https://abcdefghijk.supabase.co'
  SUPABASE_KEY: ''    // anon public 密钥（eyJ 开头）或 publishable 密钥（sb_publishable_ 开头）
};
