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

export default function Works({ auth, researches }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Researches" />
      <div className="flex flex-col gap-4 max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden  shadow-sm sm:rounded-lg p-4 flex">
          <Link href={route("researches.create")}>
            <Button>
              <Search size={15} />
            </Button>
          </Link>
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
                    <li className="cursor-pointer" key={author.id}>
                      <Badge>{author.name}</Badge>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
