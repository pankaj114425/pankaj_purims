import PageSelect from "@/components/PageSelect";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import DocChips from "@/components/docChips";
import { getAuthor, getShodh, getShodhAuthor } from "@/utils/mongo";
import ShodhgangaFilters from "@/components/shodhgangaFilter";
import ShodhList from "@/components/ShodhList";
import SearchBar from "@/components/searchBar";

export default async function AuthorShodh({ params = { auid: "" }, searchParams = { page: 1 } }) {
	const auid = params.auid;
	if (!auid) {
		throw "No ID given!";
	}
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	let urlParams = new URLSearchParams(searchParams);
	const a = await getAuthor(auid);

	const ganga = await getShodhAuthor({
		...searchParams,
		dept: a.dept,
		firstName:a.profile.firstName,
		lastName:a.profile.lastName
		
		// regexp: `(${a.profile.firstName})|(${a.profile.firstname} ${a.profile.lastName})|(${a.profile.lastName}, ${a.profile.firstName})`,
	});
	
	return (
		<>
			<ShodhgangaFilters className="col-span-4 row-span-2" />
			<div className="col-span-8 grid-12">
			<SearchBar className="" urlParams={urlParams} value={searchParams.s} />
			<ShodhList className="col-span-12" data={ganga} total={ganga.count} page={page} />
			<PageSelect className="col-span-12" urlParams={urlParams} page={page} docCount={ganga.count} />
			</div>
			
		</>
	);
}

function Thesis({ shodh }) {
	return (
		<Card className="my-5">
			<CardContent className="flex flex-row p-2 py-4">
				<div className="flex-1">
					<a className="doc-link pr-8 flex flex-col items-start" href={shodh._id}>
						<div className="text-sm">{shodh["dc:type:degree"] || ""}</div>
						<div className="doc-title text-xl serif">{shodh["dc:title"]}</div>
						<div className="text-base">{shodh["dc:creator:researcher"]}</div>
						<div className="text-base">Guided by: {shodh["dc:contributor:guide"]}</div>
						<div>Date Awarded: {shodh["dc:date:awarded"]}</div>
					</a>
					<DocChips data={shodh} className="flex flex-wrap flex-row gap-2 mt-2" />
				</div>
			</CardContent>
		</Card>
	);
}