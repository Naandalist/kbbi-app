import { memo } from "react";
import type { SocialLink, SocialLinksProps } from "config";

const SocialLinks = ({ items }: SocialLinksProps) => {
	return (
		<div className="mb-8">
			<div className="relative">
				<div className="absolute inset-0 flex items-center" aria-hidden="true">
					<div className="mx-auto border-t border-gray-200" />
				</div>
				<div className="relative flex justify-center">
					<span className="bg-white px-6 text-sm font-medium tracking-wider text-gray-500 uppercase">
						Social Media
					</span>
				</div>
			</div>

			<div className="mt-6 flex justify-center gap-4">
				{items.map((link: SocialLink) => {
					const Icon = link.icon;
					return (
						<a
							key={link.label}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all duration-200 hover:bg-gray-100"
							aria-label={link.label}
						>
							<Icon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-gray-900" />
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default memo(SocialLinks);
