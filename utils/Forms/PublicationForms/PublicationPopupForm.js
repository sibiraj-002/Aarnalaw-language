import { useState, useEffect } from "react";
import configData from "../../../config.json";

const PublicationPopupForm = ({ onSubmit, item, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    // Disable body scroll when the popup is open
    document.body.style.overflow = "hidden";

    // Re-enable scroll when the popup is closed
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("publication_user_email");
    const lastSubmission = localStorage.getItem("publication_form_submission");

    if (
      storedEmail &&
      lastSubmission &&
      Date.now() - parseInt(lastSubmission, 10) < 90 * 24 * 60 * 60 * 1000
    ) {
      setLoading(true); // Show loading state
      let dotsCount = 0;
      const interval = setInterval(() => {
        setLoadingText((prev) => {
          // Cycle through loading text (Loading, Loading., Loading.., Loading...)
          dotsCount = (dotsCount + 1) % 4;
          return "Loading" + ".".repeat(dotsCount);
        });
      }, 500); // Update every 500ms

      setTimeout(() => {
        clearInterval(interval); // Stop the loading animation after the redirect
        if (item?.acf?.publication_url) {
          window.location.href = item.acf.publication_url;
        } else if (item?.slug) {
          window.location.href = `/publications/${item.slug}`;
        }
      }, 2000); // Redirect after 2 seconds
    } else {
      setShouldShow(true);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const formPayload = new FormData();
    formPayload.append("your-name", formData.name);
    formPayload.append("your-email", formData.email);

    try {
      const response = await fetch(`${configData.PUBLICATION_USER_FORM}`, {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        localStorage.setItem("publication_user_email", formData.email);
        localStorage.setItem(
          "publication_form_submission",
          Date.now().toString(),
        );

        // Redirect to publication link after form submission
        if (item?.acf?.publication_url) {
          window.location.href = item.acf.publication_url;
        } else if (item?.slug) {
          window.location.href = `/publications/${item.slug}`;
        }
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex w-1/4 flex-col items-center justify-center rounded-lg p-6">
        <div className="spinner-border size-8 animate-spin rounded-full border-t-2 border-solid border-white text-white"></div>
        <h2 className="mt-4 text-xl font-semibold text-white">{loadingText}</h2>
      </div>
    );
  }

  if (!shouldShow) return null;

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 md:w-1/4 lg:m-0">
      <h2 className="mb-4 text-xl font-semibold">Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="rounded bg-red-500 px-4 py-2 text-white"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            className="rounded bg-gray-500 px-4 py-2 text-white"
            onClick={onClose} // Close the popup on click
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicationPopupForm;
