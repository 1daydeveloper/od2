"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    // Track theme change
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'theme_change', {
        event_category: 'UI Interaction',
        event_label: `switched_to_${newTheme}`,
        custom_parameter_1: 'header_theme_toggle'
      });
    }
    setTheme(newTheme);
  };

  const trackDropdownOpen = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dropdown_open', {
        event_category: 'UI Interaction',
        event_label: 'theme_toggle_opened',
        custom_parameter_1: 'header_theme_toggle'
      });
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && trackDropdownOpen()}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
