"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { Icon } from "@iconify/react";


const FooterFour = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [socialData, setSocialData] = React.useState([]);
  const [serviceData, setServiceData] = React.useState([]);

  React.useEffect(() => {
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

        const solutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/services?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setServiceData(solutionResponse?.data?.data);

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
  return (
    <footer>
      <div className="footer-area p-relative footer-area1-bg pt-100 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="footer-widget footer2-widget footer2-widget1 mb-50 pr-20">
                <div className="footer-widget-title">
                  <h4>À Propos nous</h4>
                </div>
                <p>
                  African Shipping Management (ASM) RDC révolutionne la
                  logistique maritime avec des solutions digitales innovantes,
                  assurant traçabilité, transparence et sécurité pour une
                  gestion efficace.
                </p>
                <div className="footer-social-link mt-40">
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
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="footer-widget footer2-widget footer2-widget2 mb-50 pl-30">
                <div className="footer-widget-title">
                  <h4>Pages</h4>
                </div>
                <div className="footer-widget-link">
                  <ul>
                    <li>
                      <Link href="/">Accueil</Link>
                    </li>
                    <li>
                      <Link href="/carriere">Carrière</Link>
                    </li>
                    <li>
                      <Link href="/products">Produits</Link>
                    </li>
                    <li>
                      <Link href="/about">à propos de nous</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link href="/equipe">Équipe</Link>
                    </li>
                    <li>
                      <Link href="/contact">Nous contacter</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="footer-widget footer2-widget footer2-widget3 mb-50 pl-55">
                <div className="footer-widget-title">
                  <h4>Nos services</h4>
                </div>
                <ul className="footer-widget-link-2">
                  {serviceData?.map((item, idx) => {
                    return (
                      <li key={idx}>
                        {/* <i className={item?.icon}></i> */}
                        <Link href={`/services/${item?.id}`}>
                          {item?.attributes?.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="footer-widget footer2-widget footer2-widget4 mb-50 pl-10 pr-40">
                <div className="footer-widget-title">
                  <h4>Nous contacter</h4>
                </div>
                <p className="mb-20">
                  Contactez-nous pour toute information ou visitez-nous à notre
                  adresse.
                </p>
                <ul className="footer-widget-link-2">
                  <li>
                    <i className={"fas fa-phone"}></i>
                    <Link href="tel:+243991450541">+243 991 450 541</Link>
                  </li>
                  <li>
                    <i className={"flaticon-envelope"}></i>
                    <Link href={`mailto:support@africansm-rdc.com`}>
                      support@africansm-rdc.com
                    </Link>
                  </li>
                  <li>
                    <i className={"flaticon-pin"}></i>
                    <Link
                      target="_blank"
                      href="https://maps.app.goo.gl/c2uNwedvQtqYdd9H8"
                    >
                      Blvd du 30 juin, Immeuble Kiyo ya Sita 9ème Niveau
                      Appartement 902 & 903. Kinshasa - Gombe
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-menu-area red-bg">
        <div className="container">
          <div className="footer-menu-box two">
            <div className="row align-items-center">
              <div className="col-xxl-12 col-lg-12 text-center">
                <p className="mb-0">
                  © {new Date().getFullYear()} African Shipping Management ASM
                  RDC{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFour;
