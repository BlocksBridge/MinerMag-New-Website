"use client";

import { useState } from "react";
import {
  Send,
  Mail,
  Calendar,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type NewsletterType = "weekly" | "monthly" | "new-article";

interface SendStatus {
  type: NewsletterType | null;
  status: "idle" | "sending" | "success" | "error";
  message: string;
  emailCount?: number;
}

export default function NewsletterAdmin() {
  const [sendStatus, setSendStatus] = useState<SendStatus>({
    type: null,
    status: "idle",
    message: "",
  });

  const sendNewsletter = async (type: NewsletterType) => {
    setSendStatus({
      type,
      status: "sending",
      message: "Sending newsletter...",
    });

    try {
      const response = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send newsletter");
      }

      setSendStatus({
        type,
        status: "success",
        message: `Newsletter sent successfully to ${data.emailCount} subscribers!`,
        emailCount: data.emailCount,
      });
    } catch (error) {
      setSendStatus({
        type,
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to send newsletter",
      });
    }
  };

  const getButtonIcon = (type: NewsletterType) => {
    if (sendStatus.type === type && sendStatus.status === "sending") {
      return <Loader2 className="w-5 h-5 animate-spin" />;
    }

    switch (type) {
      case "weekly":
        return <Calendar className="w-5 h-5" />;
      case "monthly":
        return <Mail className="w-5 h-5" />;
      case "new-article":
        return <FileText className="w-5 h-5" />;
      default:
        return <Send className="w-5 h-5" />;
    }
  };

  const getButtonText = (type: NewsletterType) => {
    if (sendStatus.type === type && sendStatus.status === "sending") {
      return "Sending...";
    }

    switch (type) {
      case "weekly":
        return "Send Weekly Newsletter";
      case "monthly":
        return "Send Monthly Newsletter";
      case "new-article":
        return "Send New Article Alert";
      default:
        return "Send";
    }
  };

  const isButtonDisabled = (type: NewsletterType) => {
    return sendStatus.status === "sending" && sendStatus.type === type;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Newsletter Admin
            </h1>
          </div>
          <p className="text-gray-600">
            Send newsletters to all subscribers in your database
          </p>
        </div>

        {/* Status Alert */}
        {sendStatus.status !== "idle" && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              sendStatus.status === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : sendStatus.status === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}>
            <div className="flex items-center gap-2">
              {sendStatus.status === "success" && (
                <CheckCircle className="w-5 h-5" />
              )}
              {sendStatus.status === "error" && (
                <AlertCircle className="w-5 h-5" />
              )}
              {sendStatus.status === "sending" && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
              <span className="font-medium">{sendStatus.message}</span>
            </div>
          </div>
        )}

        {/* Newsletter Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Weekly Newsletter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 rounded-lg p-2">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Weekly Newsletter
                </h2>
                <p className="text-sm text-gray-600">
                  Weekly digest of crypto mining news
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Content:</span>
                <p className="text-gray-600 mt-1">
                  Breaking news, weekly market movements, and top stories
                </p>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Frequency:</span>
                <p className="text-gray-600 mt-1">Every week</p>
              </div>
            </div>

            <button
              onClick={() => sendNewsletter("weekly")}
              disabled={isButtonDisabled("weekly")}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
              {getButtonIcon("weekly")}
              {getButtonText("weekly")}
            </button>
          </div>

          {/* Monthly Newsletter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 rounded-lg p-2">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Monthly Newsletter
                </h2>
                <p className="text-sm text-gray-600">
                  Comprehensive monthly roundup
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Content:</span>
                <p className="text-gray-600 mt-1">
                  Featured stories, market data, and industry insights
                </p>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Frequency:</span>
                <p className="text-gray-600 mt-1">Monthly digest</p>
              </div>
            </div>

            <button
              onClick={() => sendNewsletter("monthly")}
              disabled={isButtonDisabled("monthly")}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
              {getButtonIcon("monthly")}
              {getButtonText("monthly")}
            </button>
          </div>

          {/* New Article Alert */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 rounded-lg p-2">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  New Article Alert
                </h2>
                <p className="text-sm text-gray-600">
                  Instant notification for new articles
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Content:</span>
                <p className="text-gray-600 mt-1">
                  Article summary, key highlights, and call-to-action
                </p>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Frequency:</span>
                <p className="text-gray-600 mt-1">On-demand</p>
              </div>
            </div>

            <button
              onClick={() => sendNewsletter("new-article")}
              disabled={isButtonDisabled("new-article")}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
              {getButtonIcon("new-article")}
              {getButtonText("new-article")}
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {sendStatus.status === "success" && sendStatus.type && (
              <div className="flex items-center justify-between py-3 px-4 bg-green-50 rounded-md border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">
                      {sendStatus.type === "weekly" && "Weekly Newsletter Sent"}
                      {sendStatus.type === "monthly" &&
                        "Monthly Newsletter Sent"}
                      {sendStatus.type === "new-article" &&
                        "New Article Alert Sent"}
                    </p>
                    <p className="text-sm text-green-700">
                      Delivered to {sendStatus.emailCount} subscribers
                    </p>
                  </div>
                </div>
                <span className="text-sm text-green-600">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            )}

            {sendStatus.status === "idle" && (
              <div className="text-center py-8 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent newsletter activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
