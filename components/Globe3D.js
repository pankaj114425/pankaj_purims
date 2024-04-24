"use client";
import alpha3 from "@/utils/alpha3";
import Features from "@/utils/world";
import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { useRouter } from 'next/navigation'

export default function Globe3D({ data = [] }) {
	const globe = useRef(null);
	const router = useRouter();
	let max = 0;
	for (let country of data) {
		if (country.value > max) {
			max = country.value;
		}
	}

	let colors = ["#bbb", "#64b5f6", "#64b5f6", "#42a5f5"];

	useEffect(() => {
		if (globe.current) {
			globe.current.controls().enableZoom = false;
			globe.current.controls().autoRotate = true;
			globe.current.controls().autoRotateSpeed = 1;
		}
	}, [globe.current]);

	if (typeof window !== "undefined")
		return (
			<Globe
				ref={globe}
				// globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
				height={window?.innerHeight * 1.3 || 1080}
				hexPolygonsData={Features}
				animateIn={false}
				rendererConfig={{ antialias: false, alpha: true }}
				hexPolygonResolution={3}
				hexPolygonMargin={0.4}
				enablePointerInteraction={true}
				backgroundImageUrl="/night-sky.png"
				// backgroundColor="rgba(0, 0, 0, 0)"
				hexPolygonColor={(e) => {
					let country = data.find((c) => c.id == e.id);
					if (country && country.value) {
						return colors[Math.floor((country.value / (max + 1)) * colors.length)];
					} else return "#a0a0a0";
				}}
				polygonsData={Features}
				polygonAltitude={(d) => 0.06}
				polygonCapColor={(d) => "rgba(0, 0, 0, 0)"}
				polygonSideColor={() => "rgba(0, 0, 0, 0)"}
				polygonStrokeColor={() => false}
				polygonLabel={(d) => {
					let country = data.find((c) => c.id == d.id);
					return `
					<div class="card tooltip" style="translateY: 50%;">
						<div class="p-4">
							<div class="text-lg font-semibold">${alpha3(d.id)}</div>
							<div>Coauthors: ${country?.value || "None"}</div>
						</div>
					</div>
				`;
				}}
				onPolygonClick={(d) => {
					router.push(`/document/?page=1&sort=coverDate&order=descending&pub=&type=&country=${d.id || ""}`)
				}}
			/>
		);
	else return null;
}
