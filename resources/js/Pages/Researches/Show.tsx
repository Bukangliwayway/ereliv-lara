import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Badge } from "@/shadcn/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Ellipsis } from "lucide-react";

export default function Show({ auth, research }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Research" />
      <div className="max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 relative">
          <div className="space-x-2 flex flex-col items-center">
            <div className="flex gap-4 absolute top-2 right-5">
              {research.data.editable && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={route("researches.edit", research.data.id)}>
                      <DropdownMenuItem>
                        <div className="w-full text-center">Edit</div>
                      </DropdownMenuItem>
                    </Link>
                    <AlertDialog>
                      <DropdownMenuItem>
                        <AlertDialogTrigger
                          className="w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Delete
                        </AlertDialogTrigger>
                      </DropdownMenuItem>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your research paper from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => {
                              router.delete(
                                route("researches.destroy", research.data.id)
                              );
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
                <Badge>{research.data.research_classification}</Badge>
                <Badge>{research.data.publication_status}</Badge>
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
