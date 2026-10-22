import { memo } from "react";
import { FiChevronRight, FiHome } from "react-icons/fi";
import type { BreadcrumbsProps } from "config";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
	return (
		<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
			<a href="/" className="hover:text-gray-900 transition-colors p-2 -ml-2">
				<FiHome className="w-4 h-4" />
			</a>

			{items.map((item) => (
				<div key={item.label} className="flex items-center space-x-2">
					<FiChevronRight className="w-4 h-4 text-gray-400" />
					{item.href ? (
						<a href={item.href} className="hover:text-gray-900 transition-colors">
							{item.label}
						</a>
					) : (
						<span className="text-gray-900">{item.label}</span>
					)}
				</div>
			))}
		</nav>
	);
};

export default memo(Breadcrumbs);
