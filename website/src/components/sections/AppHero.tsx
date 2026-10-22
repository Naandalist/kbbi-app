import { memo } from "react";
import { FaStore } from "react-icons/fa";
import type { AppHeroProps, StoreButtonProps } from "config";

const GooglePlayIcon = () => (
	<svg
		aria-hidden="true"
		viewBox="0 0 40 40"
		xmlns="http://www.w3.org/2000/svg"
		className="w-8 h-8"
	>
		<path fill="none" d="M0,0h40v40H0V0z" />
		<g>
			<path
				d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z"
				fill="#EA4335"
			/>
			<path
				d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z"
				fill="#FBBC04"
			/>
			<path
				d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z"
				fill="#4285F4"
			/>
			<path
				d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z"
				fill="#34A853"
			/>
		</g>
	</svg>
);

const AppHero = ({ title, description, storeLinks, logo }: AppHeroProps) => {
	return (
		<div className="mb-16 flex flex-col md:flex-row gap-8">
			<div className="flex-shrink-0 md:self-center">
				<div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 w-[192px] h-[192px] flex items-center justify-center">
					{logo.type === "iframe" ? (
						<iframe
							src={logo.src}
							className="h-40 w-40 rounded-2xl border-0"
							title="App Logo"
						/>
					) : (
						<img
							src={logo.src}
							alt="App Icon"
							className="h-40 w-40 rounded-2xl shadow-lg object-cover"
						/>
					)}
				</div>
			</div>

			<div className="flex flex-1 flex-col justify-between">
				<div>
					<h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
					<p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl">
						{description}
					</p>
				</div>

				<div className="flex flex-wrap gap-4">
					{/* <StoreButton
						store="apple"
						href={storeLinks.apple}
						label="Download from"
						storeName="AppGallery"
					/> */}
					<StoreButton
						store="google"
						href={storeLinks.google}
						label="Unduh di"
						storeName="Google Play"
					/>
				</div>
			</div>
		</div>
	);
};

const StoreButton = memo(
	({ store, href, label, storeName }: StoreButtonProps) => {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 shadow-sm"
			>
				<div className="flex items-center justify-center w-7 h-7 transition-transform duration-300 group-hover:scale-110">
					{store === "apple" ? (
						<FaStore className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
					) : (
						<GooglePlayIcon />
					)}
				</div>
				<span className="text-left">
					<div className="text-[11px] font-medium text-gray-500 group-hover:text-gray-600 transition-colors">
						{label}
					</div>
					<div className="text-[13px] font-semibold tracking-wide text-gray-800 group-hover:text-gray-900 transition-colors">
						{storeName}
					</div>
				</span>
			</a>
		);
	},
);

StoreButton.displayName = "StoreButton";

export default memo(AppHero);
