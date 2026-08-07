"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
}

export function Paginations({ totalPages, currentPage = 1 }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryPage = Number(searchParams.get("page"));
  const validCurrentPage = Math.max(
    1,
    Math.min(
      isNaN(queryPage) || queryPage <= 0 ? currentPage : queryPage,
      totalPages || 1,
    ),
  );

  if (!totalPages || totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (validCurrentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (validCurrentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      validCurrentPage - 1,
      validCurrentPage,
      validCurrentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = generatePagination();

  return (
    <Pagination className="my-6 select-none">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={
              validCurrentPage > 1 ? createPageURL(validCurrentPage - 1) : "#"
            }
            aria-disabled={validCurrentPage <= 1}
            tabIndex={validCurrentPage <= 1 ? -1 : undefined}
            className={
              validCurrentPage <= 1
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : "hover:bg-accent transition-colors"
            }
          />
        </PaginationItem>

        {/* Dynamic Page Numbers */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const isPageActive = validCurrentPage === Number(page);

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={isPageActive}
                className={
                  isPageActive
                    ? "font-semibold shadow-xs"
                    : "hover:bg-accent transition-colors"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={
              validCurrentPage < totalPages
                ? createPageURL(validCurrentPage + 1)
                : "#"
            }
            aria-disabled={validCurrentPage >= totalPages}
            tabIndex={validCurrentPage >= totalPages ? -1 : undefined}
            className={
              validCurrentPage >= totalPages
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : "hover:bg-accent transition-colors"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginations;
