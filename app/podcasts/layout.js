export const metadata = {
  title: "POSTCASTS - Aarna law",
  description:
    "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/podcasts",
  },
  openGraph: {
    title: "POSTCASTS - Aarna law",
    description:
      "News & Insights Resources INSIGHTS AARNA NEWS PUBLICATIONS PODCAST Insights",
    url: "/podcasts",
    images: "/aarna-law.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
