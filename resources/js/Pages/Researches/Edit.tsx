import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function Edit({ auth, research }: PageProps) {
  console.log(research);
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Research" />
      <div className="max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 relative">
          <h1>{research.data.title}</h1>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
