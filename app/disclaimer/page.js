"use client";
import React, { useEffect } from "react";
import Banner from "../../components/Disclaimer/Banner";
import Disclaimer from "../../components/Disclaimer/disclaimer";
import { initFlowbite } from "flowbite";

export default function Careers() {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

  return (
    <>
      <Banner />
      <Disclaimer />
    </>
  );
}