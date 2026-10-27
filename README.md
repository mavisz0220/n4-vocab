# N4 单词自测：独立网站部署指南

这个文件夹就是一个完整的网站，不依赖 Claude，打开就能用。登录后，手机和电脑的学习进度会自动同步。

| 文件 | 作用 |
|---|---|
| `index.html` | 网站本体，包含全部 962 个单词、闪卡、选择题、易混词、错题本 |
| `config.js` | 填写同步数据库的地址和密钥（第 3 步） |
| `setup.sql` | 在数据库里建表，只需运行一次（第 2 步） |

整个过程大约 15 分钟，需要注册两个免费账号：**Supabase**（存进度）和 **GitHub**（放网站）。

---

## 第 1 步：创建 Supabase 项目

1. 打开 <https://supabase.com>，点 **Start your project**，可以用 GitHub 账号或邮箱注册。
2. 点 **New project**：
   - Name：随便填，例如 `n4-vocab`
   - Database Password：设置一个密码并记下来（平时用不到）
   - Region：选离你近的。人在澳洲选 **Sydney**；主要在国内用选 **Singapore** 或 **Tokyo**。
3. 点 **Create new project**，等 1～2 分钟，项目创建好。

## 第 2 步：建数据表

1. 左侧菜单点 **SQL Editor**，再点 **New query**。
2. 用记事本打开 `setup.sql`，全选复制，粘贴进去，点 **Run**。
3. 看到 `Success. No rows returned` 就完成了。

## 第 3 步：把密钥填进 config.js

1. 左侧点齿轮 **Project Settings**：
   - **Data API**（或 **API**）页面：复制 **Project URL**，形如 `https://xxxxxxxx.supabase.co`
   - **API Keys** 页面：复制 **publishable** 密钥（`sb_publishable_` 开头），或者 Legacy 标签下的 **anon public** 密钥（`eyJ` 开头），两种都可以。
   - **不要**复制 `secret` 或 `service_role` 密钥，那个不能放进网页。
2. 用记事本打开 `config.js`，把两项粘贴到引号里，保存：

```js
window.N4_CONFIG = {
  SUPABASE_URL: 'https://xxxxxxxx.supabase.co',
  SUPABASE_KEY: 'sb_publishable_xxxxxxxx'
};
```

publishable 或 anon 密钥本来就是给网页公开用的。数据库已经设置了权限，每个账号只能读写自己的进度。

## 第 4 步：用 GitHub Pages 发布网站

1. 打开 <https://github.com>，注册并登录。
2. 右上角 **+** → **New repository**：
   - Repository name：`n4-vocab`
   - 选 **Public**（免费账号的 Pages 需要公开仓库）
   - 点 **Create repository**
3. 在新仓库页面点 **uploading an existing file**，把 `index.html` 和 `config.js` 拖进去，点 **Commit changes**。
4. 打开仓库的 **Settings** → 左侧 **Pages**：
   - Source 选 **Deploy from a branch**
   - Branch 选 **main**，文件夹选 **/ (root)**，点 **Save**
5. 等 1～2 分钟刷新，页面顶部会出现网址：`https://你的用户名.github.io/n4-vocab/`

> 公开仓库意味着别人能看到网站的文件，包括单词表。如果不想公开，可以改用 Cloudflare Pages：Workers & Pages → Create → Pages → **Upload assets**，直接上传这个文件夹，不需要仓库。

## 第 5 步：告诉 Supabase 网站地址

这一步是为了让注册确认邮件里的链接能跳回你的网站。

1. Supabase 左侧 **Authentication** → **URL Configuration**
2. **Site URL** 填第 4 步得到的网址，例如 `https://你的用户名.github.io/n4-vocab/`
3. **Redirect URLs** 里点 **Add URL**，再填一次同样的网址，保存。

## 第 6 步：开始使用

1. 打开你的网址，点 **登录 / 注册，多设备同步** → 填邮箱和密码 → **注册新账号**。
2. 去邮箱点确认链接，会跳回网站并自动登录。没收到就看看垃圾邮件。
3. 在手机上打开同一个网址，用同一个邮箱和密码 **登录**，进度就会合并过来。
4. 手机上可以用浏览器的“添加到主屏幕”，像 App 一样打开。

---

## 常见问题

**同步什么时候发生？**
每次答题或给闪卡打分后约 2 秒自动上传；打开或切回网页时自动下载。顶部会显示“已同步 时:分”，也可以点“立即同步”。两台设备的记录按单词合并，以较新的那次为准。

**没网的时候能用吗？**
能。进度先存在本机，联网后会自动补传。

**显示“连不上同步服务器”？**
免费的 Supabase 项目如果 **连续 7 天没人使用会暂停**。登录 supabase.com，打开项目，点 **Restore** 即可，数据不会丢。每天学习的话不会触发。

**忘记密码？**
在登录框填好邮箱，点“忘记密码”，按邮件里的链接回到网站设置新密码。

**以后想换密钥或改数据库？**
在 GitHub 仓库里点开 `config.js`，点铅笔图标在线编辑，提交后一两分钟生效。

**之前在 Claude 页面上的进度？**
那个页面的进度存在它自己的浏览器存储里，新网站读不到，需要重新开始。
