import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import React from "react";
import ContactFrom from "./contact-form";
import OfficesSection from "./offices-section";
import breadcrumb_bg from "@/assets/img/breadcrumb/contactBanner.png";

const CtcForm = () => {
  return (
    <main>
      <Breadcrumb
        title="Nous contacter"
        subTitle="Contact"
        breadcrumb_bg={breadcrumb_bg.src}
        back={"Accueil"}
        backLink={"/"}
      />
      <ContactFrom />
      <OfficesSection />
    </main>
  );
};

export default CtcForm;
