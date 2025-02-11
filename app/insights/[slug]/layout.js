export async function generateMetadata({ params }) {
  const apiUrl = `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia&slug=${params.slug}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error("Failed to fetch post data:", response.statusText);
      return getDefaultMetadata(params.slug);
    }

    const postData = await response.json();
    const post = postData[0]; // Get the first post

    // Extract meta title and description
    const metaTitle =
      post?.acf?.meta_title?.trim() || post?.title?.rendered || "Insights | Aarna Law";
    const metaDescription =
      post?.acf?.meta_description?.trim() ||
      post?.excerpt?.rendered?.replace(/<\/?[^>]+(>|$)/g, "") ||
      "Insights | Aarna Law";

    // Extract featured image
    let imageUrl = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
    
    // Add a timestamp to the image URL to prevent caching
    if (imageUrl) {
      imageUrl += `?t=${new Date().getTime()}`;
    }

    console.log("Final Featured Image URL:", imageUrl); // Debugging

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
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return getDefaultMetadata(params.slug);
  }
}

// Function to return default metadata if API fails
function getDefaultMetadata(slug) {
  return {
    title: "Insights | Aarna Law",
    description: "Insights | Aarna Law",
    metadataBase: new URL("https://www.aarnalaw.com/"),
    openGraph: {
      url: `https://www.aarnalaw.com/insights/${slug}`,
      title: "Insights | Aarna Law",
      description: "Insights | Aarna Law",
      images: [
        {
          url: "https://www.aarnalaw.com/default-image.jpg",
          width: 1200,
          height: 630,
          alt: "Insights | Aarna Law",
        },
      ],
    },
  };
}

// Root Layout component
export default function RootLayout({ children }) {
  return <>{children}</>;
}
