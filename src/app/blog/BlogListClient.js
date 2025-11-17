"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpenIcon, Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const blogListRef = useRef(null);
  
  // Get initial page from URL or default to 1
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Filter and sort states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract unique categories and authors
  const categories = [...new Set(allPostsData.map(post => post.category))].sort();
  const authors = [...new Set(allPostsData.map(post => post.author))].sort();
  
  // Filter and sort posts
  const filteredAndSortedPosts = allPostsData
    .filter(post => {
      const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
      const authorMatch = selectedAuthor === "all" || post.author === selectedAuthor;
      const searchMatch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && authorMatch && searchMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  
  const totalPages = Math.ceil(filteredAndSortedPosts.length / pageSize);

  const pagedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Track page view on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Blog List',
        page_location: window.location.href,
        event_category: 'blog',
        event_label: 'blog_list_loaded',
        total_posts: allPostsData.length,
        filtered_posts: filteredAndSortedPosts.length,
        current_page: currentPage,
        selected_category: selectedCategory,
        selected_author: selectedAuthor,
        sort_by: sortBy,
        search_query: searchQuery
      });
    }
  }, [allPostsData.length, filteredAndSortedPosts.length, currentPage, selectedCategory, selectedAuthor, sortBy, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Update URL with new page parameter
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    
    // Scroll to top of blog list
    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    
    // Track pagination
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'pagination', {
        event_category: 'blog',
        event_label: 'page_navigation',
        page_number: page,
        total_pages: totalPages
      });
    }
  };

  // Update current page when URL changes
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page')) || 1;
    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, [searchParams, currentPage]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedAuthor, sortBy, searchQuery]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedAuthor("all");
    setSortBy("newest");
    setSearchQuery("");
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== "all" || selectedAuthor !== "all" || searchQuery !== "";

  return (
    <div ref={blogListRef}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-6 text-center">
        OD2 LATEST BLOGS
      </h1>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar - Always visible */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search blogs by title, description, keywords, author, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-sm sm:text-base"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        {/* Filter Toggle Button - Mobile */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                {[selectedCategory !== "all" && "Category", selectedAuthor !== "all" && "Author"].filter(Boolean).length}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all filters
            </Button>
          )}
        </div>
        
        {/* Filter Controls */}
        <div className={`space-y-4 lg:space-y-0 lg:block ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Author Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Author
                </label>
                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Authors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Authors</SelectItem>
                    {authors.map(author => (
                      <SelectItem key={author} value={author}>{author}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort Control */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Sort by Date
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Clear Filters Button - Desktop */}
              <div className="space-y-2 hidden lg:block">
                <label className="text-sm font-medium text-transparent">
                  Actions
                </label>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  disabled={!hasActiveFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold">{filteredAndSortedPosts.length}</span> of <span className="font-semibold">{allPostsData.length}</span> blogs
                  {searchQuery && (
                    <>
                      {" "}for &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
                    </>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      Category: {selectedCategory}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCategory("all")}
                        className="ml-1 p-0 h-auto w-auto"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                  {selectedAuthor !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      Author: {selectedAuthor}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAuthor("all")}
                        className="ml-1 p-0 h-auto w-auto"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {pagedPosts.map(
          ({ id, title, date, author, authorLink, keywords, category, description }) => (
            <Link
              href={`/blog/${id}`}
              key={id}
              className="w-full"
              onClick={() => {
                // Track blog post click
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'blog_post_click', {
                    event_category: 'blog',
                    event_label: 'post_clicked',
                    blog_title: title,
                    blog_id: id,
                    blog_category: category,
                    page_number: currentPage
                  });
                }
              }}
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
    </div>
  );
}
