import { motion } from "framer-motion";
import { memo } from "react";
import type { ScreenshotsProps } from "config";
import { areImagesEqual } from "config";

const Screenshots = ({ images }: ScreenshotsProps) => {
	const currentImages = images.android;

	return (
		<div className="mb-16">
			<div className="mb-6">
				<h2 className="text-2xl font-semibold">Screenshots</h2>
			</div>
			<div className="relative overflow-hidden min-h-[400px]">
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3 }}
					className="screenshots-container scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
					onAnimationComplete={() => {
						const container = document.querySelector(
							".screenshots-container",
						);
						if (container) container.classList.add("overflow-x-auto");
					}}
					onAnimationStart={() => {
						const container = document.querySelector(
							".screenshots-container",
						);
						if (container) container.classList.remove("overflow-x-auto");
					}}
				>
					<div className="flex gap-6 pb-4">
						{currentImages.map((image, index) => (
							<motion.button
								key={image}
								initial={{ opacity: 0, y: 20 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: { delay: index * 0.1 },
								}}
								type="button"
								onClick={() => window.openLightbox?.(index, "android")}
								className="relative flex-shrink-0 overflow-hidden rounded-xl focus:outline-none"
							>
								<img
									src={image}
									alt={`Screenshot ${index + 1}`}
									className="rounded-xl border border-gray-200 object-cover aspect-[9/16] w-[260px]"
									loading="lazy"
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
