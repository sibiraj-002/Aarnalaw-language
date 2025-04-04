"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/components/PracticeArea/InsidePage/Banner";
import PostDetails from "@/components/PracticeArea/InsidePage/PostDetails";
import { initFlowbite } from "flowbite";

const LandingPage = ({ slug }) => {
  const [data, setData] = useState(null);
  const [featureImage, setFeatureImage] = useState();
  const [mobileBanner, setMobileBanner] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [partnersData, setPartnersData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&slug=${slug}`
        );
        const data = await response.json();
        const practiceArea = data[0];

        setFeatureImage(practiceArea.acf.banner_image.url);
        setMobileBanner(practiceArea.acf.mobile_banner.url);
        setTitle(practiceArea.title.rendered);
        setDescription(practiceArea.acf.description);

        // Prepare partner-related data
        const partnerDesignations = [
          practiceArea.acf.partner_designation,
          practiceArea.acf.partner_designation_2,
          practiceArea.acf.partner_designation_3,
        ].filter((designation) => designation);

        const partnerImages = [
          practiceArea.acf.partner_image?.url,
          practiceArea.acf.partner_image_2?.url,
          practiceArea.acf.partner_image_3?.url,
        ].filter((image) => image);

        const partnerNames = [
          practiceArea.acf.partner_name,
          practiceArea.acf.partner_name_2,
          practiceArea.acf.partner_name_3,
        ].filter((name) => name);

        setPartnersData({
          partnerDesignations,
          partnerImages,
          partnerNames,
        });

        setData(practiceArea);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, [slug]);

  return (
    <div>
      <Banner
        backgroundImage={featureImage}
        mobileBackgroundImage={mobileBanner}
        titleText={{ rendered: title, acf: data?.acf }} // Ensure ACF fields are passed
      />

      <PostDetails
        details={data}
        partnersData={partnersData}
        slug={slug}
        titleText={title}
      />
    </div>
  );
};

export default LandingPage;
