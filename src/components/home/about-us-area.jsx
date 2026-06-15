"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import about_img from "../../../public/assets/img/about/about.png";

const AboutUsArea = () => {
  let [current, setCurrent] = React.useState("");

  React.useEffect(() => {
    current = window.location.pathname;
    setCurrent(current);

    //console.log(current, "restyyyyyy");
  }, []);
  return (
    <section
      className="about__area-2 pt-120 pb-60 wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".3s"
    >
      <div className="container">
        <div
          className="row align-items-center wow fadeInU"
          data-wow-duration="1.5s"
          data-wow-delay=".3s"
        >
          <div className="col-lg-6 col-xl-6">
            <div
              className="about__content-2 mb-60 wow fadeInRight"
              data-wow-duration="1.5s"
              data-wow-delay=".5s"
            >
              <div className="section__title mb-50">
                <span className="sub-title">à propos de ASM</span>
                <h2 className="title">
                 ASM-Une Société de Solutions Numériques pour la Transformation du Transport Multimodal en RDC
                </h2>
              </div>
              <div className="about__content-tab-2 mt-40">
                <ul className="nav mb-5" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active clip-lg-btn"
                      id="approch-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#approch"
                      type="button"
                      role="tab"
                      aria-controls="approch"
                      aria-selected="true"
                    >
                      Notre Vision
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link clip-lg-btn"
                      id="goal-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#goal"
                      type="button"
                      role="tab"
                      aria-controls="goal"
                      aria-selected="false"
                    >
                      Notre Mission
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link clip-lg-btn"
                      id="mision-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#mision"
                      type="button"
                      role="tab"
                      aria-controls="mision"
                      aria-selected="false"
                    >
                      Nos Valeurs
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="approch"
                    role="tabpanel"
                    aria-labelledby="approch-tab"
                  >
                         <p>
                      Aspirer à devenir un acteur de référence dans nos domaines d'activité, tant en République Démocratique du Congo qu'à l'international. Nous construisons cette ambition sur un socle d'expertise pointue, d'innovation continue et de valeurs humaines fortes.
                    </p>
                   
                    {current === "/about" ? (
                      ""
                    ) : (
                      <div className="about__content-tab-btn mt-35">
                        <a className="fill-btn clip-md-btn" href={"/about"}>
                          En savoir plus
                        </a>
                      </div>
                    )}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="goal"
                    role="tabpanel"
                    aria-labelledby="goal-tab"
                  >
                   <p>
                      Notre mission est d'inverser la tendance des pertes de revenus dues aux systèmes obsolètes. En exploitant la puissance du numérique, des données en temps réel et de processus transparents, nous accompagnons les institutions publiques pour optimiser la collecte, simplifier les procédures et libérer de nouvelles sources de revenus.
                    </p>
                    {current === "/about" ? (
                      ""
                    ) : (
                      <div className="about__content-tab-btn mt-35">
                        <a className="fill-btn clip-md-btn" href={"/about"}>
                          En savoir plus
                        </a>
                      </div>
                    )}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="mision"
                    role="tabpanel"
                    aria-labelledby="mision-tab"
                  >
                     <p><strong>Audace:</strong> Capacité de repousser ses limites, sortir de sa zone de confort pour réaliser des actions difficiles.</p>
                      <p><strong>Respect:</strong> Le strict respect aux règlements ainsi qu'à tous les membres du personnel et chacun des clients.</p>
                      <p><strong>Intégrité:</strong> Agir avec honnêteté, respect et prendre des décisions justes ainsi qu'être fidèle à nos valeurs.</p>
                      <p><strong>Loyauté:</strong> Respect de nos engagements par la fidélité à la parole donnée en interne aussi bien qu'en externe vis-à-vis de nos clients et partenaires.</p>

                    {current === "/about" ? (
                      ""
                    ) : (
                      <div className="about__content-tab-btn mt-35">
                        <a className="fill-btn clip-md-btn" href={"/about"}>
                          En savoir plus
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="about__3-img-wrapper p-relative mb-60">
              <div className="about__3-main w-img">
                <Image
                  src={about_img}
                  style={{ width: "100%", height: "auto" }}
                  alt={"A propos de African Shipping Management (ASM) RDC"}
                />
              </div>
              {/* <div className="about__3-text clip-box-sm">
                <span>
                  <i className="far fa-trophy-alt"></i>
                </span>
                <h4 className="about__3-title">25 Years of experience</h4>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsArea;
