import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    " We're here to help and answer any questions you might have. We\
                look forward to hearing from you.",
};
export default function AboutUs() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're here to help and answer any questions you might have. We
                look forward to hearing from you.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 w-8/12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your message"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-1">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-gray-600">
                    For news tips or content-related inquiries
                  </p>
                  <p className="font-medium">news@theminermag.com</p>
                  <p className="text-sm text-gray-600 mt-2">
                    For partnership or advertising inquiries
                  </p>
                  <p className="font-medium">consult@theminermag.com</p>
                  <p className="text-sm text-gray-600 mt-2">
                    For data/API access related inquiries
                  </p>
                  <p className="font-medium">data@theminermag.com</p>
                  <p className="text-sm text-gray-600 mt-2">
                    For API support related inquiries
                  </p>
                  <p className="font-medium">api@theminermag.com</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    Connect With Us
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Follow us on social media
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://x.com/TheMinerMag_"
                      className="text-gray-400 hover:text-blue-500 transition duration-300">
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/theminermag"
                      className="text-gray-400 hover:text-blue-700 transition duration-300">
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://t.me/TheMinerMag"
                      className="text-gray-400 hover:text-blue-600 transition duration-300">
                      <span className="sr-only">Telegram</span>
                      <svg
                        className="h-9 w-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 gap-4 flex flex-col">
            {" "}
            {/* BlocksBridge CTA */}
            <div className="bg-gradient-to-br bg-blue-500 text-white p-6 rounded-lg shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">
                  Powered by BlocksBridge
                </h3>
                <p className="mb-4">
                  We're proud to be part of BlocksBridge Consulting, the leading
                  public relations firm dedicated to the bitcoin mining
                  industry.
                </p>
                <a
                  href="https://blocksbridge.com"
                  className="inline-block bg-white text-black font-normal py-2 px-4 rounded hover:bg-gray-100 transition duration-300">
                  Visit BlocksBridge
                </a>
              </div>
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>
            {/* Social Media */}
          </div>
        </div>
      </div>
    </>
  );
}
