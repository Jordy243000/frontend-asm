"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "@/assets/img/logo/logo.png";
import Image from "next/image";
import OffCanvasMain from "@/components/common/off-canvas";
import Menus from "./menu";
import axios from "axios";
import { Icon } from "@iconify/react";
//import { Icon } from "@iconify/react";

const HeaderThere = () => {
  // Sticky Menu Area start
  React.useEffect(() => {
    window.addEventListener("scroll", sticky);
    return () => {
      window.removeEventListener("scroll", sticky);
    };
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [socialData, setSocialData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch the first endpoint
        const socialResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/socialmedias?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSocialData(socialResponse?.data?.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(
          error.response?.data?.error?.message
            ? error?.response?.data?.error?.message
            : error.toString()
        );
      }
    };
    fetchData();
  }, []);

  //console.log("Sociallll", socialData, process.env.NEXT_PUBLIC_API_ENDPOINT);

  const sticky = (e) => {
    const header = document.querySelector(".menu-sticky");
    const scrollTop = window.scrollY;
    scrollTop >= 40
      ? header.classList.add("sticky")
      : header.classList.remove("sticky");
  };
  // Sticky Menu Area End
  const [isOffCanvasOpen, setIsOffCanvasOpen] = React.useState(false);
  return (
    <header>
      <div className="header__top header__pad d-none d-md-block">
        <div className="container">
          <div className="row g-0 align-items-center">
            <div className="col-xl-7 col-md-7">
              <div className="header__text">
                <span className="uppercase">
                  African Shipping Management (ASM) RDC
                </span>
              </div>
            </div>
            <div className="col-xl-5 col-md-5 d-flex justify-content-end">
              {socialData?.length > 0 ? (
                <div className="header__social-link">
                  <ul>
                    {socialData?.map((datum, idx) => {
                      return (
                        <li key={idx}>
                          <Link target="_blank" href={datum?.attributes?.link}>
                            <Icon
                              icon={datum?.attributes?.icon}
                              width="16"
                              height="16"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom-wrapper white-bg pb-15">
        <div className="container">
          <div className="header__bottom p-relative">
            <div className="header__bottom-info">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-2 col-9">
                  <div className="logo logo-transform">
                    <Link href="/">
                      <Image
                        src={Logo}
                        style={{ width: "100px", height: "auto" }}
                        alt="Logo African Shipping Management (ASM) RDC"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-10 col-3">
                  <div className="text-end d-xl-none">
                    <div className="header__toggle-btn sidebar-toggle-btn">
                      <div
                        className="header__bar"
                        onClick={() => setIsOffCanvasOpen(true)}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-xl-block">
                    <div className="header__info">
                      <div className="header__info-item">
                        <div className="header__info-icon">
                          <i className="flaticon-telephone-call"></i>
                        </div>
                        <div className="header__info-text">
                          <span>Nous appeler</span>
                          <h5>
                            <Link href="tel:+243991450541">+243 991 450 541</Link>
                          </h5>
                        </div>
                      </div>
                      <div className="header__info-item">
                        <div className="header__info-icon">
                          <i className="flaticon-envelope"></i>
                        </div>
                        <div className="header__info-text">
                          <span>Nous écrire</span>
                          <h5>
                            <Link href="mailto:support@africansm-rdc.com">
                              support@africansm-rdc.com
                            </Link>
                          </h5>
                        </div>
                      </div>
                      <div className="header__info-item">
                        <div className="header__info-icon">
                          <i className="flaticon-pin"></i>
                        </div>
                        <div className="header__info-text">
                          <span>
                            Blvd du 30 juin Immeuble Kiyo ya Sita 9ème Niveau
                            Appartement 902 & 903
                          </span>
                          <h5>
                            <Link
                              target="_blank"
                              href="https://maps.app.goo.gl/c2uNwedvQtqYdd9H8"
                            >
                              Kinshasa-Gombe, RDC
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-area position d-none d-xl-block p-absolute">
              <div className="row d-flex justify-content-end align-items-center">
                <div className="col-xl-2 col-lg-2">
                  <div className="logo d-none">
                    <Link href="/">
                      <Image
                        src={Logo}
                        style={{ width: "100px", height: "auto" }}
                        alt="Logo African Shipping Management (ASM)"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10">
                  <div className="menu-wrapper menu-bg d-flex justify-content-between">
                    <div className="main-menu main-menu-1">
                      <nav id="mobile-menu">
                        <Menus />
                      </nav>
                    </div>
                    <div className="menu-btn">
                      <Link href="/contact">Nous contacter</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Menu Area Start Here   */}
      <div id="header-sticky" className="sticky-area menu-sticky menu-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-2 col-3">
              <div className="logo">
                <Link href="/">
                  <Image
                    src={Logo}
                    style={{ width: "100px", height: "auto" }}
                    alt="Logo African Shipping Management (ASM)"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-9">
              <div className="menu-wrapper menu-none d-flex align-items-center justify-content-between">
                <div className="main-menu main-menu-1">
                  <nav>
                    <Menus />
                  </nav>
                </div>
                <div className="menu-btn">
                  <Link className="clip-btn" href="/contact">
                    Nous contacter
                  </Link>
                </div>
              </div>
              <div className="header__toggle-btn sidebar-toggle-btn text-end d-block d-lg-none">
                <div
                  className="header__bar"
                  onClick={() => setIsOffCanvasOpen(true)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Menu Area End Here  
         Sidebar Area Start Here   */}
      <OffCanvasMain
        socialData={socialData}
        isOffCanvasOpen={isOffCanvasOpen}
        setIsOffCanvasOpen={setIsOffCanvasOpen}
      />
    </header>
  );
};

export default HeaderThere;
