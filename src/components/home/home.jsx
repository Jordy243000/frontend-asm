"use client";
import React, { useContext, useEffect, useState } from "react";
import BannerArea from "./banner-area";
import AboutUsArea from "./about-us-area";
import WorkProcessArea from "./work-process-area";
import TestimonialArea from "./testimonial-area";
import FunfactSection from "./funfact-section";
import BlogSection from "./blog-section";
import ServicesAreaTwo from "./service-area";
import ContactInfoArea from "./contact-info-area";
import BrandSection from "../extra-page/about-us/brand-section";
import ServiceCta from "./service-cta";
import axios from "axios";
import { Icon } from "@iconify/react";

const MainHomePage = () => {
  const [serviceData, setServiceData] = React.useState([]);
  const [blogData, setBlogData] = React.useState([]);
  const [numberData, setNumberData] = React.useState([]);
  const [bannerData, setBannerData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  //console.log(bannerData, "numberrrr");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/banners?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBannerData(bannerResponse?.data?.data);

        const numberResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bignumbers?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setNumberData(numberResponse?.data?.data);

        const solutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/services?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setServiceData(solutionResponse?.data?.data);

        

        const blogResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs?populate=*&pagination[pageSize]=3&sort=publishedAt:desc`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogData(blogResponse?.data?.data);

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

  console.log(numberData, "test");
  

  return (
    <main>
      <BannerArea bannerData={bannerData} />
      <AboutUsArea />
      <ServicesAreaTwo />
      <ServiceCta />
      {/* <TestimonialArea /> */}
      <WorkProcessArea />
      <BrandSection />
      <FunfactSection numberData={numberData} />

      <ContactInfoArea />
      <BlogSection blogData={blogData} />
    </main>
  );
};

export default MainHomePage;
