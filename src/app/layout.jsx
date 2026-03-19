import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { getSettings } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { extractSocialLinks } from "@/lib/socials";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileFooterNav } from "@/components/layout/MobileFooterNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Professional programs, degrees, and enrollment guidance.",
  openGraph: {
    title: SITE_NAME,
    description: "Professional programs, degrees, and enrollment guidance.",
    type: "website",
    url: SITE_URL,
  },
};

export default async function RootLayout({ children }) {
  const settingsRes = await getSettings().catch(() => null);
  const settings = settingsRes?.data || {};
  const brandName = settings?.brandName || settings?.instituteName || SITE_NAME;
  const socials = extractSocialLinks(settings);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader
          brandName={brandName}
          phone={settings?.phone || settings?.contactPhone}
          email={settings?.email || settings?.contactEmail}
          socials={socials}
        />
        <div className="min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
          <SiteFooter
            brandName={brandName}
            address={settings?.address}
            phone={settings?.phone || settings?.contactPhone}
            email={settings?.email || settings?.contactEmail}
            socials={socials}
          />
        </div>
        <MobileFooterNav />
      </body>
    </html>
  );
}

