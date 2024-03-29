import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "sonner";
import { useLoadingStore } from "@/store";
import { Button } from "@/shadcn/ui/button";
import { LoadingScreen } from "@/Components/LoadingScreen";

export default function Dashboard({ auth }: PageProps) {
    const toggleLoading = useLoadingStore((state) => state.toggleIsLoading);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Reader
                </h2>
            }
        >
            <Head title="Reader" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Only the Reader shall access this
                        </div>
                        <Button
                            variant="outline"
                            onClick={() =>
                                toast("Event has been created", {
                                    description:
                                        "Sunday, December 03, 2023 at 9:00 AM",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    },
                                })
                            }
                        >
                            Show Toast
                        </Button>
                        <Button onClick={toggleLoading}>click me!</Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
