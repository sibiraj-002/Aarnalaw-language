export async function generateMetadata({ params }) {
  const response = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/posts?embed&slug=${params.slug}`
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
            width: 800,
            height: 600,
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
    post?.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "") || // Strip HTML tags
    "Insights | Aarna Law";
  const imageUrl =
    post?.acf?.mobile_banner?.url || "/aarna-law.png"; // Default fallback image

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
          width: 800,
          height: 600,
          alt: metaTitle,
        },
      ],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
