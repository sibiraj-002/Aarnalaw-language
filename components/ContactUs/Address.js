import React from "react";
import Link from "next/link";
import { contactAddress } from "@/utils/data";
import { location, phone } from "@/utils/icons";

function Address() {
  return (
    <>
      <div className="mx-auto w-11/12 py-12">
        <p className="mb-4 border-b-2 border-[#EE3C23] pb-[15px] text-left text-[26px] font-semibold leading-normal tracking-[1.6px] text-[#1C386A]">
          Aarna Law
        </p>
        <div className="grid gap-10 lg:grid-cols-3">
          {contactAddress.map((items, index) => (
            <div className="rounded-lg bg-white p-8 shadow-lg" key={index}>
              {items.location && (
                <h2 className="text-xl font-bold">{items.location}</h2>
              )}

              {/* Render location and address only if address is present */}
              {items.address && (
                <div className="flex">
                  <div className="mt-2">{location}</div>
                  <p className="flex gap-2 py-2">{items.address}</p>
                </div>
              )}

              {/* Ensure phone field has a minimum height */}
              <p className="flex items-center gap-2 py-2 ">
                {items.phone ? (
                  <>
                    {phone}
                    {items.phone}
                  </>
                ) : (
                  <span className="block w-full"></span> // Empty block for spacing
                )}
              </p>

              {/* Render direction link only if it's present */}
              {items.direction && (
                <div>
                  <Link
                    href={items.direction}
                    className="text-custom-red"
                    target="_blank"
                  >
                    Get direction
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Address;

