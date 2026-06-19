"use client";
import React from "react";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import breadcrumb_bg from "@/assets/img/breadcrumb/aboutBanner.png";
import TeamSectionArea from "@/components/extra-page/team/team-section-area";

const Equipe = () => {
  return (
    <main>
      <Breadcrumb
        title="Notre équipe"
        subTitle="équipe"
        breadcrumb_bg={breadcrumb_bg.src}
        back="Accueil"
        backLink="/"
      />
      <TeamSectionArea hideTitle />
    </main>
  );
};

export default Equipe;
