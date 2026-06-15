"use client";
import React from "react";
import { animationCreate } from "@/utils/utils";
import BackToTopCom from "../scroll-to-top/back-to-bottom";

const Wrapper = ({ children }) => {
  React.useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 200);
  }, []);
  return (
    <>
      {children}
      {/* <BackToTopCom /> */}
    </>
  );
};

export default Wrapper;
