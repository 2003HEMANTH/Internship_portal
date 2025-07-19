"use client";
import React, { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft, Calendar, User, Briefcase, Hash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import jsPDF from "jspdf";

interface CertificatePageProps {
  params: Promise<{ id: string }>;
}

export default function CertificatePage({ params }: CertificatePageProps) {
  const { id } = use(params);
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      setError("");
      try {
        const query = `internId=${encodeURIComponent(id)}`;
        const res = await fetch(`/api/certificates?${query}`);
        if (!res.ok) {
          setError(res.status === 404 ? "Certificate not found." : "Failed to fetch certificate.");
          setCertificate(null);
        } else {
          const data = await res.json();
          // Only show if internId matches
          const cert = data[0] || null;
          if (!cert || cert.internId !== id) {
            setCertificate(null);
            setError("Certificate not found.");
          } else {
            setCertificate(cert);
          }
        }
      } catch (e) {
        setError("Failed to fetch certificate.");
        setCertificate(null);
      }
      setLoading(false);
    };
    fetchCertificate();
  }, [id]);

  const handleDownloadPdf = () => {
    if (!certificate?.imageUrl) return;
    setDownloading(true);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [800, 600], // match your image size
    });
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      pdf.addImage(
        img,
        "JPEG",
        0,
        0,
        800,
        600
      );
      pdf.save(
        `Certificate-${certificate.internId || certificate.fullName || "download"}.pdf`
      );
      setDownloading(false);
    };
    img.onerror = function () {
      alert("Failed to load certificate image for PDF download.");
      setDownloading(false);
    };
    img.src = certificate.imageUrl;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }
  if (!certificate) {
    return <div className="min-h-screen flex items-center justify-center">No certificate data.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/int" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Portal</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Certificate Image */}
        <div className="mb-8">
          <Card className="overflow-hidden shadow-2xl border-0 bg-white">
            <div className="relative">
              <Image
                src={certificate.imageUrl || "/placeholder.svg"}
                alt={`Certificate for ${certificate.fullName}`}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  Verified Certificate
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Intern Details Card */}
        <Card className="mb-8">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-900">{certificate.fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Hash className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Intern ID</p>
                <p className="text-lg font-semibold text-gray-900">{certificate.internId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Title</p>
                <p className="text-lg font-semibold text-gray-900">{certificate.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-lg font-semibold text-gray-900">{certificate.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            onClick={handleDownloadPdf}
            type="button"
            disabled={downloading}
          >
            <Download className="w-5 h-5 mr-2" />
            {downloading ? "Preparing PDF..." : "Download PDF Certificate"}
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Click to download your official certificate as a PDF
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>© 2025 HucTech. All rights reserved. | Need help? Contact support@hostupcloud.com</p>
        </div>
      </div>
    </div>
  );
}
