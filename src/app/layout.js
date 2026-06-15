if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import "swiper/css";
import "swiper/css/bundle";
import "react-modal-video/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-circular-progressbar/dist/styles.css";
import "react-rangeslider/lib/index.css";
import "animate.css";

import "../../node_modules/bootstrap/scss/bootstrap.scss";
import "@/assets/css/fontAwesome5Pro.css";
import "@/assets/css/default.css";
import "@/assets/css/nice-select.css";
import "@/assets/css/backToTop.css";
import "@/assets/css/flaticon.css";
import "@/assets/css/animate.min.css";
import "@/assets/scss/main.scss";

import Dependency from "@/components/utilities/Dependency";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title:
    "African Shipping Management (ASM) RDC - Solutions Digitales pour le Secteur Maritime",
  description:
    "African Shipping Management (ASM) RDC digitalise le secteur maritime et portuaire en RDC avec des solutions innovantes de gestion des infrastructures, redevances maritimes et transport multimodal.",
  keywords: [
    "African Shipping Management",
    "ASM RDC",
    "digitalisation maritime",
    "gestion portuaire RDC",
    "transport multimodal Congo",
    "solutions logistiques Kinshasa",
    "redevances maritimes",
    "sécurité portuaire",
    "traçabilité maritime",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  creator: "African Shipping Management (ASM) RDC",
  publisher: "African Shipping Management (ASM) RDC",
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "African Shipping Management (ASM) RDC - Leader en Digitalisation Maritime",
    description:
      "Solutions digitales innovantes pour moderniser la gestion maritime, portuaire et logistique en RDC et en Afrique.",
    url: "https://africansm-rdc.com",
    siteName: "African Shipping Management (ASM) RDC",
    images: [
      {
        url: "/assets/img/logo/logo.png",
        width: 800,
        height: 600,
        alt: "Logo ASM RDC",
      },
    ],
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "African Shipping Management (ASM) RDC - Transformation Digitale du Secteur Maritime",
    description:
      "Partenaire stratégique pour la modernisation des infrastructures portuaires et la gestion maritime en RDC.",
    images: ["/assets/img/logo/logo.png"],
    site: "@africansm_rdc",
    creator: "@africansm_rdc",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "og:slogan":
      "African Shipping Management (ASM) RDC vous offre des solutions digitales au service du secteur maritime africain",
    "og:contact": "+243857513492",
    "og:email": "support@africansm-rdc.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          key="structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "African Shipping Management (ASM) RDC",
              alternateName: "ASM RDC",
              url: "https://africansm-rdc.com",
              logo: "https://africansm-rdc.com/assets/img/logo/logo.png",
              description:
                "African Shipping Management (ASM) RDC est une entreprise congolaise spécialisée dans la digitalisation du secteur maritime et portuaire, incluant la gestion des infrastructures, des redevances maritimes et du transport multimodal.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "CD",
                addressLocality: "Kinshasa",
                addressRegion: "Gombe",
                streetAddress: "République Démocratique du Congo",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+243857513492",
                contactType: "sales",
                areaServed: "CD",
                availableLanguage: ["fr", "en", "Lingala"],
              },
              telephone: "+243857513492",
              email: "support@africansm-rdc.com",
              brand: "African Shipping Management (ASM) RDC",
              sameAs: ["https://africansm-rdc.com"],
              slogan:
                "African Shipping Management (ASM) RDC vous offre des solutions digitales au service du secteur maritime africain.",
              keywords:
                "African Shipping Management (ASM) RDC, ASM, digitalisation maritime, gestion portuaire, redevances maritimes, transport multimodal, ports secs, RDC, innovation, sécurité, traçabilité, transparence",
            }),
          }}
        />
      </head>
      <body>
        <ToastContainer />
        <Dependency />
        {children}
      </body>
    </html>
  );
}
