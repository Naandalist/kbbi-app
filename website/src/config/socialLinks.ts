import {
	RiInstagramFill,
	RiTelegram2Fill,
	RiTwitterXFill,
} from "react-icons/ri";
import type { SocialLink } from "./types";

export const socialLinks: SocialLink[] = [
	{
		url: "https://www.instagram.com/naandalist/",
		icon: RiInstagramFill,
		label: "Instagram",
	},
	{
		url: "https://t.me/naandalist",
		icon: RiTelegram2Fill,
		label: "Telegram",
	},
	{
		url: "https://x.com/nawndalist",
		icon: RiTwitterXFill,
		label: "Twitter",
	},
];
