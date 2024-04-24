"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Chip from "./Chip";

// This *client* component will be imported into a blog layout
export default function ActiveLinkChip({ slug, children, href }) {
	// Navigating to `/blog/hello-world` will return 'hello-world'
	// for the selected layout segment
	const segment = useSelectedLayoutSegment();
	const isActive = slug === segment;

	return (
		<Chip component={Link} className={isActive ? "activeLink active" : "activeLink"} href={href}>
			{children}
		</Chip>
	);
}
