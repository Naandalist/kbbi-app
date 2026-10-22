import { motion } from "framer-motion";
import { memo } from "react";
import type { ScreenshotsProps } from "config/types";
import { areImagesEqual } from "config/types";

const THUMB_WIDTH = 260;
const THUMB_HEIGHT = 462;

const Screenshots = ({ images }: ScreenshotsProps) => {
	const currentImages = images.android;

	return (
		<div className="mb-16">
			<div className="mb-6">
				<h2 className="text-2xl font-semibold">Screenshots</h2>
			</div>
			<div className="relative overflow-hidden">
				<motion.div
					initial={false}
					className="screenshots-container overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
				>
					<div className="flex gap-6 pb-4">
						{currentImages.map((image, index) => (
							<motion.button
								key={image}
								initial={false}
								type="button"
								onClick={() => window.openLightbox?.(index, "android")}
								className="relative flex-shrink-0 overflow-hidden rounded-xl focus:outline-none"
							>
								<img
									src={image}
									alt={`Screenshot ${index + 1}`}
									width={THUMB_WIDTH}
									height={THUMB_HEIGHT}
									className="aspect-[9/16] h-auto w-[260px] rounded-xl border border-gray-200 bg-gray-100 object-cover"
									loading={index === 0 ? "eager" : "lazy"}
									decoding="async"
									fetchPriority={index === 0 ? "high" : "low"}
								/>
							</motion.button>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default memo(Screenshots, areImagesEqual);
