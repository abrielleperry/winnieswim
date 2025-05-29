export default function UploadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Video Upload Instructions</h1>

        <div className="space-y-4">
          <p>To upload your large video file, you have several options:</p>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h2 className="font-semibold">
              Option 1: Use Vercel Blob (Recommended)
            </h2>
            <ol className="list-decimal ml-5 mt-2 space-y-2">
              <li>
                Install the Vercel CLI:{" "}
                <code className="bg-gray-100 px-1">npm i -g vercel</code>
              </li>
              <li>
                Login to Vercel:{" "}
                <code className="bg-gray-100 px-1">vercel login</code>
              </li>
              <li>
                Upload your video:{" "}
                <code className="bg-gray-100 px-1">
                  vercel blob put path/to/video.mp4
                </code>
              </li>
              <li>Copy the URL from the output</li>
              <li>Update the URL in your video component</li>
            </ol>
          </div>

          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h2 className="font-semibold">
              Option 2: Use a Video Hosting Service
            </h2>
            <ol className="list-decimal ml-5 mt-2 space-y-2">
              <li>Upload your video to a service like Cloudinary or Vimeo</li>
              <li>Get the direct video URL</li>
              <li>Update the URL in your video component</li>
            </ol>
          </div>

          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h2 className="font-semibold">Option 3: Compress Your Video</h2>
            <ol className="list-decimal ml-5 mt-2 space-y-2">
              <li>
                Use a tool like HandBrake to compress your video to under 5MB
              </li>
              <li>Place the compressed video in your public folder</li>
              <li>
                Reference it with{" "}
                <code className="bg-gray-100 px-1">/video-name.mp4</code>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
