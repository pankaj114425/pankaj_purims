import Link from "next/link";
import Card from "./UI/Card";
import CardContent from "./UI/CardContent";
import DocChips from "./docChips";

export default async function ProjectList({ data, page = 1, pageSize = 25, total = null, ...props }) {
	let docsCount = data.count;
	return (
		<div {...props}>
			<div>
				<CardContent>
					<h2 className="pb-1">
						{total == 0
							? "No Projects Found!"
							: `Viewing ${(page - 1) * pageSize + 1} to ${Math.min(
									page * pageSize,
									docsCount
							  )} Projects`}
					</h2>
					{total ? <span>{total} Projects found</span> : "Try changing the filters"}
				</CardContent>
			</div>
			{data.results.map((project, i) => (
				<Card key={i} className="my-5">
					<CardContent className="flex flex-row p-2 py-4">
						<div className="flex-1">
							<div className="border-l-4 pl-3">
								<div className="text-sm uppercase">{project.status}</div>
								<div className="doc-title text-3xl font-bold">
									<Link href={`/projects/${project._id}`} className="link">{project.title}</Link>
								</div>
								<div>
									<Link className="link" href={`/dept/${project.department}`}>
										{project.department}
									</Link>
								</div>
							</div>
							<div style={{height: "15px",overflow: "hidden"}} className="mt-4">{project.description}</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
