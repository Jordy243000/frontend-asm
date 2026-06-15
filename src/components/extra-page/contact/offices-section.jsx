"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { officesByCountry } from "@/constants/offices";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const countryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const OfficeCard = ({ office, index }) => (
  <motion.div
    className="office-card"
    variants={cardVariants}
    whileHover={{ y: -8, transition: { duration: 0.25 } }}
  >
    <div className="office-card__accent" />
    <div className="office-card__header">
      <span className="office-card__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="office-card__city">{office.city}</h4>
    </div>
    <div className="office-card__body">
      <div className="office-card__row">
        <div className="office-card__icon">
          <i className="flaticon-pin" />
        </div>
        <p className="office-card__text">{office.address}</p>
      </div>
      {office.email && (
        <div className="office-card__row">
          <div className="office-card__icon">
            <i className="flaticon-envelope" />
          </div>
          <Link href={`mailto:${office.email}`} className="office-card__email">
            {office.email}
          </Link>
        </div>
      )}
    </div>
    <motion.div
      className="office-card__glow"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);

const CountryBlock = ({ group }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      className="office-country"
      variants={countryVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="office-country__header">
        <motion.span
          className="office-country__flag"
          initial={{ scale: 0, rotate: -20 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        >
          {group.flag}
        </motion.span>
        <div>
          <span className="office-country__label">Pays</span>
          <h3 className="office-country__name">{group.country}</h3>
        </div>
        <span className="office-country__count">
          {group.offices.length} bureau{group.offices.length > 1 ? "x" : ""}
        </span>
      </div>

      <motion.div
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {group.offices.map((office, index) => (
          <div
            key={office.id}
            className="col-xl-4 col-lg-6 col-md-6"
          >
            <OfficeCard office={office} index={index} />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const OfficesSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="offices-area pt-110 pb-120">
      <div className="offices-area__bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          ref={ref}
          className="row justify-content-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="col-xl-8 col-lg-10">
            <div className="section__title text-center mb-60">
              <motion.span
                className="sub-title"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={inView ? { opacity: 1, letterSpacing: "0.15em" } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Présence internationale
              </motion.span>
              <h2 className="title">Nos différents bureaux</h2>
              <p className="offices-area__intro">
                ASM est présent à travers l&apos;Afrique et au-delà. Retrouvez
                nos équipes locales classées par pays pour un accompagnement de
                proximité.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="offices-area__list"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {officesByCountry.map((group) => (
            <CountryBlock key={group.id} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OfficesSection;
