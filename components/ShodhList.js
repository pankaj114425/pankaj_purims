import Link from "next/link";
import Card from "./UI/Card";
import CardContent from "./UI/CardContent";
import DocChips from "./docChips";

export default async function ShodhList({ data, page = 1, pageSize = 25, total = null, ...props }) {
	let docsCount = data.count;
	return (
		<div {...props}>
			<div>
				<CardContent>
					<h2 className="pb-1">
						{total == 0
							? "No Thesis Found!"
							: `Viewing ${(page - 1) * pageSize + 1} to ${Math.min(page * pageSize, docsCount)} Thesis`}
					</h2>
					{total ? <span>{total} Documents found</span> : "Try changing the filters"}
				</CardContent>
			</div>
			{data.results.map((shodh, i) => (
				<Card className="my-5">
					<CardContent className="flex flex-row p-2 py-4">
						<div className="flex-1">
							<a className="doc-link block pr-8" href={shodh._id}>
								<div className="text-sm">{shodh["dc:type:degree"] || ""}</div>
								<div className="doc-title text-xl serif">{shodh["dc:title"]}</div>
							</a>
							<div className="text-base">{shodh["dc:creator:researcher"]}</div>
							<div className="text-base">Guided by: {shodh["dc:contributor:guide"]}</div>
							<div>Date Awarded: {shodh["dc:date:awarded"]}</div>
							<div>
								Department:{" "}
								<Link className="link" href={`/dept/${shodh.dept}`}>
									{shodh.dept}
								</Link>
							</div>
							<DocChips data={shodh} className="flex flex-wrap flex-row gap-2 mt-2" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
