"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { menuItems } from "@/lib/common";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Google Analytics tracking functions
const trackNavigationClick = (label, destination) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Navigation',
      event_label: label,
      destination_page: destination,
      custom_parameter_1: 'header_navigation'
    });
  }
};

const trackMobileMenuAction = (action, item = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'Mobile Navigation',
      event_label: item || action,
      custom_parameter_1: 'mobile_menu'
    });
  }
};

const trackThemeToggle = (newTheme) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'theme_change', {
      event_category: 'UI Interaction',
      event_label: `switched_to_${newTheme}`,
      custom_parameter_1: 'header_theme_toggle'
    });
  }
};

const trackLogoClick = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Navigation',
      event_label: 'logo_home_click',
      destination_page: '/',
      custom_parameter_1: 'header_logo'
    });
  }
};

// ListItem styled like shadcn/ui demo
const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    const handleClick = () => {
      trackNavigationClick(title, href);
    };

    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            onClick={handleClick}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

// FeatureCard for menu items with submenu (like shadcn/ui logo card)
const FeatureCard = ({ icon: Icon, title, description, href }) => {
  const handleClick = () => {
    trackNavigationClick(`${title}_feature_card`, href);
  };

  return (
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <a
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
          href={href}
          onClick={handleClick}
        >
          {Icon ? <Icon className="h-6 w-6" /> : null}
          <div className="mb-2 mt-4 text-lg font-medium">{title}</div>
          <p className="text-sm leading-tight text-muted-foreground">{description}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

// Desktop navigation menu using menuItems, shadcn/ui style
function NavigationDesktop() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Main menu */}
        {menuItems.main.map((item) =>
          item.children && item.children.length > 0 ? (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <FeatureCard
                    icon={item.icon}
                    title={item.label}
                    description={item.description}
                    href={item.url}
                  />
                  {item.children.map((child) => (
                    <ListItem key={child.id} title={child.label} href={child.url}>
                      {child.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.id}>
              <Link href={item.url} legacyBehavior passHref>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  onClick={() => trackNavigationClick(item.label, item.url)}
                >
                  {/* Render icon if present */}
                  {item.icon ? <item.icon className="inline mr-2 h-4 w-4" /> : null}
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
        {/* Products dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <FeatureCard
                icon={menuItems.products[0].icon}
                title={menuItems.products[0].label}
                description={menuItems.products[0].description}
                href={menuItems.products[0].url}
              />
              {menuItems.products.slice(1).map((item) => (
                <ListItem key={item.id} title={item.label} href={item.url}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* Tools dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <FeatureCard
                icon={menuItems.tools[0].icon}
                title={menuItems.tools[0].label}
                description={menuItems.tools[0].description}
                href={menuItems.tools[0].url}
              />
              {menuItems.tools.slice(1).map((item) =>
                item.children && item.children.length > 0 ? (
                  <React.Fragment key={item.id}>
                    {item.children.map((child) => (
                      <ListItem
                        key={child.id}
                        title={child.label}
                        href={child.url}
                      >
                        {child.description}
                      </ListItem>
                    ))}
                  </React.Fragment>
                ) : (
                  <ListItem
                    key={item.id}
                    title={item.label}
                    href={item.url}
                  >
                    {item.description}
                  </ListItem>
                )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Mobile sheet menu using menuItems
function MobileMenu({ isOpen, setIsOpen }) {
  // Flatten all menu items for mobile
  const flatMenu = [
    ...menuItems.main,
    ...menuItems.products,
    ...menuItems.tools.flatMap((item) =>
      item.children && item.children.length > 0
        ? [item, ...item.children]
        : [item]
    ),
  ];

  const handleMobileMenuToggle = () => {
    trackMobileMenuAction('open');
  };

  const handleMobileMenuClose = () => {
    trackMobileMenuAction('close');
    setIsOpen(false);
  };

  const handleMobileMenuItemClick = (item) => {
    trackMobileMenuAction('item_click', item.label);
    trackNavigationClick(`mobile_${item.label}`, item.url);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="md:hidden"
          aria-label="Open menu"
          onClick={handleMobileMenuToggle}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          {flatMenu.map((item) => (
            <SheetClose asChild key={item.id}>
              <Link
                href={item.url}
                className="text-lg"
                onClick={() => handleMobileMenuItemClick(item)}
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  // Page view tracking
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        event_category: 'Header',
        event_label: `header_rendered_${pathname}`,
        page_path: pathname,
        custom_parameter_1: 'header_page_view'
      });
    }
  }, [pathname]);

  // Find current title from menuItems.main
  const currentTitle =
    menuItems.main.find((link) => link.url === pathname) || {
      label: "One Day Developers",
    };

  return (
    <Card
      as="header"
      className="sticky top-0 z-50 bg-header_bg/95 backdrop-blur border-0 rounded-none shadow-none"
    >
      <CardContent className="p-0">
        <nav className="px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link href="/" onClick={trackLogoClick}>
                  <Image
                    src="/odd.png"
                    alt="Next.js Logo"
                    width={50}
                    height={50}
                    className="h-30 w-30 rounded-full"
                    priority
                  />
                </Link>
                <h2 className="ml-2 text-xl font-bold">
                  <Link className="text-current" href="/" onClick={trackLogoClick}>
                    OD2 - {currentTitle.label}
                  </Link>
                </h2>
              </div>
              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-8">
                <NavigationDesktop />
                <ThemeToggle />
              </div>
              {/* Mobile nav */}
              <div className="flex md:hidden items-center space-x-2">
                <ThemeToggle />
                <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
          </div>
        </nav>
        <Separator />
      </CardContent>
    </Card>
  );
};

export default Header;
