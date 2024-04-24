"use client"

import { useEffect, useRef, useState } from "react";

export default function useIntersection(ref) {
	const [isIntersecting, setIntersecting] = useState(false);

	const observer = useRef(null);

	useEffect(() => {
		observer.current = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
		observer.current.observe(ref.current);
		return () => observer.current.disconnect();
	}, []);

	return isIntersecting;
}
