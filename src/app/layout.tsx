import { Inter } from "next/font/google";
// import localFont from "next/font/local";

// import type { Metadata } from "next";
import {Toaster} from '@/components/ui/sonner'

import { cn } from "@/lib/utils";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Fixtron",
//   description: "Fixtron || maintain Projects Structures",
// };

export async function generateMetadata() {
  return {
    generator: "Next.js",
    applicationName: "Fixtron",
    title: "Fixtron",
    description: "Fixtron || maintain Projects Structures",
    url: "/",
    // manifest: "https://nextjs.org/manifest.json",
    referrer: "origin-when-cross-origin",
    keywords: ["fixtron","task-manager", "project-manager", "project-structure", "project-structure-manager", "project-structure-management", "project-structure-management-tool", "project-structure-management-system"],
    authors: [
      { name: "Amit Upadhyay", url: "https://github.com/AmitUpadhyay878" },
    ],
    creator: "Amit Upadhyay",
    publisher: "Amit Upadhyay",
    archives: ["https://nextjs.org/13"],
    assets: ["https://nextjs.org/assets"],
    bookmarks: ["https://nextjs.org/13"],
    category: ["technology", "software", "web development", "web design", "web", "development", "design", "software development", "software design"],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "https://nextjs.org/en-US",
        "de-DE": "https://nextjs.org/de-DE",
      },
      media: {
        "only screen and (max-width: 600px)": "https://nextjs.org/mobile",
      },
      types: {
        "application/rss+xml": "https://nextjs.org/rss",
      },
    },
    openGraph: {
      title: "Fixtron",
      description: "Fixtron || maintain Projects Structures",
      url: "/",
      siteName: "Fixtron",
      images: [
        {
          url: "/og.png", // Must be an absolute URL
          width: 800,
          height: 600,
        },
        // {
        //   url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
        //   width: 1800,
        //   height: 1600,
        //   alt: "My custom alt",
        // },
      ],
      // videos: [
      //   {
      //     url: "https://nextjs.org/video.mp4", // Must be an absolute URL
      //     width: 800,
      //     height: 600,
      //   },
      // ],
      // audio: [
      //   {
      //     url: "https://nextjs.org/audio.mp3", // Must be an absolute URL
      //   },
      // ],
      locale: "en_US",
      type: "website",
      publishedTime: "2025-01-01T00:00:00.000Z",
      authors: ["Amit Upadhyay"],
    },
    twitter: {
      // card: 'app',
      card: "summary_large_image",
      title: "Fixtron",
      description: "Fixtron || maintain Projects Structures",
      siteId: "",
      creator: "@amit",
      creatorId: "",
      images: {
        url: "/og.png",
        alt: "Flexitorn",
      },
      // app: {
      //   name: "twitter_app",
      //   id: {
      //     iphone: "twitter_app://iphone",
      //     ipad: "twitter_app://ipad",
      //     googleplay: "twitter_app://googleplay",
      //   },
      //   url: {
      //     iphone: "https://iphone_url",
      //     ipad: "https://ipad_url",
      //   },
      // },
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // icons: {
    //   icon: [
    //     { url: "/icon.png" },
    //     new URL("/icon.png", "https://example.com"),
    //     { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    //   ],
    //   shortcut: ["/shortcut-icon.png"],
    //   apple: [
    //     { url: "/apple-icon.png" },
    //     { url: "/apple-icon-x3.png", sizes: "180x180", type: "image/png" },
    //   ],
    //   other: [
    //     {
    //       rel: "apple-touch-icon-precomposed",
    //       url: "/apple-touch-icon-precomposed.png",
    //     },
    //   ],
    // },
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      other: {
        me: ["amitupadhyay878@gmail.com", "https://github.com/AmitUpadhyay878"],
      },
    },
    // itunes: {
    //   appId: 'myAppStoreID',
    //   appArgument: 'myAppArgument',
    // },
    appleWebApp: {
      title: "Fixtron",
      statusBarStyle: "black-translucent",
      // startupImage: [
      //   "/assets/startup/apple-touch-startup-image-768x1004.png",
      //   {
      //     url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
      //     media: "(device-width: 768px) and (device-height: 1024px)",
      //   },
      // ],
    },
    // appLinks: {
    //   ios: {
    //     url: "https://nextjs.org/ios",
    //     app_store_id: "app_store_id",
    //   },
    //   android: {
    //     package: "com.example.android/package",
    //     app_name: "app_name_android",
    //   },
    //   web: {
    //     url: "https://nextjs.org/web",
    //     should_fallback: true,
    //   },
    // },
    // facebook: {
    //   appId: "12345678",
    //   //  admins: ['12345678', '87654321'],
    // },
    other: {
      custom: ["meta1", "meta2"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProvider>
          <Toaster />
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryProvider>
      </body>
    </html>
  );
}
