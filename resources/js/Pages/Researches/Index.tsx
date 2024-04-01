import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Index({ auth, researches }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Researcher
        </h2>
      }
    >
      <Head title="Researches" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">Researches</div>
            <pre> {JSON.stringify(researches, undefined, 2)}</pre>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
