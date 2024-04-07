import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { AuthorName, PageProps, QueryParams } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Badge } from "@/shadcn/ui/badge";
import Select from "react-select";
import { Search } from "lucide-react";
import { Research } from "@/types";
import { Paginate } from "@/Components/Paginate";

export default function Index({
  auth,
  researches,
  authors,
  years,
  queryParams = {},
}: PageProps) {
  queryParams = queryParams || {};

  const searchParamsUpdate = (
    name: string,
    value: string | string[] | null
  ) => {
    const newQueryParams = { ...queryParams }; // Create a new object to avoid mutating the original queryParams

    if (name === "author" || name === "year") {
      newQueryParams[name] = Array.isArray(value)
        ? value.join(",")
        : value?.toString() ?? null;
    } else {
      newQueryParams[name] = value?.toString() ?? null;
    }

    // Remove the property from newQueryParams if the value is null
    if (newQueryParams[name] === null) {
      delete newQueryParams[name];
    }

    if (newQueryParams.author === "") {
      delete newQueryParams.author;
    }

    if (newQueryParams.year === "") {
      delete newQueryParams.year;
    }

    // Construct the query string
    const queryString = Object.keys(newQueryParams)
      .filter((key) => key !== "page")
      .map((key) => `${key}=${encodeURIComponent(newQueryParams[key] ?? "")}`)
      .join("&");

    const url = `${route("researches.index")}?${queryString}`;
    router.get(url);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Researches" />
      <div className="flex flex-col gap-4 max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden  shadow-sm sm:rounded-lg p-4 flex">
          <div className="space-x-2 flex items-center">
            <Select
              isMulti
              className="w-48"
              placeholder="Author"
              value={authors.data
                .filter(
                  (author) =>
                    queryParams.author &&
                    queryParams.author.includes(author.user_id)
                )
                .map((author) => ({
                  value: author.user_id,
                  label: author.name,
                }))}
              onChange={(selectedOptions: any, actionMeta: any) =>
                searchParamsUpdate(
                  "author",
                  selectedOptions.map((option: any) => option.value).join(",")
                )
              }
              options={authors.data
                .sort((a: any, b: any) => {
                  // Ensure both a.name and b.name are strings before comparing
                  const nameA = a.name ? a.name.toString() : "";
                  const nameB = b.name ? b.name.toString() : "";
                  return nameA.localeCompare(nameB);
                })
                .map((author) => ({
                  value: author.user_id,
                  label: author.name,
                }))}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                control: (base) => ({
                  ...base,
                  minHeight: "40px",
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0 8px",
                }),
                singleValue: (base) => ({
                  ...base,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }),
              }}
            />
            <Select
              isMulti
              className="w-48"
              placeholder="Year"
              value={Object.values(years.data)
                .filter(
                  (year) =>
                    queryParams.year && queryParams.year.includes(year.year)
                )
                .map((year) => ({
                  value: year.year,
                  label: year.year,
                }))}
              onChange={(selectedOptions: any, actionMeta: any) =>
                searchParamsUpdate(
                  "year",
                  selectedOptions.map((option: any) => option.value).join(",")
                )
              }
              options={Object.values(years.data)
                .sort((a: any, b: any) => b.year - a.year)
                .map((year) => ({
                  value: year.year,
                  label: year.year,
                }))}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
                control: (base) => ({
                  ...base,
                  minHeight: "40px",
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0 8px",
                }),
                singleValue: (base) => ({
                  ...base,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }),
              }}
            />
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

        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex flex-col gap-8">
          {researches.data.map((research: Research) => (
            <div key={research.id} className="research-item">
              <h2 className="text-xl font-bold mb-2">
                <Link
                  href={route("researches.show", research.id)}
                  className="hover:underline"
                >
                  {research.title}
                </Link>
              </h2>
              <p className="text-gray-800 mb-2 line-clamp-3">
                <span className="text-sm font-bold">
                  {research.publish_date}
                </span>
                | {research.research_classification} |{" "}
                {research.publication_status}
              </p>
              <p className="text-gray-800 mb-4 line-clamp-3">
                {research.abstract}
              </p>
              <ul className="flex flex-wrap gap-2">
                {Array.isArray(Object.values(research.authors)) &&
                  Object.values(research.authors).map((author) => (
                    <li
                      className="cursor-pointer"
                      key={author.id}
                      onClick={() => searchParamsUpdate("author", author.id)}
                    >
                      <Badge>{author.name}</Badge>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex">
          <Paginate
            meta={researches?.meta}
            links={researches?.links}
            queryParams={queryParams}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
