import type { AppLogo, StoreLinks } from "./types";
import kbbiIcon from "../assets/kbbi-icon.webp";

export const appInfo = {
	title: "Kamus KBBI VI Bahasa Indonesia",
	description:
		"Aplikasi yang memuat kosakata lengkap bahasa Indonesia, memungkinkan pengguna untuk dengan mudah mencari dan memahami arti kata.",
	logo: {
		type: "image" as AppLogo["type"],
		src: kbbiIcon.src,
	},
	storeLinks: {
		apple: "#",
		google: "https://play.google.com/store/apps/details?id=com.naandalist.kamus_kbbi",
	} as StoreLinks,
};
