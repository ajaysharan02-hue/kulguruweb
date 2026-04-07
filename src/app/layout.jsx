import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { getSettings } from "@/lib/api";
import { SITE_NAME, SITE_URL, resolvePublicUrl } from "@/lib/config";
import { extractSocialLinks } from "@/lib/socials";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileFooterNav } from "@/components/layout/MobileFooterNav";
import FloatingContact from "@/components/common/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const settingsRes = await getSettings().catch(() => null);
  const settings = settingsRes?.data || {};
  const brandName = settings?.brandName || settings?.instituteName || SITE_NAME;
  const description =
    settings?.tagline ||
    "Professional programs, degrees, and enrollment guidance.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: brandName,
      template: `%s | ${brandName}`,
    },
    description,
    openGraph: {
      title: brandName,
      description,
      type: "website",
      url: SITE_URL,
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function RootLayout({ children }) {
  const settingsRes = await getSettings().catch(() => null);
  const settings = settingsRes?.data || {};
  const brandName = settings?.brandName || settings?.instituteName || SITE_NAME;
  const socials = extractSocialLinks(settings);
  const whatsappLink = socials.find((s) => s.id === "whatsapp")?.url;
  const phone = settings?.phone || settings?.contactPhone;
  const logo = settings?.logo || settings?.logoUrl || null;
  const email = settings?.email || settings?.contactEmail;

  const organizationLogo = logo || undefined;

  const sameAs = Array.isArray(socials) ? socials.map((s) => s.url).filter(Boolean) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: brandName,
        url: SITE_URL,
        ...(organizationLogo ? { logo: organizationLogo } : {}),
        ...(email || phone
          ? {
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "admissions",
                ...(phone ? { telephone: phone } : {}),
                ...(email ? { email } : {}),
              },
            ],
          }
          : {}),
        ...(sameAs?.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        name: brandName,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/programs?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader
          brandName={brandName}
          logo={logo}
          phone={settings?.phone || settings?.contactPhone}
          email={settings?.email || settings?.contactEmail}
          socials={socials}
        />
        <div className="min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
          <SiteFooter
            brandName={brandName}
            logo={logo}
            address={settings?.address}
            phone={settings?.phone || settings?.contactPhone}
            email={settings?.email || settings?.contactEmail}
            socials={socials}
          />
        </div>
        <FloatingContact phone={phone} whatsappUrl={whatsappLink} />
        <MobileFooterNav />
        <script
          type="application/ld+json"
          // Schema.org structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

