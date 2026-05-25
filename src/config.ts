import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Owen_W Blog",
	subtitle: "记录技术成长与生活思考的个人博客",
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th', 'vi' - 支持的语言
	themeColor: {
		hue: 250, // 主题色的默认色相，范围0-360。例如：红色: 0, 青色: 200, 青色: 250, 粉色: 345
		fixed: false, // 为访客隐藏主题色选择器
	},
	banner: {
		enable: true,
		src: "assets/images/background.jpg", // 相对于 /src 目录。如果以 '/' 开头则相对于 /public 目录
		position: "center", // 等同于 object-position，仅支持 'top', 'center', 'bottom'。默认为 'center'
		credit: {
			enable: false, // 显示横幅图片的版权信息
			text: "", // 要显示的版权文本
			url: "", // (可选) 指向原始作品或艺术家页面的URL链接
		},
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 2, // 目录中显示的最大标题深度，范围1-3
	},
	favicon: [
		// 保持此数组为空以使用默认图标
		// {
		//   src: '/favicon/icon.png',    // 图标路径，相对于 /public 目录
		//   theme: 'light',              // (可选) 'light' 或 'dark'，仅在您有明暗模式不同图标时设置
		//   sizes: '32x32',              // (可选) 图标尺寸，仅在您有不同尺寸图标时设置
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "B站动态",
			url: "https://space.bilibili.com/400282707/dynamic", // 顶栏的超链接地址
			external: true, // 显示外部链接图标并在新标签页中打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg", // 相对于 /src 目录。如果以 '/' 开头则相对于 /public 目录
	name: "Owen_W",
	bio: "欢迎来到我的博客",
	links: [
		{
			name: "BiliBili",
			icon: "fa6-brands:bilibili", // 访问 https://icones.js.org/ 获取图标代码
			// 如果尚未包含相应的图标集，您需要安装它
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/400282707",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Owenwoow",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景色）正在被覆盖，请查看 astro.config.mjs 文件
	// 请选择深色主题，因为此博客主题目前仅支持深色背景
	theme: "github-dark",
};
