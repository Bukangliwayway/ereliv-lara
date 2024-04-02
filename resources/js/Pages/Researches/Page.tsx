import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { AuthorName, PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import React from "react";
import { Search } from "lucide-react";
import { Research } from "@/types";
import { Paginate } from "@/Components/Paginate";

export default function Page({ auth, researches, authors, years }: PageProps) {
  const valuesArray = Object.values(years.data);
  console.log(Array.isArray(valuesArray));

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Researches" />
      <div className="flex flex-col gap-4 max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden  shadow-sm sm:rounded-lg p-4 flex">
          <div className="space-x-2 flex">
            <Select>
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
                    <SelectItem key={author.user_id} value={author.user_id}>
                      {author.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(years.data)
                  .sort((a: any, b: any) => b.year - a.year)
                  .map((value: any, index: number) => (
                    <SelectItem key={index} value={value.year}>
                      {value.year}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-1/3 items-center space-x-2 ml-auto">
            <Input type="text" placeholder="Keywords" />
            <Button type="submit">
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
