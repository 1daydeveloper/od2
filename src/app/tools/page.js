// pages/products.js
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/components/common";

function renderToolCard(item) {
  return (
    <Card key={item.id} className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{item.label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <CardDescription className="mb-6">
          {item.description}
        </CardDescription>
        {item.features && (
          <CardDescription asChild>
            <ul className="text-sm text-muted-foreground mb-6 space-y-2">
              {item.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </CardDescription>
        )}
        <div className="flex-1" />
        <Button asChild className="mt-4">
          <Link href={item.url}>
            Try Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Products() {
  const tools = menuItems.tools; // Show all tools

  return (
    <div className="maincard text-center p-6">
      <Card>
        <CardHeader>
          <CardTitle className="mb-6">OD2 Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Discover our innovative and user-friendly products, each designed to
            enhance your experience. Click below to explore further!
          </CardDescription>
        </CardContent>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {tools.map((item) => renderToolCard(item))}
      </div>
    </div>
  );
}
