import React from "react";
import ServicesAreaTwo from "@/components/home/service-area";
import breadcrumb_bg from "@/assets/img/breadcrumb/servBanner.png";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";

const MainServices = () => {
  return (
    <main>
      <Breadcrumb
        title={"Nos Services"}
        subTitle={"Services"}
        breadcrumb_bg={breadcrumb_bg?.src}
        back={"Accueil"}
        backLink={"/"}
      />
      <ServicesAreaTwo />
    </main>
  );
};

export default MainServices;
