"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { logout } from "./logout";

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
// Reusable Modal Component
function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Close</span>
            &times;
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
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
  const [newsletters, setNewsletters] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [toast, setToast] = useState(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deletePassword, setDeletePassword] = useState(""); // Password for delete confirmation
  const [deleteAccountError, setDeleteAccountError] = useState(""); // Specific error for delete account

  useEffect(() => {
    // Set a default user for public access
    (async () => {
      let data = await fetch(`/api/newsletter`).then((res) => res.json());
      console.log(data, data.email_preferences), "data";
      setUser(data.email);
      setNewsletters(data.email_preferences.newsletters);
      setNotifications(data.email_preferences.email_paused);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (user) {
        await fetch(`/api/newsletter`, {
          method: "POST",
          body: JSON.stringify({
            email_preferences: {
              newsletters: newsletters,
              email_paused: notifications,
            },
          }),
        }).then((res) => res.json());
      }
    })();
  }, [newsletters, notifications]);

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
  const handlePasswordChange = async () => {
    setPasswordError(""); // Clear previous errors

    if (!newPassword || !confirmNewPassword) {
      setPasswordError("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      // Example: minimum password length
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // In a real application, you might also send the current password for verification
      const res = await fetch(`/api/newsletter/reset`, {
        // Using the same endpoint but with a different payload
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (res.ok) {
        showToast("Your password has been changed successfully!");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowResetPasswordModal(false);
      } else {
        const errorData = await res.json();
        showToast(errorData.message || "Failed to change password.");
        setPasswordError(errorData.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showToast("An error occurred while changing password.");
      setPasswordError("An unexpected error occurred.");
    }
  };
  const handleDeleteAccount = async () => {
    setDeleteAccountError(""); // Clear previous errors

    if (!deletePassword) {
      setDeleteAccountError("Please enter your password to confirm.");
      return;
    }

    try {
      const res = await fetch(`/api/newsletter/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: deletePassword }), // Send the entered password
      });

      if (res.ok) {
        showToast("Your account has been successfully deleted.");
        logout(); // Log the user out after deletion
      } else {
        const errorData = await res.json();
        setDeleteAccountError(
          errorData.message ||
            "Failed to delete account. Please check your password."
        );
        showToast(errorData.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      showToast("An error occurred during account deletion.");
      setDeleteAccountError("An unexpected error occurred.");
    } finally {
      // Don't close the modal on error, let the user see the error message
      // Only close on success or explicit cancel
      if (res && res.ok) {
        setShowDeleteAccountModal(false);
      }
    }
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
            <button
              onClick={async () => {
                logout();
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Log Out
            </button>
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
              </div>
              <div className="px-6 py-4 space-y-6">
                <div className="space-y-4">
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
                  <button
                    onClick={() => setShowResetPasswordModal(true)}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Change Password
                  </button>
                  <button
                    onClick={() => setShowDeleteAccountModal(true)}
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Delete Account
                  </button>
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
      {/* Reset Password Modal */}
      {/* Change Password Modal */}
      {showResetPasswordModal && (
        <Modal
          title="Change Password"
          onClose={() => setShowResetPasswordModal(false)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-new-password"
                className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirm new password"
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setShowResetPasswordModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={handlePasswordChange}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Set New Password
            </button>
          </div>
        </Modal>
      )}
      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <Modal
          title="Delete Account"
          onClose={() => setShowDeleteAccountModal(false)}>
          <div className="space-y-4">
            <p className="text-sm text-red-700">
              Are you sure you want to delete your account? This action cannot
              be undone. All your data will be permanently removed.
            </p>
            <p className="text-sm text-gray-700">
              Please enter your password to confirm:
            </p>
            <div>
              <label htmlFor="delete-password" className="sr-only">
                {" "}
                {/* Screen reader only label */}
                Your Password
              </label>
              <input
                type="password"
                id="delete-password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
            {deleteAccountError && (
              <p className="text-sm text-red-600">{deleteAccountError}</p>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setShowDeleteAccountModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
              Confirm Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
