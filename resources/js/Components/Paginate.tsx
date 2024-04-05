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
  console.log(meta);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={links.prev} preserveScroll />
        </PaginationItem>
        {meta.links.slice(1, 11).map((link: any) =>
          link.label === "Next &raquo;" ? null : (
            <PaginationItem>
              <PaginationLink
                preserveScroll
                href={link.url}
                isActive={link.active}
              >
                {link.label === "..." ? <PaginationEllipsis /> : link.label}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {meta.links.length > 12 && (
          <PaginationItem>
            <PaginationLink
              preserveScroll
              href={meta.links[meta.links.length - 2].url}
              isActive={meta.links[meta.links.length - 2].active}
            >
              {meta.links[meta.links.length - 2].label}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext href={links.next} preserveScroll />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
