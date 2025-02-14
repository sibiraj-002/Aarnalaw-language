export async function generateMetadata({ params }) {
  try {
    const response = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia&slug=${params.slug}`
    );

    if (!response.ok) {
      console.error("Failed to fetch post data:", response.statusText);
      return getDefaultMetadata(params.slug);
    }

    const postData = await response.json();
    const post = postData.length > 0 ? postData[0] : null;

    if (!post) {
      console.error("No post found.");
      return getDefaultMetadata(params.slug);
    }

    // Get the featured image dynamically
    const featuredImage =
      post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

    return {
      title: `${post.title.rendered} - Aarna News | Aarna Law`,
      description: post?.excerpt?.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/aarna-news/${params.slug}`,
        title: `${post.title.rendered} - Aarna News | Aarna Law`,
        description: post?.excerpt?.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
        images: featuredImage
          ? [{ url: featuredImage, width: 1200, height: 630, alt: post.title.rendered }]
          : [],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return getDefaultMetadata(params.slug);
  }
}

// Function to return default metadata if data is missing
function getDefaultMetadata(slug) {
  return {
    title: "Aarna News | Aarna Law",
    description: "Aarna News | Aarna Law",
    metadataBase: new URL("https://www.aarnalaw.com/"),
    openGraph: {
      url: `https://www.aarnalaw.com/aarna-news/${slug}`,
      title: "Aarna News | Aarna Law",
      description: "Aarna News | Aarna Law",
      images: [{ url: "/aarna-law.png", width: 1200, height: 630, alt: "Aarna Law" }],
    },
  };
}

// ✅ Ensure a React Component is exported
export default function AarnaNewsPage({ children }) {
  return <>{children}</>;
}
