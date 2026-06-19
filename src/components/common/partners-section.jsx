"use client";

import React from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/bundle";

const PartnersSection = () => {
  const [partners, setPartners] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/partners?populate=*&sort=sortOrder:asc`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPartners(response?.data?.data || []);
      } catch (error) {
        console.error("Erreur chargement partenaires:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (!isLoading && partners.length === 0) {
    return null;
  }

  return (
    <section
      className="partners-area pt-110 pb-110 wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".2s"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div className="section__title text-center mb-55">
              <span className="sub-title">Ils nous font confiance</span>
              <h2 className="title">Nos partenaires</h2>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="partners-area__loading text-center">
            <span>Chargement des partenaires...</span>
          </div>
        ) : (
          <div className="partners-area__slider">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={40}
              loop={partners.length > 3}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                576: { slidesPerView: 2, spaceBetween: 50 },
                768: { slidesPerView: 2, spaceBetween: 60 },
                992: { slidesPerView: 3, spaceBetween: 70 },
                1200: { slidesPerView: 3, spaceBetween: 80 },
              }}
            >
              {partners.map((item) => {
                const logoUrl = `${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.logo?.data?.attributes?.url}`;
                const website = item?.attributes?.website;
                const name = item?.attributes?.name;

                const logo = (
                  <img
                    src={logoUrl}
                    alt={`${name} - Partenaire ASM RDC`}
                    className="partners-area__logo img-fluid"
                    loading="lazy"
                  />
                );

                return (
                  <SwiperSlide key={item.id}>
                    <div className="partners-area__card">
                      {website ? (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={name}
                        >
                          {logo}
                        </a>
                      ) : (
                        logo
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
