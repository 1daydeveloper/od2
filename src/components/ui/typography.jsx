import * as React from "react"

import { cn } from "@/lib/utils"

const TypographyH1 = React.forwardRef(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}
    {...props}
  />
))
TypographyH1.displayName = "TypographyH1"

const TypographyH2 = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      className
    )}
    {...props}
  />
))
TypographyH2.displayName = "TypographyH2"

const TypographyH3 = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
    {...props}
  />
))
TypographyH3.displayName = "TypographyH3"

const TypographyH4 = React.forwardRef(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
    {...props}
  />
))
TypographyH4.displayName = "TypographyH4"

const TypographyP = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    {...props}
  />
))
TypographyP.displayName = "TypographyP"

const TypographyBlockquote = React.forwardRef(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn("mt-6 border-l-2 pl-6 italic", className)}
    {...props}
  />
))
TypographyBlockquote.displayName = "TypographyBlockquote"

const TypographyInlineCode = React.forwardRef(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "relative rounded bg-muted px-[0.3em] py-[0.2em] font-mono text-sm font-semibold",
      className
    )}
    {...props}
  />
))
TypographyInlineCode.displayName = "TypographyInlineCode"

const TypographyLead = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xl text-muted-foreground", className)}
    {...props}
  />
))
TypographyLead.displayName = "TypographyLead"

const TypographyLarge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
TypographyLarge.displayName = "TypographyLarge"

const TypographySmall = React.forwardRef(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
))
TypographySmall.displayName = "TypographySmall"

const TypographyMuted = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
TypographyMuted.displayName = "TypographyMuted"

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
}
