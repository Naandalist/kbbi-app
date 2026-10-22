import type { IconType } from "react-icons";

export interface DeviceScreenshots {
	android: string[];
}

export interface Feature {
	title: string;
	description: string;
	icon: IconType;
}

export interface FAQ {
	question: string;
	answer: string;
}

export interface StoreLinks {
	apple: string;
	google: string;
}

export interface SocialLink {
	url: string;
	icon: IconType;
	label: string;
}

export interface AppLogo {
	type: "iframe" | "image";
	src: string;
}

export interface AppData {
	title: string;
	description: string;
	screenshots: DeviceScreenshots;
	features: Feature[];
	faqs: FAQ[];
	storeLinks: StoreLinks;
	socialLinks: SocialLink[];
	logo: AppLogo;
}

export interface WithImages {
	images: DeviceScreenshots;
}

export interface WithItems<T> {
	items: T[];
}

export interface StoreButtonProps {
	store: "apple" | "google";
	href: string;
	label: string;
	storeName: string;
}

export interface AppHeroProps {
	title: string;
	description: string;
	storeLinks: StoreLinks;
	logo: AppLogo;
}

export interface BreadcrumbsProps {
	items: {
		label: string;
		href?: string;
	}[];
}

export interface FeaturesProps extends WithItems<Feature> {}
export interface FAQProps extends WithItems<FAQ> {}
export interface SocialLinksProps extends WithItems<SocialLink> {}

export type ScreenshotsProps = WithImages;
export type LightboxProps = WithImages;

export function areImagesEqual<T extends WithImages>(
	prevProps: T,
	nextProps: T,
): boolean {
	return (
		prevProps.images.android === nextProps.images.android
	);
}
