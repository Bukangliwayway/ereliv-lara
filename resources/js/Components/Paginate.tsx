import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
export function Paginate({ meta, links, queryParams }: any) {
  const queryString = Object.keys(queryParams)
    .filter((key) => key !== "page")
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] ?? "")}`)
    .join("&");

  return (
    <Pagination>
      <PaginationContent>
        {links.prev && (
          <PaginationItem>
            <PaginationPrevious
              href={`${links.prev ? links.prev : ""}${
                queryString ? "&" + queryString : ""
              }`}
              preserveScroll
            />
          </PaginationItem>
        )}

        {meta.links.slice(1, 11).map((link: any) =>
          link.label === "Next &raquo;" ? null : (
            <PaginationItem>
              <PaginationLink
                preserveScroll
                href={`${link.url ? link.url : ""}${
                  queryString ? "&" + queryString : ""
                }`}
                isActive={link.active}
              >
                {link.label === "..." ? <PaginationEllipsis /> : link.label}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {meta.links.length > 12 && (
          <>
            <PaginationItem>
              <PaginationLink preserveScroll href={"#"}>
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                preserveScroll
                href={`${meta.links[meta.links.length - 2].url}&${queryString}`}
                isActive={meta.links[meta.links.length - 2].active}
              >
                {meta.links[meta.links.length - 2].label}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {links.next && (
          <PaginationItem>
            <PaginationNext
              href={`${links.next ? links.next : ""}${
                queryString ? "&" + queryString : ""
              }`}
              preserveScroll
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
