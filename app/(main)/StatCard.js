"use client"
import { useRef, useState } from "react";

const { default: Card } = require("@/components/UI/Card");
const { default: CardContent } = require("@/components/UI/CardContent");
const { default: useIntersection } = require("@/utils/useIntersection");

export default function StatCard({ icon = null, stat, statTitle, statDesc, className = "", iconClass="big-icon" }) {
	let maxCount = parseInt(stat);
	let ref = useRef(null)
	let isVisible = useIntersection(ref);
	let [animate, setAnimate] = useState(false);
	let [count, setCount] = useState(0);

	if (isVisible && !animate) {
		setAnimate(true);
	}

	if (animate && count < maxCount) {
		setTimeout(() => setCount(maxCount<30 ? maxCount : (Math.min(Math.round(count + maxCount / 30), maxCount))), count === 0 ? 700 : 30);
	}

	return (
		<div ref={ref} className={"relative hoverSlide " + className}>
			<Card className="relative">
				<CardContent className="flex flex-col justify-center">
					<div className="flex flex-row items-start justify-between mb-0">
						<div>
							<div className="text-lg font-semibold">{statTitle}</div>
							<div className="text-5xl font-mono font-bold">{count}</div>
						</div>
						<div className={"rounded-lg p-2 my-2 " + iconClass}>{icon}</div>
					</div>
					{statDesc && <div className="text-sm">{statDesc}</div>}
				</CardContent>
			</Card>
		</div>
	);
}
