"use client";
import React from "react";
import axios from "axios";

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from "@iconify/react";

const TeamSectionArea = () => {
    const [serviceData, setServiceData] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(false);
      const [errorMsg, setErrorMsg] = React.useState("");
    
      React.useEffect(() => {
        const fetchData = async () => {
          try {
            const solutionResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/teams?populate=*`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setServiceData(solutionResponse?.data?.data);
    
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


      console.log(serviceData,"nope");
      
    return (
        <section className="team__3 pt-120 pb-70 wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".3s">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="section__title mb-55 text-center">
                            <span className="sub-title">Equipe</span>
                            <h2 className="title">Nos experts</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {serviceData?.map((item) => (
                            <div className="col-xl-4 col-lg-4 col-md-6" key={item?.id}>
                                <div className="team__3-item mb-50">
                                    <div className="team__3-item-img w-img">
                                        <Link href={`/team-details/1`}>
                                           
                                        <img
                                        style={{ width: "100%", height: "auto" }}
                        src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.photo?.data?.attributes.url}`}
                        alt={`Team-${serviceData?.attributes?.name} - African Shipping Management(ASM) RDC`}
                      />
                                       
                                        </Link>
                                        <div className="team__3-item-social"><ul >
                                            {item?.attributes?.
social?.map((datum, idx)=>{return(
     <li key={idx}>
                          <Link target="_blank" href={`${datum?.link}`}>
                            <Icon
                              icon={datum?.icon}
                              width="16"
                              height="16"
                            />
                          </Link>
                        </li>
    
)})}
                                </ul>               
                                        </div>
                                        <div className="team__3-item-content">
                                            <span className="team__3-item-subtitle">{item?.attributes?.designation}</span>
                                            <h4 className="team__3-item-title">
                                                <Link href={`/team-details/1`}>{item?.attributes?.name}</Link>
                                                </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default TeamSectionArea;