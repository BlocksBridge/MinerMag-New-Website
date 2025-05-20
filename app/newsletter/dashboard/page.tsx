"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

// Mock newsletter data
const NEWSLETTERS = [
  {
    id: 1,
    name: "Daily Digest",
    description: "Top stories delivered every morning",
    subscribed: true,
  },
  {
    id: 2,
    name: "Breaking News",
    description: "Important updates as they happen",
    subscribed: true,
  },
  {
    id: 3,
    name: "Weekly Roundup",
    description: "A summary of the week's top stories",
    subscribed: false,
  },
];

// Toast notification component
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
}

// Custom Switch component
function Switch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// Custom Checkbox component
function Checkbox({ checked, onChange, id }) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
  );
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [newsletters, setNewsletters] = useState(NEWSLETTERS);
  const [emailFrequency, setEmailFrequency] = useState("daily");
  const [notifications, setNotifications] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Set a default user for public access
    setUser({ email: "guest@example.com" });
  }, []);

  const showToast = (message) => {
    setToast(message);
  };

  const hideToast = () => {
    setToast(null);
  };

  const toggleNewsletter = (id) => {
    setNewsletters(
      newsletters.map((newsletter) =>
        newsletter.id === id
          ? { ...newsletter, subscribed: !newsletter.subscribed }
          : newsletter
      )
    );

    showToast("Your newsletter preferences have been saved");
  };

  const handleDeleteAccount = () => {
    showToast("You need to create an account to use this feature");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            TheMinerMag Newsletter
          </h1>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Log Out
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Newsletter Subscriptions Card */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Newsletter Subscriptions
                </h2>
                <p className="text-sm text-gray-500">
                  Manage which newsletters you receive in your inbox
                </p>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {newsletters.map((newsletter) => (
                    <div
                      key={newsletter.id}
                      className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium text-gray-900">
                          {newsletter.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {newsletter.description}
                        </div>
                      </div>
                      <Switch
                        checked={newsletter.subscribed}
                        onChange={() => toggleNewsletter(newsletter.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Preferences Card */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Email Preferences
                </h2>
                <p className="text-sm text-gray-500">
                  Customize how and when you receive our emails
                </p>
              </div>
              <div className="px-6 py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Email Frequency
                  </h3>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="daily"
                        checked={emailFrequency === "daily"}
                        onChange={() => setEmailFrequency("daily")}
                      />
                      <label htmlFor="daily" className="text-sm text-gray-900">
                        Daily (Recommended)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="weekly"
                        checked={emailFrequency === "weekly"}
                        onChange={() => setEmailFrequency("weekly")}
                      />
                      <label htmlFor="weekly" className="text-sm text-gray-900">
                        Weekly digest
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="monthly"
                        checked={emailFrequency === "monthly"}
                        onChange={() => setEmailFrequency("monthly")}
                      />
                      <label
                        htmlFor="monthly"
                        className="text-sm text-gray-900">
                        Monthly summary
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Notification Settings
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm text-gray-900">Pause Emails</div>
                      <div className="text-xs text-gray-500">
                        Temporarily Pause Receiving Emails
                      </div>
                    </div>
                    <Switch
                      checked={notifications}
                      onChange={setNotifications}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Account Settings Card */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Account Settings
                </h2>
                <p className="text-sm text-gray-500">
                  Create an account to save your preferences
                </p>
              </div>
              <div className="px-6 py-4 space-y-4">
                <p className="text-sm text-gray-500">
                  You're currently using the dashboard as a guest. Sign in or
                  create an account to save your preferences.
                </p>

                <div className="flex flex-col gap-2">
                  <a
                    href="/login"
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Change Password
                  </a>
                  <a
                    href="/login"
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Delete Account
                  </a>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-900">
                  Need Help?
                </h2>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-500">
                  If you have any questions about your subscriptions or account,
                  please contact our support team.
                </p>
                <Link
                  href={"/contact-us"}
                  target="_blank"
                  className="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm font-medium mt-2">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && <Toast message={toast} onClose={hideToast} />}
    </div>
  );
}
