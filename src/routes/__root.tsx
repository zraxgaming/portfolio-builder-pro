import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import config from "../config.json";
import { SiteHeader, SiteFooter } from "../components/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="hero-name"><span className="hero-name-accent">404</span></h1>
        <p className="hero-desc">This page doesn't exist.</p>
        <Link to="/" className="btn btn-primary">go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="hero-name">error</h1>
        <p className="hero-desc">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-primary">try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${config.identity.name} | ${config.identity.role}` },
      { name: "description", content: config.identity.tagline },
      { name: "author", content: config.identity.name },
      { property: "og:title", content: `${config.identity.name} | ${config.identity.role}` },
      { property: "og:description", content: config.identity.tagline },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: config.identity.avatar },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Sora:wght@400;600;700;800&display=swap",
      },
      { rel: "icon", href: config.identity.avatar, type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="wrapper" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
