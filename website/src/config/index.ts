import type { AppData } from "./types";
import { appInfo } from "./appInfo";
import { features } from "./features";
import { faq } from "./faq";
import { socialLinks } from "./socialLinks";

export const siteConfig: AppData = {
	...appInfo,
	features,
	faqs: faq,
	socialLinks,
};

// Re-export types for easier imports
export * from "./types";
