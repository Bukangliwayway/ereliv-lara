import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export default function Page({ auth, research }: PageProps) {
  console.log(research);
  return (
    <AuthenticatedLayout
      user={auth.user}
      // header={
      //   <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      //     {research.data.title || "nani"}
      //   </h2>
      // }
    >
      <Head title="Research" />
      <div className="max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 relative">
          <div className="space-x-2 flex flex-col items-center">
            <div className="flex gap-4 absolute top-2 right-5">
              {!research.data.editable && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-bold mt-4 mb-1">
                {research.data.title}
              </h2>
              <p className="mb-2">
                {Array.isArray(Object.values(research.data.authors)) &&
                  Object.values(research.data.authors)
                    .map((author) => author.name)
                    .join(", ")}
              </p>
              <div className="flex gap-2 justify-end">
                <Badge>{research.data.publication_status}</Badge>
                <Badge>{research.data.research_classification}</Badge>
                <Badge>{research.data.publish_date}</Badge>
              </div>
            </div>
            <div className="flex gap-6 flex-col">
              <div>
                <h3 className="text-lg font-semibold mb-1">Introduction</h3>
                <p>{research.data.introduction}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Methodology</h3>
                <p>{research.data.methodology}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Result</h3>
                <p>{research.data.result}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Abstract</h3>
                <p>{research.data.abstract}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Discussion</h3>
                <p>{research.data.discussion}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Conclusion</h3>
                <p>{research.data.conclusion}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Keywords</h3>
                <p className="text-gray-800">
                  {research.data.keywords.split(",").join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
