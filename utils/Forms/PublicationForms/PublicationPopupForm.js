import { useState } from "react";
import configData from "../../../config.json";

const PublicationPopupForm = ({ onSubmit, onClose, item }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Create the data object for submission
    const formPayload = new FormData();
    formPayload.append("your-name", formData.name);
    formPayload.append("your-email", formData.email);

    try {
      // Make the POST request to the backend
      const response = await fetch(`${configData.PUBLICATION_USER_FORM}`, {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        onSubmit(formData); // Pass form data back to parent on submit
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 rounded-lg bg-white p-6">
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
            className="rounded px-4 py-2 text-red-500"
            disabled={loading} // Disable the submit button while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" className="text-red-500" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicationPopupForm;
