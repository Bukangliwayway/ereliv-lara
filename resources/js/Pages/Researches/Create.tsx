import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import { CheckboxInput } from "@/Components/CheckboxInput";
import { useState } from "react";

export default function Create({ auth }: PageProps) {
  const { data, setData, post, errors, reset } = useForm({
    title: "",
    introduction: "",
    methodology: "",
    result: "",
    abstract: "",
    discussion: "",
    conclusion: "",
    keywords: "",
    publication_status: "",
    research_classification: "",
    publish_date: "",
  });

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    post(route("researches.store"));
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
                <CheckboxInput
                  name="authors"
                  id="author1"
                  value="author1"
                  data={data}
                  setData={setData}
                  className="mt-1"
                />
                <label htmlFor="author1">Author 1</label>
                <CheckboxInput
                  name="authors"
                  id="author2"
                  value="author2"
                  data={data}
                  setData={setData}
                  className="mt-1"
                />
                <label htmlFor="author2">Author 2</label>
                <CheckboxInput
                  name="authors"
                  id="author3"
                  value="author3"
                  data={data}
                  setData={setData}
                  className="mt-1"
                />
                <label htmlFor="author3">Author 3</label>
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
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
              <InputError
                message={errors.research_classification}
                className="mt-2"
              />
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
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
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
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
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
