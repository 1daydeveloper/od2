import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/typography";
import { menuItems } from "@/lib/common";
import { cn } from "@/lib/utils";

function renderCard(item) {
  const Icon = item.icon;
  return (
    <Card key={item.id} className={cn("flex flex-col h-full", item.borderColor)}>
      <CardHeader className="flex flex-row items-center gap-3">
        {Icon && <Icon className={cn("w-6 h-6", item.colorClass)} />}
        <CardTitle>{item.label}</CardTitle>
        {item.isNew && (
          <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full animate-pulse">
            NEW
          </span>
        )}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <TypographyP className="mb-4 text-muted-foreground flex-grow">{item.description}</TypographyP>
        {item.features && (
          <ul className="text-sm text-muted-foreground mb-6 space-y-1">
            {item.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                {f}
              </li>
            ))}
          </ul>
        )}
        <Button asChild className="w-full mt-auto">
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

  // Group tools by category
  const toolsByCategory = menuItems.tools.reduce((acc, tool) => {
    const cat = tool.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tool);
    return acc;
  }, {});

  return (
    <div className="maincard p-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <TypographyH1 className="mb-4">OD2 Solutions</TypographyH1>
        <TypographyP className="text-lg max-w-2xl mx-auto text-muted-foreground">
          Explore our suite of innovative products and free developer tools,
          designed to streamline your workflow and enhance your digital experience.
        </TypographyP>
      </div>

      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <TypographyH2 className="m-0 text-2xl">Premium Products</TypographyH2>
          <div className="h-px bg-border flex-grow" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => renderCard(item))}
        </div>
      </section>

      {Object.entries(toolsByCategory).map(([category, tools]) => (
        <section key={category} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <TypographyH2 className="m-0 text-xl text-muted-foreground uppercase tracking-widest">{category} Tools</TypographyH2>
            <div className="h-px bg-border flex-grow" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((item) => renderCard(item))}
          </div>
        </section>
      ))}

      <div className="mt-16 p-8 bg-muted rounded-2xl text-center">
        <TypographyH2 className="mb-4">Have an Idea?</TypographyH2>
        <TypographyP className="mb-6 text-muted-foreground">
          We're always looking for new ways to help developers and users. If you have a suggestion for a tool or product, we'd love to hear it.
        </TypographyP>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">Suggest a Feature</Link>
        </Button>
      </div>
    </div>
  );
}
