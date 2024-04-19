import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function Create({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Research" />
      <div className="max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 relative">
          yeyy
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
