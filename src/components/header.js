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
  const pathname = usePathname();

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

  const MenuItem = ({ item, Icon }) => {
    const isActive = pathname === item.url;
    return (
      <SheetClose asChild>
        <Link
          href={item.url}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          )}
          onClick={() => handleMobileMenuItemClick(item)}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {item.label}
        </Link>
      </SheetClose>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
          onClick={handleMobileMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <SheetHeader className="px-1 text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 py-4 h-full overflow-y-auto pb-20 pl-1 pr-4">
          {/* Main Menu */}
          <div className="flex flex-col gap-1">
            <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-2">Navigation</h4>
            {menuItems.main.map((item) => (
              <MenuItem key={item.id} item={item} Icon={item.icon} />
            ))}
          </div>

          <Separator />

          {/* Products */}
          <div className="flex flex-col gap-1">
            <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-2">Products</h4>
            {menuItems.products.map((item) => (
              <MenuItem key={item.id} item={item} Icon={item.icon} />
            ))}
          </div>

          <Separator />

          {/* Tools */}
          <div className="flex flex-col gap-1">
            <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-2">Tools</h4>
            {menuItems.tools.map((item) => (
              <React.Fragment key={item.id}>
                <MenuItem item={item} Icon={item.icon} />
                {item.children?.map((child) => (
                  <div key={child.id} className="pl-4">
                    <MenuItem item={child} Icon={child.icon} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
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
              <div className="flex items-center gap-2">
                <Link href="/" onClick={trackLogoClick} className="flex-shrink-0">
                  <Image
                    src="/odd.png"
                    alt="Next.js Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    priority
                  />
                </Link>
                <div className="flex flex-col justify-center">
                  <Link className="text-current" href="/" onClick={trackLogoClick}>
                    <h2 className="text-lg font-bold leading-none tracking-tight">
                      OD2
                      <span className="hidden sm:inline font-normal text-muted-foreground ml-2">
                        - {currentTitle.label}
                      </span>
                    </h2>
                  </Link>
                </div>
              </div>
              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-8">
                <NavigationDesktop />
                <ThemeToggle />
              </div>
              {/* Mobile nav */}
              <div className="flex md:hidden items-center gap-1">
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
