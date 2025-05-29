"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    url?: string;
    error?: string;
  } | null>(null);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadResult({ url: result.url });
      } else {
        setUploadResult({ error: result.error || "Upload failed" });
      }
    } catch (error) {
      setUploadResult({ error: "Network error occurred" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Video to Vercel Blob
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="video-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select your hero video
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>

          {uploading && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Uploading video...
            </div>
          )}

          {uploadResult?.url && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <CheckCircle className="h-4 w-4" />
                Upload successful!
              </div>
              <p className="text-sm text-green-700 break-all">
                URL: {uploadResult.url}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Copy this URL to use in your video component
              </p>
            </div>
          )}

          {uploadResult?.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-4 w-4" />
                {uploadResult.error}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
