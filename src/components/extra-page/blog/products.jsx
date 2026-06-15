import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import React from "react";
import BlogArea from "./blog-area";
import breadcrumb_bg from "@/assets/img/breadcrumb/productBanner.png";

const Products = () => {
  return (
    <main>
      <Breadcrumb
        title="Nos produits"
        subTitle="Produits"
        breadcrumb_bg={breadcrumb_bg.src}
        back={"Accueil"}
        backLink={"/"}
      />
      <BlogArea />
    </main>
  );
};

export default Products;
