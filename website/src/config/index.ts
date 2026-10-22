import type { AppData } from "./types";
import { appInfo } from "./appInfo";
import { features } from "./features";
import { faq } from "./faq";
import { screenshots } from "./screenshots";
import { socialLinks } from "./socialLinks";

export const siteConfig: AppData = {
	...appInfo,
	features,
	faqs: faq,
	screenshots,
	socialLinks,
};

// Re-export types for easier imports
export * from "./types";
