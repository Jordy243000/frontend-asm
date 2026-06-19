"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import breadcrumb_bg from "@/assets/img/breadcrumb/aboutBanner.png";

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const formatDate = (value) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const CarriereList = () => {
  const [offers, setOffers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/job-offers?populate=*&filters[isOpen][$eq]=true&sort=sortOrder:asc`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setOffers(response?.data?.data ?? []);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(
          error.response?.data?.error?.message || error.toString()
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <main>
      <Breadcrumb
        title="Carrières"
        subTitle="carrière"
        breadcrumb_bg={breadcrumb_bg.src}
        back="Accueil"
        backLink="/"
      />

      <section className="career-area pt-115 pb-90">
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <div className="section__title">
                <span className="sub-title">Carrière</span>
                <h2 className="title">Rejoignez notre équipe</h2>
                <p>
                  Découvrez nos offres d&apos;emploi et postulez en ligne en
                  envoyant votre CV.
                </p>
              </div>
            </div>
          </div>

          {isLoading && <p className="text-center">Chargement des offres...</p>}
          {!isLoading && errorMsg && (
            <p className="text-center text-danger">{errorMsg}</p>
          )}
          {!isLoading && !errorMsg && offers.length === 0 && (
            <p className="text-center">
              Aucune offre disponible pour le moment. Revenez bientôt.
            </p>
          )}

          <div className="row">
            {offers.map((offer) => {
              const attrs = offer.attributes;
              const preview = stripHtml(attrs?.description).slice(0, 180);

              return (
                <div className="col-lg-6 mb-40" key={offer.id}>
                  <div className="job-wrapper h-100">
                    <div className="job-instructor-profile">
                      <div className="job-instructor-info">
                        <div className="job-tag mb-15">
                          {attrs?.contractType && (
                            <span>{attrs.contractType}</span>
                          )}
                          {attrs?.department && <span>{attrs.department}</span>}
                        </div>
                        <div className="job-instructor-title">
                          <h3>
                            <Link href={`/carriere/${offer.id}`}>
                              {attrs?.title}
                            </Link>
                          </h3>
                          {attrs?.location && (
                            <span>
                              <i className="fal fa-map-marker-alt" />{" "}
                              {attrs.location}
                            </span>
                          )}
                        </div>
                        {preview && <p className="mt-15">{preview}...</p>}
                        <div className="job-meta mt-20">
                          {attrs?.deadline && (
                            <span>
                              <i className="fal fa-calendar-alt" /> Date limite :{" "}
                              {formatDate(attrs.deadline)}
                            </span>
                          )}
                        </div>
                        <div className="mt-30">
                          <Link
                            href={`/carriere/${offer.id}`}
                            className="job-btn"
                          >
                            Postuler
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CarriereList;
