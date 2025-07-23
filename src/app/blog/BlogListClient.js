"use client";
import { useState } from "react";
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
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allPostsData.length / pageSize);

  const pagedPosts = allPostsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="text-2x font-extrabold mb-4 text-center">
        OD2 LATEST BLOGS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
        {pagedPosts.map(
          ({ id, title, date, author, authorLink, keywords, category, description }) => (
            <Link
              href={`/blog/${id}`}
              key={id}
              className="w-full"
            >
              <Card className="w-full hover:scale-105 transition-transform duration-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-extrabold sm:text-3xl mb-2">
                    {title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap mb-3 font-bold gap-2">
                      <Badge variant="destructive">Publish Date: {date}</Badge>
                      <Link href={authorLink ? authorLink : "#"} target="_blank" rel="noopener noreferrer">
                        <Badge variant="outline" className="ml-2 flex gap-2">Author: {author}                                 {authorLink ? <LinkIcon className="inline mr-1" /> : ""}
                        </Badge>
                      </Link>
                      <Badge variant="secondary" className="ml-2">Category: {category}</Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base line-clamp-3 mb-2">{description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="flex gap-3 font-extrabold w-25 p-2 rounded-xl justify-center">
                    <BookOpenIcon />
                    <span className="self-center">Read This Blog</span>
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          )
        )}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
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
