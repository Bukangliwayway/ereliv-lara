import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import { Link } from "@inertiajs/react";

import { PageProps } from "@/types";

export function Paginate({ meta, links }: any) {
  console.log(meta.links[meta.links.length - 2]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={links.prev} />
        </PaginationItem>
        {meta.links.slice(1, 11).map((link: any) => (
          <PaginationItem>
            <PaginationLink preserveScroll href={link.url} isActive={link.active}>
              {link.label == "..." ? <PaginationEllipsis /> : link.label}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={meta.links[meta.links.length - 2].url}
            isActive={meta.links[meta.links.length - 2].active}
          >
            {meta.links[meta.links.length - 2].label}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href={links.next} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
