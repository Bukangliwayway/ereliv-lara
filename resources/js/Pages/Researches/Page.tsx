import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { AuthorName, PageProps, QueryParams } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Research } from "@/types";
import { Paginate } from "@/Components/Paginate";

const initialQueryParams: QueryParams = {
  author: null,
  keyword: null,
  year: null,
};

export default function Page({
  auth,
  researches,
  authors,
  years,
  queryParams = {},
}: PageProps) {
  queryParams = queryParams || {};

  const [params, setParams] = useState<QueryParams | null>(initialQueryParams);

  // const searchParamsUpdate = (name: string, value: string | null) => {
  //   setParams((prevParams) => ({
  //     ...prevParams,
  //     [name]: value,
  //   }));

  //   router.get(route("research.index"), params);
  // };

  const searchParamsUpdate = (name: string, value: string | null) => {
    queryParams[name] = value;

    router.get(route("researches.index"), queryParams);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Researches" />
      <div className="flex flex-col gap-4 max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden  shadow-sm sm:rounded-lg p-4 flex">
          <div className="space-x-2 flex">
            <Select
              onValueChange={(value) => searchParamsUpdate("author", value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                {authors.data
                  .sort((a: any, b: any) => {
                    // Ensure both a.name and b.name are strings before comparing
                    const nameA = a.name ? a.name.toString() : "";
                    const nameB = b.name ? b.name.toString() : "";
                    return nameA.localeCompare(nameB);
                  })
                  .map((author) => (
                    <SelectItem
                      key={author.user_id}
                      value={author.user_id}
                      defaultValue={queryParams.author ?? undefined}
                    >
                      {author.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => searchParamsUpdate("year", value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(years.data)
                  .sort((a: any, b: any) => b.year - a.year)
                  .map((value: any, index: number) => (
                    <SelectItem
                      key={index}
                      value={value.year}
                      defaultValue={queryParams.year ?? undefined}
                    >
                      {value.year}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-1/3 items-center space-x-2 ml-auto">
            <Input
              id={"keyword"}
              type="text"
              placeholder="Keywords"
              defaultValue={queryParams.keyword ?? undefined}
            />
            <Button
              type="submit"
              onClick={() => {
                const keywordInput = document.getElementById(
                  "keyword"
                ) as HTMLInputElement | null;
                searchParamsUpdate("keyword", keywordInput?.value || null);
              }}
            >
              <Search size={15} />
            </Button>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex flex-col gap-5">
          {researches.data.map((research: Research) => (
            <div key={research.id} className="research-item">
              <h2>Title: {research.title}</h2>
              <p>Abstract: {research.abstract}</p>
              <p>Publication Status: {research.publication_status}</p>
              <p>Research Classification: {research.research_classification}</p>
              <p>Publish Date: {research.publish_date}</p>
              <p>Authors:</p>
              <ul>
                {research.authors.map((author, index) => (
                  <li key={index}>{author}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex">
          <Paginate meta={researches?.meta} links={researches?.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
