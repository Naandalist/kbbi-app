import { FiBook, FiFastForward, FiEye } from "react-icons/fi";
import type { Feature } from "./types";

export const features: Feature[] = [
    {
        title: "Lengkap",
        description: "Akses database kosakata lengkap cerminan KBBI dari Kemendikbud.",
        icon: FiBook,
    },
    {
        title: "Pengalaman Pengguna Optimal",
        description: "Nikmati antarmuka yang lebih intuitif dan cepat untuk pencarian kata.",
        icon: FiFastForward,
    },
    {
        title: "Tampilan Modern",
        description: "Nikmati pengalaman membaca dengan tampilan yang bersih dan mudah digunakan untuk kenyamanan maksimal.",
        icon: FiEye,
    },
];