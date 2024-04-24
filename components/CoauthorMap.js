"use client";
import { Choropleth, ResponsiveChoropleth } from "@nivo/geo";
import Features from "@/utils/world";
import Card from "./UI/Card";
import CardContent from "./UI/CardContent";
import { useRouter } from "next/navigation";

export default function CoauthorMap({ data, link, onClick, addQ = true }) {
	let max = 0;
	for (let country of data) if (country.value > max) max = country.value;
	let router = useRouter();
	let clickHandler = onClick || (({ data }) => {
		if (link && data) router.push(`${link}/${addQ ? "?" : "&"}country=${data.id}`);
	})
	return (
		<ResponsiveChoropleth
			onClick={clickHandler}
			projectionScale={110}
			data={data}
			features={Features}
			margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			colors={[
				`var(--color-blue-100)`,
				"var(--color-blue-200)",
				"var(--color-blue-300)",
				"var(--color-blue-400)",
				"var(--color-blue-500)",
			]}
			domain={[0, max]}
			unknownColor="#444"
			label="properties.name"
			projectionTranslation={[0.5, 0.7]}
			projectionRotation={[0, 0, 0]}
			enableGraticule={true}
			graticuleLineColor="var(--color-blue-grey-100)"
			borderWidth={0.5}
			borderColor="var(--color-grey-500)"
			tooltip={(e) => (
				<Card className="tooltip">
					<CardContent>
						<div className="text-lg font-semibold">{e.feature.label}</div>
						<div>Coauthors: {e.feature.value || "None"}</div>
					</CardContent>
				</Card>
			)}
		/>
	);
}
