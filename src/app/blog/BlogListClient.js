"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BlogListClient({ allPostsData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSize = 5;
  
  // Get initial page from URL or default to 1
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(allPostsData.length / pageSize);

  const pagedPosts = allPostsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Update URL with new page parameter
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Update current page when URL changes
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page')) || 1;
    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParams, currentPage]);

  return (
    <>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-6 text-center">
        OD2 LATEST BLOGS
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {pagedPosts.map(
          ({ id, title, date, author, authorLink, keywords, category, description }) => (
            <Link
              href={`/blog/${id}`}
              key={id}
              className="w-full"
            >
              <Card className="w-full blog-card-hover">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-extrabold leading-tight mb-3">
                    {title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 font-bold">
                      <Badge variant="destructive" className="text-xs sm:text-sm w-fit">
                        Publish Date: {date}
                      </Badge>
                      <Badge variant="outline" className="text-xs sm:text-sm w-fit flex items-center gap-1">
                        Author: {author}
                      </Badge>
                      <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
                        Category: {category}
                      </Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base line-clamp-3 mb-4 text-muted-foreground">{description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="flex items-center gap-2 font-extrabold w-auto px-4 py-2 rounded-xl">
                    <BookOpenIcon className="h-4 w-4" />
                    <span>Read This Blog</span>
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          )
        )}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent className="blog-pagination">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="text-sm sm:text-base"
                onClick={e => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  className="text-sm sm:text-base min-w-[2.5rem] sm:min-w-[3rem]"
                  isActive={currentPage === idx + 1}
                  onClick={e => {
                    e.preventDefault();
                    handlePageChange(idx + 1);
                  }}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                className="text-sm sm:text-base"
                onClick={e => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
