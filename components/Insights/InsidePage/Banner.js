import React from "react";
import Image from "next/image";

export default function Banner({ title, backgroundImage }) {
  if (!backgroundImage) return null; // Do not render if no image is provided

  return (
    <div>
      <Image
        src={backgroundImage}
        width={600}
        height={600}
        className="w-full"
        alt={title}
        loading="lazy"
      />
    </div>
  );
}
