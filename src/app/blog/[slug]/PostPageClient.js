"use client";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkIcon, Calendar, User, Share2, Clock } from "lucide-react";
import Link from "next/link";

const PostPageClient = ({ frontMatter, content, slug, allPosts }) => {
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

  // Get related blogs (same category first, then latest)
  const getRelatedBlogs = () => {
    if (!allPosts || !frontMatter) return [];

    // Filter out current blog
    const otherPosts = allPosts.filter(post => post.id !== slug);

    // Get posts from same category
    const sameCategoryPosts = otherPosts.filter(
      post => post.category && post.category.toLowerCase() === frontMatter.category?.toLowerCase()
    );

    // Get latest posts if we need more
    const latestPosts = otherPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Combine: same category first, then latest (avoiding duplicates)
    const relatedBlogs = [...sameCategoryPosts];

    // Add latest posts if we don't have enough from the same category
    for (const post of latestPosts) {
      if (relatedBlogs.length >= 5) break;
      if (!relatedBlogs.some(blog => blog.id === post.id)) {
        relatedBlogs.push(post);
      }
    }

    return relatedBlogs.slice(0, 5);
  };

  const relatedBlogs = getRelatedBlogs();

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

  // Calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div className="w-full max-w-none py-8">
      <Card className="max-w-4xl mx-auto !w-full border-none shadow-none bg-transparent">
        <CardHeader className="px-4 sm:px-6 lg:px-8  text-center">
          <div className="flex flex-col gap-2 items-center">
            <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
              {frontMatter.category || "Blog"}
            </Badge>
            <h1 className="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-foreground">
              {frontMatter.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{frontMatter.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <Link
                  href={frontMatter.authorLink && !/^https?:\/\//i.test(frontMatter.authorLink) ? `https://${frontMatter.authorLink}` : frontMatter.authorLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline-offset-4 hover:underline"
                  onClick={handleAuthorLinkClick}
                >
                  {frontMatter.author}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8">
          <div
            className="blog-post-content prose prose-base sm:prose-lg dark:prose-invert max-w-none mx-auto
              prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-lg
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </CardContent>
      </Card>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <Card className="p-4 sm:p-5 lg:p-6 rounded-3xl mt-6">
          <CardHeader className="px-0 pb-4">
            <h3 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight">
              Related Blogs
            </h3>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="grid gap-4">
              {relatedBlogs.map((blog, index) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="block group"
                  onClick={() => {
                    // Track related blog click
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'related_blog_click', {
                        event_category: 'blog',
                        event_label: 'related_blog_clicked',
                        clicked_blog: blog.id,
                        source_blog: slug,
                        position: index + 1
                      });
                    }
                  }}
                >
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow group-hover:border-primary/50">
                    <h4 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{blog.author}</span>
                      </div>
                      {blog.category && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {blog.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Share Section */}
      <Card className="p-4 sm:p-5 lg:p-6 rounded-3xl mt-6">
        <CardHeader className="px-0 pb-4">
          <h3 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share this Post
          </h3>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="gap-1 hover:bg-[#1DA1F2] hover:text-white hover:border-transparent transition-colors"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontMatter.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 9.68 9.68 0 01-7.033-3.568 4.1 4.1 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              Twitter
            </Button>
            <Button
              variant="outline"
              className="gap-1 hover:bg-[#0A66C2] hover:text-white hover:border-transparent transition-colors"
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="gap-1 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-colors"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              Facebook
            </Button>
            <Button
              variant="outline"
              className="gap-1 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-colors"
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(frontMatter.title)}%20${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.535c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              WhatsApp
            </Button>
          </div>
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