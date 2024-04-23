import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import MultiSelectDropdown from "@/Components/MultiselectDropdown";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Publish({
  auth,
  authorsSelection,
  research,
}: PageProps) {
  const { data, setData, post, put, errors, reset } = useForm({
    id: research ? research?.data?.id : "",
    title: research ? research?.data?.title : "",
    introduction: research ? research?.data?.introduction : "",
    methodology: research ? research?.data?.methodology : "",
    result: research ? research?.data?.result : "",
    abstract: research ? research?.data?.abstract : "",
    discussion: research ? research?.data?.discussion : "",
    conclusion: research ? research?.data?.conclusion : "",
    keywords: research ? research?.data?.keywords : "",
    publication_status: research ? research?.data?.publication_status : "", // Add a fallback value here
    research_classification: research
      ? research?.data?.research_classification
      : "", // Add a fallback value here
    publish_date: research
      ? format(new Date(research?.data?.publish_date), "yyyy-MM-dd")
      : "",
    modifier_id: auth.user.id,
    authors: research
      ? Object.values(research?.data?.authors).map((author: any) => author.id)
      : [auth.user.id],
  });

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    research?.data && Object.keys(research.data).length > 0
      ? put(route("researches.update", research.data.id))
      : post(route("researches.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Publish Research Paper
        </h2>
      }
    >
      <Head title="Publish Research" />
      <div className="max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 relative">
          <form
            onSubmit={onSubmit}
            method="PUT"
            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
          >
            <div>
              <InputLabel htmlFor="title" value="Research Title" />
              <TextInput
                id="title"
                type="text"
                name="title"
                value={data.title}
                className="mt-1 block w-full"
                onChange={(e) => setData("title", e.target.value)}
              />
              <InputError message={errors.title} className="mt-2" />
            </div>

            <div className="mt-10">
              <InputLabel htmlFor="authors" value="Authors" />
              <div className="flex flex-wrap gap-2">
                <MultiSelectDropdown
                  name="authors"
                  options={authorsSelection}
                  data={data}
                  setData={setData}
                />
              </div>
            </div>

            <div className="mt-10">
              <InputLabel htmlFor="publish_date" value="Publish Date" />

              <TextInput
                id="publish_date"
                type="date"
                name="publish_date"
                value={data.publish_date}
                className="mt-1 block w-full"
                onChange={(e) => setData("publish_date", e.target.value)}
              />

              <InputError message={errors.publish_date} className="mt-2" />
            </div>

            <div className="mt-10">
              <InputLabel htmlFor="introduction" value="Introduction" />
              <TextAreaInput
                id="introduction"
                name="introduction"
                value={data.introduction}
                className="mt-1 block w-full"
                onChange={(e: { target: { value: string } }) =>
                  setData("introduction", e.target.value)
                }
              />

              <InputError message={errors.introduction} className="mt-2" />
            </div>
            <div className="mt-10">
              <InputLabel htmlFor="methodology" value="Methodology" />
              <TextAreaInput
                id="methodology"
                name="methodology"
                value={data.methodology}
                className="mt-1 block w-full"
                onChange={(e: { target: { value: string } }) =>
                  setData("methodology", e.target.value)
                }
              />

              <InputError message={errors.methodology} className="mt-2" />
            </div>
            <div className="mt-10">
              <InputLabel htmlFor="result" value="Result" />
              <TextAreaInput
                id="result"
                name="result"
                value={data.result}
                className="mt-1 block w-full"
                onChange={(e: { target: { value: string } }) =>
                  setData("result", e.target.value)
                }
              />
              <InputError message={errors.result} className="mt-2" />
            </div>
            <div className="mt-10">
              <InputLabel htmlFor="abstract" value="Abstract" />
              <TextAreaInput
                id="abstract"
                name="abstract"
                value={data.abstract}
                className="mt-1 block w-full"
                onChange={(e: { target: { value: string } }) =>
                  setData("abstract", e.target.value)
                }
              />

              <InputError message={errors.abstract} className="mt-2" />
            </div>
            <div className="mt-10">
              <InputLabel htmlFor="discussion" value="Discussion" />
              <TextAreaInput
                id="discussion"
                name="discussion"
                value={data.discussion}
                className="mt-1 block w-full"
                onChange={(e: { target: { value: string } }) =>
                  setData("discussion", e.target.value)
                }
              />

              <InputError message={errors.discussion} className="mt-2" />
            </div>

            <div className="mt-10">
              <InputLabel htmlFor="conclusion" value="Conclusion" />
              <TextAreaInput
                id="conclusion"
                name="conclusion"
                value={data.conclusion}
                className="mt-1 block w-full"
                onChange={(e: { target: { value: string } }) =>
                  setData("conclusion", e.target.value)
                }
              />

              <InputError message={errors.conclusion} className="mt-2" />
            </div>

            <div className="mt-10">
              <InputLabel
                htmlFor="publication_status"
                value="Publication Status"
              />

              <SelectInput
                name="publication_status"
                id="publication_status"
                className="mt-1 block w-full p-2"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setData("publication_status", e.target.value)
                }
                value={data.publication_status || ""} // Add the value prop here
              >
                <option value="">Select Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Published">Published</option>
                <option value="Presented">Presented</option>
              </SelectInput>

              <InputError
                message={errors.publication_status}
                className="mt-2"
              />
            </div>

            <div className="mt-10">
              <InputLabel
                htmlFor="research_classification"
                value="Research Classification"
              />

              <SelectInput
                name="research_classification"
                id="research_classification"
                className="mt-1 block w-full p-2"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setData("research_classification", e.target.value)
                }
                value={data.research_classification || ""} // Add the value prop here
              >
                <option value="">Select Classification</option>
                <option value="Institutional Research">
                  Institutional Research
                </option>
                <option value="Self-Funded Research">
                  Self-Funded Research
                </option>
                <option value="Externally Funded Research">
                  Externally Funded Research
                </option>
              </SelectInput>

              <InputError
                message={errors.research_classification}
                className="mt-2"
              />
            </div>
            <div className="mt-10">
              <InputLabel htmlFor="keywords" value="Keywords" />
              <TextAreaInput
                id="keywords"
                name="keywords"
                value={data.keywords}
                className="mt-1 block w-full"
                onChange={(e: { target: { value: string } }) =>
                  setData("keywords", e.target.value)
                }
              />

              <InputError message={errors.keywords} className="mt-2" />
            </div>

            <div className="mt-14 text-right">
              <Link
                href={route("researches.works")}
                className="bg-gray-100 py-1 px-10 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
              >
                Cancel
              </Link>
              <button className="bg-emerald-500 py-1 px-10 ml-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
