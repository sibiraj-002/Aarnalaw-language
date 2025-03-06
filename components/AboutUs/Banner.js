import React from "react";

export default function Banner() {
  return (
    <div className="relative h-[600px] bg-[url('/aboutUs/aboutusbanner.png')] bg-cover bg-center ">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="text-5xl font-bold text-white  bg-black/50 p-4">About Us</h1>
      </div>
    </div>
  );
}
