import React from "react";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import TeamAreaMain from "../../components/extra-page/team/index"
import AboutUsArea from "@/components/home/about-us-area";
import FooterFour from "@/components/Layouts/footer/footer-4";
import HeaderThere from "@/components/Layouts/header/header-there";
import Wrapper from "@/components/Layouts/wrapper";
import breadcrumb_bg from "@/assets/img/breadcrumb/aboutBanner.png";
import PartnersSection from "@/components/common/partners-section";
import ServicesAreaTwo from "@/components/home/service-area";
import TestimonialArea from "@/components/home/testimonial-area";
import WorkProcessArea from "@/components/home/work-process-area";

export const metadata = {
  title:
    "À propos | African Shipping Management (ASM) RDC - Notre Histoire & Mission",
  description:
    "Découvrez African Shipping Management (ASM), son histoire, sa mission et son engagement à transformer le secteur maritime, portuaire et logistique en RDC et en Afrique grâce à des solutions digitales innovantes.",
  keywords: [
    "African Shipping Management (ASM) RDC",
    "ASM RDC",
    "à propos ASM",
    "transformation digitale maritime",
    "solutions portuaires",
    "équipe ASM",
    "vision ASM",
    "mission ASM",
    "histoire maritime RDC",
    "innovation portuaire Afrique",
  ],
  authors: [
    {
      name: "African Shipping Management (ASM) RDC",
      url: "https://africansm-rdc.com",
    },
  ],
  metadataBase: new URL("https://africansm-rdc.com"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "À propos de African Shipping Management (ASM) RDC - Notre Vision Maritime",
    description:
      "Apprenez-en plus sur notre entreprise, notre équipe et notre engagement pour la digitalisation du secteur maritime et portuaire en République Démocratique du Congo et en Afrique.",
    url: "/about",
    images: [
      {
        url: "/assets/img/logo/logo.png",
        width: 1920,
        height: 1080,
        alt: "Logo ASM RDC",
      },
    ],
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de African Shipping Management (ASM) RDC",
    description:
      "Découvrez l'histoire et la mission d'ASM RDC, pionnier des solutions digitales pour le secteur maritime africain.",
    images: {
      url: "/assets/img/logo/logo.png",
      alt: "Logo African Shipping Management ASM RDC",
    },
    site: "@africansm_rdc",
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
      "max-image-preview": "large",
    },
  },
  other: {
    "og:company:category": "TECHNOLOGIE_MARITIME",
    "og:contact:phone": "+243857513492",
    "og:slogan":
      "African Shipping Management (ASM) RDC - Pionniers de la transformation digitale du secteur maritime africain",
    "og:email": "support@africansm-rdc.com",
    "og:founder": "ASM Leadership Team",
  },
};

const AboutUsPage = () => {
  return (
    <>
      <Wrapper>
        <HeaderThere />
        <Breadcrumb
          title="à propos de nous"
          subTitle="African Shipping Management (ASM) RDC"
          breadcrumb_bg={breadcrumb_bg.src}
          back={"Accueil"}
          backLink={"/"}
        />
        <AboutUsArea />
        <ServicesAreaTwo />
        {/* <TestimonialArea /> */}
       
        <TeamAreaMain />
         <WorkProcessArea />
        <PartnersSection />
        <FooterFour />
      </Wrapper>
    </>
  );
};

export default AboutUsPage;
