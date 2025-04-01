"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "@/components/ModalContact/page";
import { initFlowbite } from "flowbite";
import { LanguageContext } from "../../../app/context/LanguageContext"; // Import LanguageContext

function PracticeAreaPostDetails({ details, partnersData, slug, titleText }) {
  const { language } = useContext(LanguageContext); // Get selected language
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&per_page=100`
        );
        const result = await response.json();
        if (Array.isArray(result)) {
          // Sort data alphabetically
          const sortedData = result.sort((a, b) =>
            a.title.rendered.localeCompare(b.title.rendered)
          );
          setData(sortedData);
        } else {
          console.error("Expected an array but got:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
    initFlowbite();
  }, []);

  return (
    <>
      <style>
        {`
        .inner-content ol {
          list-style: revert-layer;
          padding-left: 20px;
          padding-bottom: 10px;
        }
        .inner-content li {
          padding-top: 10px;
        }
        `}
      </style>
      <div className="flex w-full flex-col py-5 lg:flex-row">
        <div className="inner-content w-full px-6 md:w-9/12 md:p-14">
          {/* Select details based on language */}
          <p
            dangerouslySetInnerHTML={{
              __html:
                language === "ta" && details?.acf?.tamil_description
                  ? details.acf.tamil_description
                  : language === "kn" && details?.acf?.kannada_description
                    ? details.acf.kannada_description
                    : details?.acf?.description, // Default to English description
            }}
            className="md:px-20"
          />
        </div>

        {/* Sidebar */}
        <div className="w-full bg-gray-50 md:w-3/12">
          {/* Partners Data */}
          {partnersData?.partnerNames?.map((name, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start pt-10 text-center md:px-14 md:pt-14 mb-5"
            >
              {partnersData.partnerImages?.[index] && (
                <Image
                  src={partnersData.partnerImages[index]}
                  alt={name}
                  className="mb-4 size-[200px] rounded-full bg-[#0e1333]"
                  width={200}
                  height={200}
                  loading="lazy"
                />
              )}
              {name && <p className="text-lg font-bold text-custom-red">{name}</p>}
              {partnersData.partnerDesignations?.[index] && (
                <p className="text-sm font-semibold">
                  {partnersData.partnerDesignations[index]}
                </p>
              )}
            </div>
          ))}

          <div className="flex w-full justify-center">
            <ContactModal
              btnName="CONTACT PARTNER"
              textColor="text-black"
              modalTitle={titleText}
              btnType="contactPartner"
              id="contactPartner"
            />
          </div>

          {/* Quick Links */}
          <div className="w-full p-2 pt-10">
            <h2 className="font-bold">Quick Links</h2>
            <hr className="my-4 border-t-2 border-red-500" />
            <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 md:pr-10">
              {data.map((item, index) => {
                // Select title based on language
                const title =
                  language === "ta" && item.acf.tamil_title
                    ? item.acf.tamil_title
                    : language === "kn" && item.acf.kannada_title
                      ? item.acf.kannada_title
                      : item.title.rendered; // Default to English title

                return (
                  <Link
                    href={`/practice-areas/${item.slug}`}
                    className={`flex border-b border-custom-red p-1 hover:text-custom-red ${item.slug === slug ? "font-semibold text-custom-red" : " text-black"
                      }`}
                    key={index}
                  >
                    <p dangerouslySetInnerHTML={{ __html: title }} />
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default PracticeAreaPostDetails;
