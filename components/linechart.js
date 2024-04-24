"use client";

import { ResponsiveLine } from "@nivo/line";

export default function LineChart({ data }) {
	let fundedLine = null;
	{
		let years = [];
		fundedLine = data.map((l) => ({ x: l.x, y: l.funded || 0 }));
		for (let t of fundedLine) {
			years.push(t.x);
		}
		let min = Math.min(...years);
		let max = Math.max(...years);
		for (let i = min; i < max; i++) {
			if (years.indexOf(i) == -1) {
				fundedLine.push({
					x: i,
					y: 0,
				});
			}
		}
		fundedLine.sort((a, b) => a.x - b.x);
	}

	let years = [];
	for (let t of data) {
		years.push(t.x);
	}
	let min = Math.min(...years);
	let max = Math.max(...years);
	for (let i = min; i < max; i++) {
		if (years.indexOf(i) == -1) {
			data.push({
				x: i,
				y: 0,
			});
		}
	}
	data.sort((a, b) => a.x - b.x);
	let t = [
		{
			id: "Documents",
			color: "#00b0ff",
			data,
		},
	];
	if (fundedLine) {
		t.push({
			id: "Funded",
			color: "#4caf50",
			data: fundedLine,
		});
	}
	return (
		<ResponsiveLine
			data={t}
			xScale={{ type: "time", format: "%Y", precision: "year" }}
			yScale={{
				type: "linear",
				min: "0",
				max: "auto",
				stacked: false,
				reverse: false,
			}}
			xFormat={"time:%Y"}
			enableSlices={"x"}
			axisTop={null}
			axisRight={null}
			enablePoints={true}
			enableArea
			colors={(line) => line.color}
			margin={{ bottom: 72, left: 28, top: 8, right: 20 }}
			theme={{
				textColor: "var(--text-color-secondary)",
				labels: {
					text: {
						color: "var(--text-color-secondary)",
					},
				},
				tooltip: {
					container: {
						background: "var(--bg-card-glass)",
						color: "var(--text-color)",
						backdropFilter: "blur(8px)",
					},
				},
				legends: {
					title: {
						text: {
							color: "var(--text-color-secondary)",
						},
					},
					hidden: {
						text: {
							color: "var(--text-color-secondary)",
						},
					},
					text: { color: "var(--text-color-secondary)" },
				},
				axis: {
					ticks: {
						text: {
							fill: {
								color: "var(--text-color-secondary)"
							}
						}
					},
					legend: {
						text: {
							fill: {
								color: "var(--text-color-secondary)"
							}
						}
					}
				}
			}}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Year",
				format: "%Y",
				tickValues: data.length > 30 ? 30 : data.length,
				legendOffset: 36,
				legendPosition: "middle",
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Documents",
				legendOffset: -40,
				legendPosition: "middle",
			}}
			lineWidth={3}
			pointSize={10}
			pointColor={{ theme: "background" }}
			pointBorderWidth={2}
			pointBorderColor={{ from: "serieColor" }}
			pointLabelYOffset={-12}
			defs={[
				{
					id: "gradientBlue",
					type: "linearGradient",
					colors: [
						{ offset: 0, color: "#00b0ffff" },
						{ offset: 100, color: "#00b0ff11" },
					],
				},
				{
					id: "gradientGreen",
					type: "linearGradient",
					colors: [
						{ offset: 0, color: "#4caf50ff" },
						{ offset: 100, color: "#4caf5011" },
					],
				},
			]}
			areaOpacity={0.5}
			curve={"monotoneX"}
			// 2. defining rules to apply those gradients
			fill={[
				// match using object query
				{ match: { id: "Funded" }, id: "gradientGreen" },
				// match using function
				{ match: "*", id: "gradientBlue" },
			]}
			legends={[
				{
					anchor: "bottom",
					direction: "row",
					justify: false,
					translateX: 0,
					translateY: 72,
					itemsSpacing: 0,
					itemDirection: "left-to-right",
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 0.75,
					symbolSize: 12,
					symbolShape: "circle",
					symbolBorderColor: "rgba(0, 0, 0, .5)",
					toggleSerie: true,
					itemTextColor: "var(--text-color-secondary)",
				},
			]}
		/>
	);
}
