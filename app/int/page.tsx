"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InternshipPortalLanding() {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState("")
  const [foundCertificate, setFoundCertificate] = useState<any>(null)

  const handleViewCertificate = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    setFetchError("");
    setFoundCertificate(null);
    try {
      let query = "";
      if (inputValue.includes("@")) {
        query = `email=${encodeURIComponent(inputValue.trim())}`;
        const res = await fetch(`/api/certificates?${query}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        if (data.length === 0 || data[0].email !== inputValue.trim()) {
          setFetchError("No certificate found for the provided email.");
        } else {
          setFoundCertificate(data[0]);
          const internId = data[0].internId;
          router.push(`/int/${encodeURIComponent(internId)}`);
        }
      } else {
        // Assume input is internId
        query = `internId=${encodeURIComponent(inputValue.trim())}`;
        const res = await fetch(`/api/certificates?${query}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        if (data.length === 0 || data[0].internId !== inputValue.trim()) {
          setFetchError("No certificate found for the provided intern ID.");
        } else {
          setFoundCertificate(data[0]);
          router.push(`/int/${encodeURIComponent(inputValue.trim())}`);
        }
      }
    } catch (e: any) {
      setFetchError(e.message || "Failed to fetch certificate.");
    }
    setLoading(false);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleViewCertificate()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Internship Certificate Portal</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Enter your registered Email or Internship ID to view your certificate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                Email or Internship ID
              </Label>
              <Input
                id="identifier"
                type="text"
                placeholder="e.g., john@example.com or DNH477KJ0GJ5DJH1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={handleViewCertificate}
              disabled={loading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
            >
              {loading ? "Loading..." : "View Certificate"}
            </Button>
            {fetchError && (
              <div className="mt-4 text-red-500 text-sm">{fetchError}</div>
            )}
            {foundCertificate && foundCertificate.pdfUrl && (
              <a
                href={foundCertificate.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4"
                download
              >
                <Button
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
                  type="button"
                >
                  Download PDF Certificate
                </Button>
              </a>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need help? Contact support at support@huctech.me</p>
        </div>
      </div>
    </div>
  )
}
