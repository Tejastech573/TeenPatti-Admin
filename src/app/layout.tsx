"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) router.push("/login");
  }, [router]);

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/logo/main-logo.svg"
          type="image/svg+xml"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <AuthProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={1000}
            >
              {children}
            </SnackbarProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
