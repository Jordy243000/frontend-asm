"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";

import blog_img from "@/assets/img/blog/blog1.png";
import { Pagination, Stack } from "@mui/material";

const product_data = [
  {
    id: "1",
    image: blog_img,
    title: "SYGREM",
    slogan: "Optimisez la Gestion de Redevances Maritimes",
    description:
      "SYGREM (Système Intégré de Gestion de Redevance Maritime) est une solution complète permettant une gestion efficace et transparente des redevances maritimes. Ce système couvre l'automatisation de la tarification, la facturation, le suivi des paiements et l’intégration avec les systèmes portuaires pour assurer une conformité totale avec les normes internationales.",
    link: "https://www.africansm-formation.com/#/auth",
    modules: [
      {
        title: "Gestion des Redevances",
        description:
          "Automatisation du calcul et du suivi des redevances portuaires avec des outils de reporting avancés.",
        feature: [
          {
            title: "Tarification Dynamique",
            description:
              "Application des tarifs en fonction des types de navires, du tonnage et de la durée d’escale.",
          },
          {
            title: "Facturation Automatisée",
            description:
              "Génération instantanée des factures et intégration avec divers modes de paiement sécurisés.",
          },
          {
            title: "Gestion des Dettes",
            description:
              "Suivi des paiements en attente et envoi d'alertes automatiques aux redevables.",
          },
        ],
      },
      {
        title: "Suivi des Opérations Portuaires",
        description:
          "Un tableau de bord en temps réel pour gérer les entrées et sorties des navires et optimiser les flux maritimes.",
        feature: [
          {
            title: "Suivi en Temps Réel",
            description:
              "Intégration avec AIS pour visualiser les mouvements des navires en direct.",
          },
          {
            title: "Interopérabilité avec les PCS",
            description:
              "Connexion avec les Port Community Systems pour un échange fluide des données.",
          },
        ],
      },
      {
        title: "Sécurité et Conformité",
        description:
          "Assurez une conformité totale avec les réglementations maritimes internationales grâce à nos outils de gestion et d’audit.",
        feature: [
          {
            title: "Gestion des Licences",
            description:
              "Enregistrement et suivi des permis et licences maritimes en conformité avec l'OMI.",
          },
          {
            title: "Audit et Traçabilité",
            description:
              "Enregistrement de toutes les opérations pour assurer une transparence totale.",
          },
        ],
      },
    ],
    techStack: [
      {
        title: "Next JS",
        desc: "Front-end Development",
        icon: "teenyicons:nextjs-solid",
      },
      {
        title: "Strapi",
        desc: "Back-end Management",
        icon: "logos:strapi-icon",
      },
      {
        title: "PostgreSQL",
        desc: "Database Management",
        icon: "logos:postgresql",
      },
      { title: "Python", desc: "Custom Plugins", icon: "logos:python" },
    ],
    users: [{ title: "Almer", logo: "/images/client/sokimo.png" }],
  },
];

const PostArea = () => {
  const [serviceData, setServiceData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pages, setPages] = React.useState(0);
  const [page, setPage] = React.useState(1);

  console.log(serviceData, "okayyyyyy");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const solutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?populate=*&pagination[page]=${page}&pagination[pageSize]=12`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setServiceData(solutionResponse?.data?.data);

        setPages(solutionResponse?.data?.meta?.pagination?.pageCount);

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
  }, [page]);

  return (
    <>
      <div className="">
        <div className="row postbox__wrapper">
          {serviceData?.map((item, idx) => (
            <div
              key={idx}
              className="col-lg-6 postbox__item format-image mb-55"
            >
              <div className="postbox__thumb w-img mb-10">
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.photo?.data?.attributes.url}`}
                  alt={`Produit-${item?.attributes?.title} - African Shipping Management(ASM) RDC`}
                />
              </div>
              <div className="postbox__content">
                <div className="section__title mb-20">
                  <Link href={`/products/${item?.id}`}>
                    <h3 className="title-sm">{item?.attributes?.title}</h3>
                  </Link>
                </div>
                <div className="postbox__text mb-30">
                  <blockquote>
                    {item?.attributes?.description?.length > 150
                      ? `${item?.attributes?.description?.substring(0, 150)}...`
                      : item?.attributes?.description}
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
        {serviceData?.length > 0 ? (
          <Stack sx={{ alignItems: "center" }}>
            <form autoComplete="off" noValidate onSubmit={() => {}}>
              <Pagination
                count={pages}
                // variant="outlined"
                color="primary"
                page={page}
                // onClick={handleSubmit}
                onChange={(event, val) => {
                  // formik.setFieldValue("page", val);
                  setPage(val);
                }}
              />
            </form>
          </Stack>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PostArea;
