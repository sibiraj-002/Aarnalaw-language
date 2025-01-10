import React from "react";

export default function Banner({ title }) {
  return (
    <div className="relative h-[70vh] md:bg-[url('/insights/InsightsBanner.jpg')] bg-[url('/insights/InsightsMobileBanner.jpg')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="text-5xl font-bold tracking-wide text-white bg-black/50 p-4">
          Aarna News
        </h1>
      </div>
    </div>
  );
}
