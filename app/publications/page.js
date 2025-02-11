import React from "react";

import InsightsClient from "./InsightsClient";

// import Seo from '@/components/SeoComponents/Seo'


export const metadata = {
  title: "Legal Publications and Research",
    description:
      "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
    metadataBase: new URL("https://www.aarnalaw.com"),
    alternates: {
      canonical: "/publications",
    },
    openGraph: {
      title: "Legal Publications and Research",
      description:
        "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
      url: "/publications",
       images: "/insights/InsightsBanner.jpg",
    },
};

export default function AarnaInsightsPage() {
  return <InsightsClient />;
}

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
