"use client";
import React, { useState } from "react";
import Banner from "@/components/Publication/Banner";
import AllInsights from "@/components/Publication/AllInsights";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function AarnaPublication() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Banner title="publication" />
      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AllInsights searchTerm={searchTerm} />
    </div>
  );
}





// import React from "react";

// import InsightsClient from "./InsightsClient";




// export const metadata = {
//   title: "Legal Publications and Research",
//     description:
//       "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
//     metadataBase: new URL("https://www.aarnalaw.com"),
//     alternates: {
//       canonical: "/publications",
//     },
//     openGraph: {
//       title: "Legal Publications and Research",
//       description:
//         "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
//       url: "/publications",
//        images: "/insights/InsightsBanner.jpg",
//     },
// };

// export default function AarnaInsightsPage() {
//   return <InsightsClient />;
// }

// import Seo from '@/components/SeoComponents/Seo'

// const AarnaInsightsPage = () => {
//   const title = "Legal Publications and Research"
//   const description = "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship."
//   const path = '/publications'
//   const metaImage = '/insights/InsightsBanner.jpg'
//   return (
//     <div>
//       <Seo 
//       title={title}
//       description={description}
//       path={path}
//       metaImage={metaImage}
//       />
//       <InsightsClient />
//     </div>
//   )
// }

// export default AarnaInsightsPage



