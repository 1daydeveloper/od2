---
title: "OD2 One Day Developers Blog: Submission Guidelines"
date: "2025-01-01"
author: "One Day Developers(OD2)"
authorLink: "https://www.linkedin.com/in/od2/"
category: "Guidelines"
description: "Learn how to contribute to the OD2 One Day Developers blog. Follow our official submission guidelines for technical writing, formatting, and SEO best practices."
keywords: "OD2, blog guidelines, technical writing, blog submission, content submission, developer community, contribution rules, markdown, SEO, blog standards, writing for developers, guest blogging, coding blogs"
urlpath: "od2-blog-submission-guidelines"
---


Welcome to OD2’s official blog platform. We are thrilled to have you contribute your insights, tutorials, and experiences with our community. To ensure that all submissions meet our standards and serve our audience, please adhere to the following rules and guidelines:

## 1. Submission Format
To ensure uniformity and structure across all blog posts, each submission should follow this format:

```markdown
---
title: "Title of the Blog (min 50 characters, max 100 characters)"
date: "YYYY-MM-DD"
author: "Author's Name (Separated by commas if more than one author)"
authorLink: "https://www.linkedin.com/in/author-profile/"
category: "Category based on the topic"
description: "A brief 2-line description summarizing the blog for the homepage (min 150 characters)"
keywords: "At least 20 relevant keywords to help with search indexing"
urlpath: "a-url-friendly-concise-version-of-the-blog-title"
---
```

**Details:**
- **Title**: Choose a clear, descriptive, and engaging title. Keep it concise (between 50-100 characters).
- **Date**: Set the blog's date in YYYY-MM-DD format.
- **Author**: Provide the full name of the author (separated by commas if multiple authors).
- **AuthorLink**: Include the LinkedIn profile URL or professional website link of the author.
- **Category**: Select the appropriate category based on the blog topic (e.g., "Technology", "JavaScript", "Web Security", "Next.js").
- **Description**: Write a 2-line summary that will be displayed on the homepage. Keep it under 160 characters but at least 150 characters.
- **Keywords**: Use at least 20 keywords relevant to the content, separated by commas. This helps improve SEO.
- **URL Path**: A concise, hyphenated version of the blog's title (e.g., "understanding-nextjs-hooks").

## 2. Content Quality
- **Originality**: All content must be original and not plagiarized from any other sources. Ensure that your blog post is unique and not published elsewhere.
- **Clarity**: Write in clear, simple language that can be easily understood by both beginners and advanced developers.
- **Length**: Aim for a blog length between 800-1500 words. Longer posts should be broken into sections for readability.
- **Code Examples**: Use clean, well-commented code snippets where applicable. Format them properly using markdown syntax for code blocks.
- **Images & Screenshots**: Ensure any images or screenshots are high quality, appropriately credited, and relevant to the topic.

## 3. Technical Accuracy
As OD2 is a technical blog, it is crucial that all information presented is accurate and up-to-date. Verify the correctness of any programming advice, tutorials, or technical concepts mentioned in the post. If the post covers tools, libraries, or frameworks, ensure you use the most recent version.

## 4. SEO Best Practices
- **Meta Tags**: Utilize relevant keywords to make your blog post SEO-friendly.
- **Headings**: Use heading tags (H1, H2, etc.) to organize your content into logical sections.
- **Linking**: Include links to relevant resources, blog posts, or documentation (both internal and external).

## 5. Respectful and Inclusive Language
We encourage diversity and respectful communication. Please avoid discriminatory, offensive, or controversial language. Always aim to educate, inspire, and uplift fellow developers.

## 6. Copyright & Attribution
- **Third-Party Content**: If you reference third-party content, such as images, articles, or software, make sure to give proper attribution and credit.
- **Licensing**: By submitting a blog post, you grant OD2 the right to publish and distribute the content on the website. You retain the copyright to your work.

## 7. Reviewing Process
All blog submissions will be reviewed by the OD2 editorial team before being published. This process ensures that the content aligns with our goals and quality standards. The team may request revisions, edits, or additional information.

## 8. User Engagement
Once your post is published, you are encouraged to respond to any comments or feedback from readers. Engaging with readers fosters a sense of community and provides additional insights.

## 9. Topics We Accept
We welcome content on the following topics (but not limited to):
- JavaScript Frameworks (e.g., Next.js, React)
- Web Development Techniques
- Backend Development
- Cloud Computing
- Database Management
- DevOps and Continuous Integration
- Technical Tutorials and How-Tos
- Software Design Patterns
- Security Practices and Vulnerabilities
- Open Source Projects
- Developer Tools & Resources

## 10. Disallowed Content
The following types of content will not be accepted:
- Offensive or discriminatory language
- Promotion of illegal or harmful activities
- Plagiarism or non-original content
- Irrelevant or non-technical content


## 11. Submitting Images & Videos

### Image Guidelines:
- **Naming Conventions**: 
  - Use **descriptive filenames** that reflect the content of the image. Filenames should be in **lowercase**, with words separated by hyphens (`-`).
  - For example, an image of a code snippet in a Next.js app should be named something like `nextjs-example-code-screenshot.png`.
  - Avoid using special characters or spaces in image filenames.

- **Format & Size**:
  - Preferred image formats: **PNG** or **JPEG**.
  - Ensure that the image size is optimized for the web. Images should not exceed **1MB** to avoid slowing down page load times. Tools like [TinyPNG](https://tinypng.com/) can help optimize images without losing quality.

- **Resolution**:
  - For most images, **1200px wide** is a good resolution for web display. Ensure the images are clear and readable.
  
- **Alt Text**:
  - Provide descriptive **alt text** for each image. This is essential for accessibility and SEO. The alt text should be concise and describe the image accurately. For example, if the image is a screenshot of a Next.js component, the alt text could be "Screenshot of a Next.js component rendering a list of items."

### Video Guidelines:
- **Naming Conventions**:
  - Like images, videos should have **descriptive filenames** in **lowercase** and **hyphen-separated**.
  - For example, a tutorial video on CORS could be named `understanding-cors-web-security-video.mp4`.

- **Format & Size**:
  - Preferred video formats: **MP4** (H.264 codec) or **WebM**.
  - Keep the file size under **50MB**. If your video is larger, consider uploading it to a platform like YouTube or Vimeo and embedding it in your blog post.

- **Resolution**:
  - Ensure the video is at least **720p** for clear visuals and readability.

### Submitting Media Files:
- **File Upload**: 
  - Images and videos should be uploaded alongside your blog submission, either as separate files or in a **zipped folder**. 
  - Name the media files clearly, using the same naming convention as mentioned above, and reference them in the body of your blog post by linking the file paths where applicable.

- **File Paths in Blog Post**:
  - Once your media files are uploaded, reference them in your blog post markdown like so:
  
    For images:
    ```markdown
    ![Alt text for image](path/to/your/image.png)
    ```

    For videos:
    ```markdown
    <video controls>
      <source src="path/to/your/video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    ```

- **External Video Hosting**:
  - If the video is hosted on an external platform like YouTube or Vimeo, you can embed it directly in the blog post:
    ```markdown
    [![Alt text for video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
    ```

---


By submitting a blog post, you agree to follow these guidelines and to allow OD2 to feature your article on our website. We look forward to sharing your knowledge and experience with the OD2 community!
