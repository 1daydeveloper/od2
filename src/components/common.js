import { Home, Inbox, Calendar, Search, Settings, MailIcon, Package, PersonStanding, Dock, CalculatorIcon, CheckCircle, Aperture, Camera, Calculator } from "lucide-react";

export const menuItems = {
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
        },
    ],
    tools: [
        {
            id: "temp-mail",
            label: "Temp Mail",
            url: "/temp-mail",
            icon: MailIcon,
            priority: 1,
            description: "Generate temporary email addresses for privacy.",
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
        },
        {
            id: "convert-image-to-blob",
            label: "Image to Blob",
            url: "/convert-image-to-blob",
            icon: Camera,
            priority: 4,
            description: "Convert images to blob format for uploads.",
        },
    ],
};