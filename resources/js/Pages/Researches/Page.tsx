import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import React from "react";
import { Search } from "lucide-react";
import { Research } from "@/types";
import { Paginate } from "@/Components/Paginate";

export default function Page({ auth, researches }: PageProps) {
  console.log(researches);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Researches" />
      <div className="flex flex-col gap-4 max-w-2xl mx-auto py-4">
        <div className="bg-white overflow-hidden  shadow-sm sm:rounded-lg p-4 flex">
          <div className="space-x-2 flex">
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">
                  Mountain Standard Time (MST)
                </SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="akst">
                  Alaska Standard Time (AKST)
                </SelectItem>
                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="mst">
                  Mountain Standard Time (MST)
                </SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="akst">
                  Alaska Standard Time (AKST)
                </SelectItem>
                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-1/3 items-center space-x-2 ml-auto">
            <Input type="text" placeholder="Keywords" />
            <Button type="submit">
              <Search size={15} />
            </Button>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex flex-col gap-5">
          {researches.data.map((research: Research) => (
            <div key={research.id} className="research-item">
              <h2>Title: {research.title}</h2>
              <p>Abstract: {research.abstract}</p>
              <p>Publication Status: {research.publication_status}</p>
              <p>Research Classification: {research.research_classification}</p>
              <p>Publish Date: {research.publish_date}</p>
              <p>Authors:</p>
              <ul>
                {research.authors.map((author, index) => (
                  <li key={index}>{author}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 flex">
          <Paginate meta={researches?.meta} links={researches?.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
