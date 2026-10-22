import { siteConfig } from "config";
import type React from "react";
import { memo } from "react";

const Footer: React.FC = () => {
	return (
		<footer className="py-8 text-center space-y-4 border-t border-gray-200">
			<div className="flex justify-center space-x-6 text-sm text-gray-600">
				<a href="/privacy/" className="transition-colors hover:text-gray-900">
					Kebijakan Privasi
				</a>
				<a href="/terms/" className="transition-colors hover:text-gray-900">
					Syarat dan Ketentuan
				</a>
			</div>

			<div className="text-sm text-gray-500">
				<p>
					&copy; {new Date().getFullYear()}{" "}
					<a 
						href="https://www.naandalist.com/" 
						target="_blank" 
						rel="noopener noreferrer"
						className="text-gray-600 hover:text-gray-900 transition-colors"
					>
						Naandalist
					</a>
					<br />
					All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default memo(Footer);
