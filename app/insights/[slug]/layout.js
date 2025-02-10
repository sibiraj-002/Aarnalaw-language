export async function generateMetadata({ params }) {
  const response = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia&slug=${params.slug}`
  );
  

  if (!response.ok) {
    console.error("Failed to fetch post data:", response.statusText);
    return {
      title: "Insights | Aarna Law",
      description: "Insights | Aarna Law",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/insights/${params.slug}`,
        title: "Insights | Aarna Law",
        description: "Insights | Aarna Law",
        images: [
          {
            url: "/aarna-law.png",
            width: 1200,
            height: 630,
            alt: "Insights | Aarna Law",
          },
        ],
      },
    };

    
  }

  const postData = await response.json();
  const post = postData[0]; // Access the first post

  // Fallback checks for meta title and description
  const metaTitle =
    post?.acf?.meta_title?.trim() || post?.title?.rendered || "Insights | Aarna Law";
  const metaDescription =
    post?.acf?.meta_description?.trim() ||
    post?.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "") ||
    "Insights | Aarna Law";

  // Use only the featured image from `wp:featuredmedia`
  const imageUrl =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/aarna-law.png";

  return {
    title: `${metaTitle} - Insights | Aarna Law`,
    description: metaDescription,
    metadataBase: new URL("https://www.aarnalaw.com/"),
    openGraph: {
      url: `https://www.aarnalaw.com/insights/${params.slug}`,
      title: `${metaTitle} - Insights | Aarna Law`,
      description: metaDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle} - Insights | Aarna Law`,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
