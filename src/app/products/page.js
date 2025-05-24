import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/typography";
import { menuItems } from "@/components/common";

function renderCard(item) {
  return (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <TypographyP className="mb-6 text-muted-foreground">{item.description}</TypographyP>
        {item.features && (
          <ul className="text-sm text-muted-foreground mb-6 space-y-2">
            {item.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
        <Button asChild>
          <Link href={item.url}>
            {item.id === "convert-image-to-blob" ? "Try Now" : "Learn More"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Products() {
  const products = menuItems.products.filter(
    (item) => item.id !== "products"
  );
  const tools = menuItems.tools.filter(
    (item) =>
      ["temp-mail", "passport-photo-printing", "convert-image-to-blob"].includes(item.id)
  );

  return (
    <div className="maincard text-center p-6">
      <TypographyH1 className="mb-6">OD2 Products</TypographyH1>
      <TypographyP className="mb-3 text-lg">
        Discover our innovative and user-friendly products, each designed to
        enhance your experience. Click below to explore further!
      </TypographyP>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
        {products.map((item) => renderCard(item))}
      </div>
      <TypographyH2 className="mb-6">OD2 Tools</TypographyH2>
      <TypographyP className="mb-3 text-lg">
        Discover our innovative and user-friendly products, each designed to
        enhance your experience. Click below to explore further!
      </TypographyP>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((item) => renderCard(item))}
      </div>
    </div>
  );
}
