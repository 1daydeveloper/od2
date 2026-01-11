export const metadata = {
    title: "Disclaimer and Terms of Use",
    description: "Official legal disclaimer for One Day Developers (OD2). Important information about our services, liability limits, and accuracy warranties.",
    keywords: ["disclaimer", "OD2 legal", "terms of use", "liability statement"],
    alternates: {
        canonical: "/disclaimer",
    },
    openGraph: {
        title: "Disclaimer | One Day Developers | OD2",
        description: "Legal information and liability disclaimers for One Day Developers services.",
        url: "/disclaimer",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function DisclaimerLayout({ children }) {
    return children;
}
