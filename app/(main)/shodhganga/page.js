import api from "@/utils/api";
import DocumentList from "@/components/documentList";
import DocumentFilters from "@/components/documentFilter";
import PageSelect from "@/components/PageSelect";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import Link from "next/link";
import DocChips from "@/components/docChips";
import { getDepartmentNames, getDepts, getShodh } from "@/utils/mongo";
import ShodhgangaFilters from "@/components/shodhgangaFilter";
import ShodhList from "@/components/ShodhList";
import SearchBar from "@/components/searchBar";

export default async function Shodhganga({ searchParams = { page: 1 } }) {
  let page = parseInt(searchParams.page) || 1;
  if (page < 1) {
    throw "Invalid page number!";
  }
  let urlParams = new URLSearchParams(searchParams);
  const ganga = await getShodh({...searchParams });
  const depts = await getDepartmentNames();
  return (
    <main id="main" className="grid-12 max-w-7xl mx-auto">
      <div className="col-span-12 text-center my-4">
        <div className="huge-text">Shodhganga Thesis</div>
      </div>
      <ShodhgangaFilters deptData={depts} className="   col-span-4 row-span-3" />
      <div className="col-span-8 grid-12">
        <SearchBar urlParams={urlParams} value={searchParams.s} />
        <ShodhList
          className="col-span-12"
          data={ganga}
          total={ganga.count}
          page={page}
        />
        <PageSelect
          className={"col-span-12"}
          urlParams={urlParams}
          page={page}
          docCount={ganga.count}
        />
      </div>
    </main>
  );
}
