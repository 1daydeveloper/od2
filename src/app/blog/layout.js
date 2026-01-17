import { BellDot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import "@/styles/blog.css";

export default function BlogLayout({ children, frontMatter, content }) {
  return (
    <div className="w-full max-w-none">
      <div className="px-2 sm:px-4">{children}</div>
      <Card className="w-full bg-gradient-to-r py-6 from-primary via-primary to-primary my-8 rounded-lg shadow-lg">
        <CardContent className="px-4 sm:px-6">
          <div className="max-w-screen-lg mx-auto text-center text-primary-foreground">
            <TypographyH2 className="mb-4 text-xl sm:text-2xl lg:text-3xl text-primary-foreground">
              Ready to Share Your Knowledge? Publish Your Blog Today!
            </TypographyH2>
            <TypographyP className="mb-6 text-sm sm:text-base lg:text-lg text-primary-foreground/90">
              Writing blog posts on technical topics helps you grow your audience,
              improves SEO, and contributes to the developer community. Share your
              experience with us!
            </TypographyP>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="secondary" className="bg-background text-foreground hover:bg-muted">
                <a href="/blog/od2-blog-submission-guidelines">
                  View Guidelines
                </a>
              </Button>
              <Button asChild variant="default" className="bg-foreground text-background hover:bg-foreground/90">
                <a target="blank" href="https://forms.gle/DatwRJyuUAJvCcw67">
                  Submit Your Blog
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="mt-3 rounded-lg bg-gradient-to-r from-muted via-muted to-muted">
        <CardContent className="px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-5 justify-center items-center p-4 sm:p-5">
            <div className="my-auto text-lg">
              <BellDot size={48} className="mx-auto sm:mx-0 text-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-base sm:text-lg mb-3 text-foreground">
                Get Notification on New Latest Blogs
              </div>
              <div className="flex justify-center sm:justify-start">
                <Button className="bg-foreground text-background hover:bg-foreground/90 flex items-center gap-1 font-extrabold px-4 py-3 rounded-md transition-all">
                  Subscribe For Free
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
      <section className="maincard mt-2">
        <Card className="mt-4 border-4 border-border shadow-xl p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center text-center">
          <CardContent className="px-2 sm:px-4">
            <TypographyP className="text-lg sm:text-xl md:text-2xl font-bold border-b-4 border-b-border mb-4">
              Stay in Touch With Us
            </TypographyP>
            <ul className="flex flex-row items-center justify-center text-center mt-3 sm:mt-5 gap-4 sm:gap-6">
              <li>
                <a
                  href="https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA"
                  target="_blank"
                  aria-label="Share on Youtube"
                  className="blog-social-icon"
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/onedaydevelopers/"
                  target="_blank"
                  aria-label="Share on Instagram"
                  className="blog-social-icon"
                >
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div >
  );
}

export const metadata = {
  title: "OD2 Blog - Technical Tutorials and Insights",
  description:
    "Welcome to OD2 Blog, your go-to resource for technical tutorials, quick solutions, and expert insights on software development, desktop applications, Android development, and more.",
  openGraph: {
    title: "OD2 Blog - Technical Tutorials and Insights",
    description:
      "Discover in-depth tutorials, guides, and project solutions from OD2 Blog. Specializing in software development and delivering quality content for developers.",
    url: "https://www.od2.in/blog",
    images: [
      {
        url: "https://www.od2.in/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Blog Banner - Technical Tutorials and Insights",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OD2 Blog - Your Technical Resource Hub",
    description:
      "Get the latest tutorials, quick solutions, and expert advice on software development from OD2 Blog.",
    images: ["https://www.od2.in/odd.png"],
  },
};
