import { Home, Mail, Package, PersonStanding, Dock, Calculator, CheckCircle, Aperture, Camera, Phone, FileText } from "lucide-react";

const menuItems = {
    main: [
        {
            id: "home",
            label: "Home",
            url: "/",
            icon: Home,
            priority: 1,
            description: "Go to the homepage and see the dashboard.",
        },

        {
            id: "about",
            label: "About",
            url: "/about",
            icon: PersonStanding,
            priority: 6,
            description: "Learn more about One Day Developers.",
        },
        {
            id: "blog",
            label: "Blog",
            url: "/blog",
            icon: Dock,
            priority: 7,
            description: "Read our latest articles and updates.",
        },
        {
            id: "contact",
            label: "Contact",
            url: "/contact",
            icon: Phone,
            priority: 8,
            description: "Get in touch with our team.",
        },
    ],
    products: [
        {
            id: "products",
            label: "Products",
            url: "/products",
            icon: Package,
            priority: 1,
            description: "Browse all available products.",
        },
        {
            id: "products-od2-billing-system",
            label: "Billing System",
            url: "/products/od2-billing-system",
            icon: Calculator,
            priority: 2,
            description: "Automate your billing with OD2 Billing System.",
            features: [
                "Highly customizable",
                "Advanced querying capabilities",
                "Multi-language support",
            ],
        },
    ],
    tools: [
        {
            id: "temp-mail",
            label: "Temp Mail",
            url: "/temp-mail",
            icon: Mail,
            priority: 1,
            description: "Generate temporary email addresses for privacy.",
            features: [
                "No signup required",
                "Auto-deletion 12 hours after email receipt",
                "Instant inbox access",
            ],
        },
        {
            id: "captcha",
            label: "reCAPTCHA",
            url: "/captcha",
            icon: CheckCircle,
            priority: 2,
            description: "Protect your site from spam and abuse.",
            children: [
                {
                    id: "captcha-v2",
                    label: "reCAPTCHA v2",
                    icon: CheckCircle,
                    url: "/captcha/v2",
                    priority: 1,
                    description: "Classic checkbox CAPTCHA for user verification.",
                },
                {
                    id: "captcha-v3",
                    label: "reCAPTCHA v3",
                    icon: CheckCircle,
                    url: "/captcha/v3",
                    priority: 2,
                    description: "Invisible CAPTCHA for seamless protection.",
                },
            ],
        },
        {
            id: "passport-photo-printing",
            label: "Photo Maker",
            url: "/passport-photo-printing",
            icon: Aperture,
            priority: 3,
            description: "Create and print passport photos easily.",
            features: [
                "Instant photo processing",
                "Perfect dimensions",
                "Affordable and accessible",
            ],
        },
           {
            id: "api-wd",
            label: "API Workflow Designer",
            url: "/api-wd",
            icon: Aperture,
            priority: 3,
            description: "Create and manage API workflows easily.",
            features: [
                "Instant photo processing",
                "Perfect dimensions",
                "Affordable and accessible",
            ],
        },
        {
            id: "convert-image-to-blob",
            label: "Image to Blob",
            url: "/convert-image-to-blob",
            icon: Camera,
            priority: 4,
            description: "Convert images to blob format for uploads.",
            features: [
                "Faster loading – Reduces HTTP requests",
                "Offline support – No external hosting needed",
                "Improved security – Prevents image hotlinking",
            ],
        },
    ],
};


const technologies = [
  {
    category: "Data Base Technologies",
    frameworks: [
      {
        name: "MySQL",
        description: "The world's most popular open-source database.",
        language: "SQL",
        os: "Cross-platform",
        link: "https://www.mysql.com/",
      },
      {
        name: "PostgreSQL",
        description: "A powerful, open-source relational database system.",
        language: "SQL",
        os: "Cross-platform",
        link: "https://www.postgresql.org/",
      },
      {
        name: "MongoDB",
        description: "A NoSQL database for modern applications.",
        language: "JavaScript",
        os: "Cross-platform",
        link: "https://www.mongodb.com/",
      },
      {
        name: "SQLite",
        description:
          "A self-contained, high-reliability, embedded, full-featured, public-domain SQL database engine.",
        language: "SQL",
        os: "Cross-platform",
        link: "https://www.sqlite.org/",
      },
      {
        name: "Redis",
        description:
          "An open-source, in-memory data structure store, used as a database, cache, and message broker.",
        language: "Various (C, Python, Java, etc.)",
        os: "Cross-platform",
        link: "https://redis.io/",
      },
      {
        name: "MS SQL Server",
        description:
          "A relational database management system developed by Microsoft.",
        language: "SQL",
        os: "Cross-platform (Windows, Linux)",
        link: "https://www.microsoft.com/en-us/sql-server",
      },
    ],
  },
  {
    category: "Cross-Platform Frameworks",
    frameworks: [
      {
        name: "Flutter",
        description: "Mobile, web, and desktop app development.",
        language: "Dart",
        os: "Cross-platform",
        link: "https://flutter.dev/",
      },
      {
        name: "React Native",
        description: "Mobile app development.",
        language: "JavaScript/TypeScript",
        os: "Android, iOS",
        link: "https://reactnative.dev/",
      },
      {
        name: "Electron",
        description: "Desktop app development.",
        language: "JavaScript, HTML, CSS",
        os: "Windows, macOS, Linux",
        link: "https://www.electronjs.org/",
      },
    ],
  },
  {
    category: "Web Frameworks",
    frameworks: [
      {
        name: "React.js",
        description: "Web app development.",
        language: "JavaScript",
        os: "Cross-platform (browsers)",
        link: "https://reactjs.org/",
      },
      {
        name: "Next.js",
        description: "Server-side rendering, full-stack apps.",
        language: "JavaScript/TypeScript",
        os: "Cross-platform",
        link: "https://nextjs.org/",
      },
      {
        name: "Django",
        description:
          "A high-level Python Web framework that encourages rapid development and clean, pragmatic design.",
        language: "Python",
        os: "Cross-platform",
        link: "https://www.djangoproject.com/",
      },
      {
        name: "Flask",
        description: "A lightweight WSGI web application framework in Python.",
        language: "Python",
        os: "Cross-platform",
        link: "https://flask.palletsprojects.com/",
      },
      {
        name: "Node.js",
        description:
          "JavaScript runtime built on Chrome's V8 JavaScript engine.",
        language: "JavaScript",
        os: "Cross-platform",
        link: "https://nodejs.org/",
      },
      {
        name: "Express",
        description:
          "Fast, unopinionated, minimalist web framework for Node.js.",
        language: "JavaScript",
        os: "Cross-platform",
        link: "https://expressjs.com/",
      },
      {
        name: "Angular",
        description:
          "A platform for building mobile and desktop web applications.",
        language: "TypeScript",
        os: "Cross-platform",
        link: "https://angular.io/",
      },
      {
        name: "Vue.js",
        description: "The Progressive JavaScript Framework.",
        language: "JavaScript",
        os: "Cross-platform",
        link: "https://vuejs.org/",
      },
    ],
  },
];


export { menuItems, technologies };