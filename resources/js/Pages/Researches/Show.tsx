import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function Page({ auth, research }: PageProps) {
  console.log(research);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {research.data.title || "nani"}
        </h2>
      }
    >
      <Head title="Research" />
      <div className="flex flex-col gap-4 max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden  shadow-sm sm:rounded-lg p-4 flex">
          <div className="space-x-2 flex items-center">nani</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
