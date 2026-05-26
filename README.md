# 🍥 Owen_W Blog  

> 记录技术成长与生活思考的个人博客

这是 Owen_W 的个人博客，基于 [Astro](https://astro.build) + [Fuwari](https://github.com/saicaca/fuwari) 框架构建，并进行了全套的深度本地 SEO 优化。

📍 **官方网址：** [blog.owenwoow.com](https://blog.owenwoow.com)

---

## ✨ 博客特色

- ⚡ **卓越性能**：基于 Astro 静态站点引擎构建，页面加载迅速，核心网页指标（Core Web Vitals）表现出色。
- 🎨 **极简美感**：采用高颜值玻璃拟态（Glassmorphism）和沉浸式暗色模式设计，视觉效果一流。
- 🔍 **深度 SEO 优化**：
  - 成功接入 **Google Search Console** 与 **Bing Webmaster Tools**。
  - 自动生成规范的 `sitemap-index.xml` 站点地图与 `rss.xml` 订阅源。
  - 具备完整的 **Canonical URL** 标签，防止重复页面权重分散。
  - 独立的描述（`description`）元标签 fallback 降级逻辑（自动降级为网站副标题，而不是页面标题）。
  - 支持微信、Twitter (X)、微博等社交媒体的 **OG Image (Open Graph Image)** 社交大图展示，并使用 AI 生成了专属的品牌默认分享图。
- 📊 **富摘要 JSON-LD 结构化数据**：
  - **首页**：集成 WebSite 和 SearchAction 结构化数据，易于触发 Google 站内搜索框。
  - **文章页**：支持 BlogPosting 增强属性（如封面图 `image`、更新时间 `dateModified`、权威网页等），极大提高搜索展示吸引力。
- 🔎 **毫秒级检索**：基于 [Pagefind](https://pagefind.app/) 实现的纯客户端全文搜索引擎，极低开销下实现卓越的站内实时搜索体验。
- 📝 **增强 Markdown 支持**：集成折叠警告框 (Admonitions)、GitHub 仓库卡片以及 Expressive Code 丰富代码快高亮。

---

## 🚀 本地开发与维护

在终端运行以下命令：

### 1. 安装依赖
确保本地安装了 [pnpm](https://pnpm.io)（`npm install -g pnpm`），然后在根目录运行：
```sh
pnpm install
```

### 2. 运行本地开发服务器
```sh
pnpm dev
```
启动后在浏览器打开 `http://localhost:4321` 进行实时预览。

### 3. 创建新博客文章
使用内置便利脚本快速在 `src/content/posts/` 自动分类下创建一份文章模板：
```sh
pnpm new-post <文章英文标识符>
```

### 4. 生产环境编译打包
在将页面部署至服务器或托管平台前，在本地进行一次生产级别静态编译和检索索引生成：
```sh
pnpm build
```

---

## 🛠️ 常用开发命令一览

| 命令 | 作用 |
|:---|:---|
| `pnpm install` | 安装项目的所有 node 依赖包 |
| `pnpm dev` | 启动开发服务器进行本地调试 |
| `pnpm build` | 打包生产静态站点到 `./dist/` |
| `pnpm preview` | 在本地预览生产编译后的静态包 |
| `pnpm check` | 运行静态类型和 Astro 规范检查 |
| `pnpm format` | 使用 Biome 极速格式化项目代码 |
| `pnpm new-post <filename>` | 自动创建一篇新的博客文章 |

---

## ✏️ 常用站点配置

- **基础设置**：在 [src/config.ts](file:///e:/Code/MyBlog/Owenwoow.github.io/src/config.ts) 中调整网站标题、副标题、博主社交账号、头像、导航栏等基本信息。
- **域名绑定**：网站二级域名绑定于 `public/CNAME` 和 `astro.config.mjs` 中的 `site` 参数（统一指向 `https://blog.owenwoow.com`）。

---

## 📄 开源许可证

该项目根据 [MIT License](LICENSE) 获得许可。
