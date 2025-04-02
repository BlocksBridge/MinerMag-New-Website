"use client";
import React, { useState } from "react";
import { Download } from "lucide-react";

const DownloadReport = ({ reportTitle }: { reportTitle?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to process download
    setTimeout(() => {
      // In a real implementation, you would send the form data to your backend
      console.log("Form submitted:", formData);

      // Trigger download (this would typically be a response from your API)
      const dummyPdfUrl = "/sample-report.pdf";
      const link = document.createElement("a");
      link.href = dummyPdfUrl;
      link.setAttribute("download", "mining-industry-report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSubmitting(false);
      setFormData({ name: "", email: "", companyName: "" });
      closeDialog();
    }, 1500);
  };

  return (
    <>
      <button
        onClick={openDialog}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
        <Download className="h-4 w-4" />
        Download Report
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative animate-in fade-in zoom-in-95">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                Download Report
              </h3>
              <p className="text-sm text-gray-500">
                Please fill in your details to download{" "}
                {reportTitle || "the report"}.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
              </div>{" "}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:pointer-events-none"
                disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Download Report"}
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                By downloading, you agree to our privacy policy and consent to
                receive mining industry updates.
              </p>
            </form>

            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadReport;
