import Icon from "@/icons/Icon";
import Chip from "./UI/Chip";
import OpenInNewIcon from "@/icons/OpenInNewIcon";
import Link from "next/link";

export default function DocChips({ data = {}, ...props }) {
	return (
		<div {...props}>
			{data.doi && (
				<Chip component="a" className={"doi-chip"} target="_blank" href={`https://doi.org/${data.doi}`} icon={<OpenInNewIcon />}>
					doi
				</Chip>
			)}
			{data.scopusID && (
				<Chip
					component="a"
					target="_blank"
					className="scopus-chip"
					icon={<OpenInNewIcon />}
					href={`https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=${data.scopusID}&origin=inward`}
				>
					Scopus
				</Chip>
			)}
			{data.pubmedID && (
				<Chip
					component="a"
					target="_blank"
					className="pubmed-chip"
					icon={<OpenInNewIcon />}
					href={`https://pubmed.ncbi.nlm.nih.gov/${data.pubmedID}/`}
				>
					PubMed
				</Chip>
			)}
			{data.unpaywall && (
				<Chip
					component="a"
					target="_blank"
					className="unpaywall-chip"
					icon={<OpenInNewIcon />}
					href={data.unpaywall.url}
				>
					Download
				</Chip>
			)}
			{data["dc:identifier:uri"] && (
				<Chip
					component="a"
					target="_blank"
					className="scopus-chip"
					icon={<OpenInNewIcon />}
					href={data["dc:identifier:uri"]}
				>
					Shodhganga
				</Chip>
			)}
		</div>
	);
}
