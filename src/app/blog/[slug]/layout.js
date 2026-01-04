import path from "path";
import fs from "fs";
import matter from "gray-matter";

const defaultMetadata = {
  title: "OD2dd Blog - Technical Tutorials and Insights",
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
export async function getData(slug) {
  const postsDirectory = path.join(process.cwd(), "/posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content,
  };
}

// Function to extract FAQs from markdown content
function extractFAQsFromMarkdown(content) {
  const faqs = [];
  
  // Look for FAQ section with different possible headings
  // Updated regex to handle optional whitespace and line breaks
  const faqSectionRegex = /### \*\*\(FAQs?\)\*\*\s*\n(.*?)(?=\n### |\n## |\n# |$)/is;
  const faqSectionMatch = content.match(faqSectionRegex);
  
  if (!faqSectionMatch) {
    // Fallback to other FAQ heading formats
    const fallbackRegex = /### \*\*(?:Frequently Asked Questions|FAQs?).*?\*\*\s*\n(.*?)(?=\n### |\n## |\n# |$)/is;
    const fallbackMatch = content.match(fallbackRegex);
    
    if (fallbackMatch) {
      // This could be TMail style with **Q1:** format
      const faqContent = fallbackMatch[1];
      
      // Check if it contains **Q1: style questions
      if (faqContent.includes('**Q1:')) {
        // Handle TMail style **Q1:** and A: format
        const qaBlocks = faqContent.split(/\*\*Q\d+:/);
        
        for (let i = 1; i < qaBlocks.length; i++) {
          const block = qaBlocks[i].trim();
          const qaParts = block.split(/\s*\nA:/);
          
          if (qaParts.length >= 2) {
            let question = qaParts[0].trim();
            let answer = qaParts[1].trim();
            
            // Remove trailing ** from question if present
            question = question.replace(/\*\*\s*$/, '').trim();
            
            answer = cleanAnswerText(answer);
            
            if (question && answer) {
              faqs.push({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": answer
                }
              });
            }
          }
        }
      } else {
        // Original fallback logic for ### Q: format
        const qaBlocks = faqContent.split(/### Q\d*:/);
        
        for (let i = 1; i < qaBlocks.length; i++) {
          const block = qaBlocks[i].trim();
          const qaParts = block.split(/\nA\d*:/);
          
          if (qaParts.length >= 2) {
            const question = qaParts[0].trim();
            let answer = qaParts[1].trim();
            answer = cleanAnswerText(answer);
            
            if (question && answer) {
              faqs.push({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": answer
                }
              });
            }
          }
        }
      }
    } else {
      // Final fallback for ## Frequently Asked Questions format
      const finalFallback = /## (?:Frequently Asked Questions|FAQs?).*?\n(.*?)(?=\n## |\n# |$)/is;
      const finalMatch = content.match(finalFallback);
      
      if (!finalMatch) {
        return null;
      }
      
      const faqContent = finalMatch[1];
      const qaBlocks = faqContent.split(/### Q\d*:/);
      
      for (let i = 1; i < qaBlocks.length; i++) {
        const block = qaBlocks[i].trim();
        const qaParts = block.split(/\nA\d*:/);
        
        if (qaParts.length >= 2) {
          const question = qaParts[0].trim();
          let answer = qaParts[1].trim();
          answer = cleanAnswerText(answer);
          
          if (question && answer) {
            faqs.push({
              "@type": "Question",
              "name": question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": answer
              }
            });
          }
        }
      }
    }
  } else {
    // Handle the **Q1:** and A: format (TMail style)
    const faqContent = faqSectionMatch[1];
    
    // Split by **Q followed by number and colon
    const qaBlocks = faqContent.split(/\*\*Q\d+:/);
    
    for (let i = 1; i < qaBlocks.length; i++) {
      const block = qaBlocks[i].trim();
      
      // Split by A: to separate question and answer
      const qaParts = block.split(/\s*\nA:/);
      
      if (qaParts.length >= 2) {
        let question = qaParts[0].trim();
        let answer = qaParts[1].trim();
        
        // Remove trailing ** from question if present
        question = question.replace(/\*\*\s*$/, '').trim();
        
        answer = cleanAnswerText(answer);
        
        if (question && answer) {
          faqs.push({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": answer
            }
          });
        }
      }
    }
  }
  
  return faqs.length > 0 ? faqs : null;
}

// Helper function to clean answer text
function cleanAnswerText(answer) {
  // Clean up the answer text - remove markdown links and formatting
  answer = answer.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Remove markdown links
  answer = answer.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold formatting
  answer = answer.replace(/\*(.*?)\*/g, '$1'); // Remove italic formatting
  answer = answer.replace(/`([^`]+)`/g, '$1'); // Remove code formatting
  answer = answer.replace(/\n- /g, ', '); // Convert bullet points to comma-separated
  answer = answer.replace(/\n\n/g, ' '); // Replace double newlines with space
  answer = answer.replace(/\n/g, ' '); // Replace single newlines with space
  answer = answer.replace(/\s+/g, ' '); // Clean up multiple spaces
  answer = answer.replace(/---.*$/g, ''); // Remove trailing --- and anything after
  return answer.trim();
}

export function generateMetadata({ params }) {
  const { slug } = params;
  return getData(slug).then(({ frontMatter }) => {
    const { title, description, keywords, author, category, date } = frontMatter;

    return {
      ...defaultMetadata,
      title: title || defaultMetadata.title,
      description: description || defaultMetadata.description,
      keywords: keywords || defaultMetadata.keywords,
      authors: [{ name: author, url: frontMatter.authorLink }],
      category: category,
      canonical: `https://www.od2.in/blog/${slug}`,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        ...defaultMetadata.openGraph,
        title: title || defaultMetadata.openGraph.title,
        description: description || defaultMetadata.openGraph.description,
        url: `https://www.od2.in/blog/${slug}`,
        type: 'article',
        publishedTime: date,
        authors: [author],
        section: category,
        tags: keywords?.split(',').map(k => k.trim()),
      },
      twitter: {
        ...defaultMetadata.twitter,
        title: title || defaultMetadata.twitter.title,
        description: description || defaultMetadata.twitter.description,
        creator: author,
      },
      alternates: {
        canonical: `https://www.od2.in/blog/${slug}`,
      },
    };
  });
}

// Layout Component
export default async function Layout({ params, children }) {
  const { slug } = params;
  const { content } = await getData(slug);
  
  // Extract FAQs from markdown content
  const faqs = extractFAQsFromMarkdown(content);
  
  // Generate FAQ Schema if FAQs are found
  const faqSchema = faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  } : null;

  return (
    <div className="blog-content-wrapper">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema, null, 2)
          }}
        />
      )}
      {children}
    </div>
  );
}
