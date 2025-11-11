"use client";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

const PostPageClient = ({ frontMatter, content, slug }) => {
  // Track blog post page view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && frontMatter) {
      window.gtag('event', 'page_view', {
        page_title: frontMatter.title,
        page_location: window.location.href,
        event_category: 'blog',
        event_label: 'blog_post_viewed',
        blog_title: frontMatter.title,
        blog_id: slug,
        blog_category: frontMatter.category,
        blog_author: frontMatter.author
      });
    }
  }, [frontMatter, slug]);

  const convertToHashTags = (text) => {
    return text.split(",").map((word, index) => {
      if (word) {
        return (
          <Badge 
            key={index} 
            variant="secondary" 
            className="text-sm sm:text-base lg:text-lg rounded-full px-2 sm:px-3 py-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => {
              // Track keyword click
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'keyword_click', {
                  event_category: 'blog',
                  event_label: 'keyword_clicked',
                  keyword: word.trim(),
                  blog_id: slug
                });
              }
            }}
          >
            {word.trim()}
          </Badge>
        );
      }
      return null;
    });
  };

  const handleAuthorLinkClick = () => {
    // Track author link click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'author_link_click', {
        event_category: 'blog',
        event_label: 'author_profile_clicked',
        author_name: frontMatter.author,
        author_link: frontMatter.authorLink,
        blog_id: slug
      });
    }
  };

  return (
    <div className="w-full max-w-none">
      <Card className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none mx-auto !w-full">
        <CardHeader className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap">
              <h1 className="scroll-m-20 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
                {frontMatter.title}
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <Badge variant="outline" className="text-sm lg:text-base mb-2 sm:mb-4 w-fit">
                {frontMatter.date}
              </Badge>
              <Link 
                href={frontMatter.authorLink && !/^https?:\/\//i.test(frontMatter.authorLink) ? `https://${frontMatter.authorLink}` : frontMatter.authorLink || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleAuthorLinkClick}
              >
                <Badge variant="outline" className="text-sm lg:text-base mb-2 sm:mb-4 w-fit flex items-center gap-1 hover:bg-outline/80">
                  {frontMatter.authorLink && <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
                  {frontMatter.author}
                </Badge>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8">
          <div
            className="blog-post-content blog-content-wrapper prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </CardContent>
      </Card>
      <Card className="flex flex-wrap gap-3 p-4 sm:p-5 lg:p-6 rounded-3xl mt-6">
        <CardHeader className="px-0 pb-2">
          <h3 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight">
            Keywords
          </h3>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <div className="flex flex-wrap mb-2 gap-2">
            {convertToHashTags(frontMatter.keywords)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPageClient;