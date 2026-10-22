import { memo } from "react";
import type { FeaturesProps } from "config";

const Features = ({ items }: FeaturesProps) => {
	return (
		<div className="mb-16">
			<h2 className="mb-6 text-2xl font-semibold">Features</h2>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{items.map((feature) => {
					const Icon = feature.icon;
					return (
						<div
							key={feature.title}
							className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
						>
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
								<Icon className="h-6 w-6 text-gray-700" />
							</div>
							<h3 className="mb-2 text-lg font-medium text-gray-900">{feature.title}</h3>
							<p className="text-sm leading-relaxed text-gray-600">
								{feature.description}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default memo(Features);
