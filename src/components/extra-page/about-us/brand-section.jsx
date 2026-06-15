"use client";
import React from "react";
//swiper style
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/bundle";
import axios from "axios";

const BrandSection = () => {
  const [brandData, setBrandData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pages, setPages] = React.useState(0);
  const [page, setPage] = React.useState(1);

  //console.log(brandData, "les testiiii");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/partners?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBrandData(brandResponse?.data?.data);

        //setPages(solutionResponse?.data?.meta?.pagination?.pageCount);

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
    <div
      className="brand white-bg two border-tb wow fadeInUp"
      data-wow-duration="1.5s"
      data-wow-delay=".3s"
    >
      <div className="container-fluid p-0">
        <div className="brand-active-2">
          <div
            className="text-center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Swiper
              modules={[Autoplay]}
              slidesPerView={5}
              spaceBetween={150}
              loop={true}
              autoplay={{
                delay: 3000,
                pauseOnMouseEnter: true,
              }}
              // Responsive breakpoints
              breakpoints={{
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 120,
                },
                1200: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 100,
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 70,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
            >
              {brandData?.map((item) => (
                <SwiperSlide
                  key={item?.id}
                  style={{
                    display: "flex",
                    //justifyContent: "center",
                    //alignContent: "center",
                    alignItems: "center",
                    //border: "1px solid red",
                  }}
                >
                  <div>
                    <div className="brand-items-2">
                      <img
                        src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.logo?.data?.attributes?.url}`}
                        style={{ width: "100%", height: "auto" }}
                        className="img-fluid"
                        alt={`${item?.attributes?.name}-Partenaires-African Shipping Management(ASM) RDC`}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
