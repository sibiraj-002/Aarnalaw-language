export async function generateMetadata({ params }) {
  // API URL with the slug parameter
  const apiUrl = `https://docs.aarnalaw.com/wp-json/wp/v2/posts?embed&slug=${params.slug}`;
  
  try {
    // Fetch post data from the API
    const response = await fetch(apiUrl);

    // Handle non-200 responses
    if (!response.ok) {
      console.error("Failed to fetch post data:", response.statusText);
      throw new Error("Failed to fetch post data");
    }

    const postData = await response.json();
    const post = postData[0]; // Assuming the first item in the response is the desired post

    // If no post is found, fallback to default metadata
    if (!post) {
      return getDefaultMetadata(params.slug);
    }

    // Generate metadata from post data
    return {
      title: post.acf?.meta_title
        ? `${post.acf.meta_title} - Insights | Aarna Law`
        : "Insights | Aarna Law",
      description: post.acf?.meta_description || "Insights | Aarna Law",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/insights/${params.slug}`,
        title: post.acf?.meta_title
          ? `${post.acf.meta_title} - Insights | Aarna Law`
          : "Insights | Aarna Law",
        description: post.acf?.meta_description || "Insights | Aarna Law",
        images: post.acf?.mobile_banner
          ? [
              {
                url: post.acf.mobile_banner.url,
                width: 800,
                height: 600,
                alt: post.acf.meta_title || "Insights | Aarna Law",
              },
            ]
          : [
              {
                url: "/aarna-law.png",
                width: 800,
                height: 600,
                alt: "Insights | Aarna Law",
              },
            ],
      },
    };
  } catch (error) {
    // Log the error and fallback to default metadata
    console.error("Error generating metadata:", error);
    return getDefaultMetadata(params.slug);
  }
}

// Function to return default metadata
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
          url: "/aarna-law.png",
          width: 800,
          height: 600,
          alt: "Insights | Aarna Law",
        },
      ],
    },
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
