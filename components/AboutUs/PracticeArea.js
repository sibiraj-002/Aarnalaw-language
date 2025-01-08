"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PracticeArea() {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const [loading, setLoading] = useState(true); // Corrected to true for the initial loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&per_page=100`,
        );
        const result = await response.json();

        if (Array.isArray(result)) {
          const sortedData = result.sort((a, b) => {
            const titleA = a.title.rendered.toLowerCase();
            const titleB = b.title.rendered.toLowerCase();
            return titleA.localeCompare(titleB);
          });
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
  }, []);

  return (
    <div className="bg-[#151C4A] py-12">
      <div className="mx-auto w-10/12">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Practice Areas
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white p-4 text-black hover:text-white lg:p-1"
            >
              <Link href={`/practice-areas/${item.slug}`}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.title.rendered,
                  }}
                  className="relative z-10 font-semibold lg:font-normal"
                ></p>
              </Link>
              {/* Background animation */}
              <div className="absolute inset-0 z-0 origin-left scale-x-0 transform bg-gradient-to-r from-custom-blue to-transparent transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
