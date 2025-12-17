import React from "react";

export const FilePreviewer = ({ filedata }) => {
  if (!filedata || !filedata.fileUrl) {
    return (
      <p className="text-red-400 text-center">
        No file selected for preview.
      </p>
    );
  }

  const { fileUrl, fileType, fileName } = filedata;
  const lowerType = fileType?.split("/").pop().toLowerCase() || "";

  // 🔗 Common Download/Open button
  const DownloadButton = () => (
    <div className="mb-4">
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-md transition-all duration-200"
        download={fileName || true}
      >
        Open / Download File
      </a>
    </div>
  );

  // 🖼️ Image Preview
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(lowerType)) {
    return (
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
        <DownloadButton />
        <img
          src={fileUrl}
          alt="Preview"
          className="max-h-[75vh] rounded-lg border border-slate-600 shadow-lg"
        />
      </div>
    );
  }

  // 📄 PDF Preview
  if (lowerType === "pdf") {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">PDF Document</h3>
        <DownloadButton />
        <div className="w-full h-[80vh] mt-4 border border-slate-700 rounded-lg overflow-hidden">
          <iframe
            src={fileUrl}
            title="PDF Preview"
            className="w-full h-full rounded-lg"
            frameBorder="0"
          >
            This browser does not support inline PDFs.{" "}
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Download here
            </a>
            .
          </iframe>
        </div>
      </div>
    );
  }

  // 🎞️ Video Preview
  if (["mp4", "webm", "ogg"].includes(lowerType)) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Video Preview</h3>
        <DownloadButton />
        <video
          src={fileUrl}
          controls
          className="max-h-[75vh] w-full rounded-lg border border-slate-600 shadow-lg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // 📜 Text or Code Preview
  if (["txt", "json", "js", "html", "css", "md"].includes(lowerType)) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Text File Preview</h3>
        <DownloadButton />
        <iframe
          src={fileUrl}
          className="w-full h-[75vh] bg-slate-900 text-white p-4 rounded-lg border border-slate-700"
          title="Text Preview"
        ></iframe>
      </div>
    );
  }

  // ❌ Fallback for unknown formats
  return (
    <div className="text-center text-slate-300">
      <p>Cannot display preview for this file type.</p>
      <DownloadButton />
    </div>
  );
};
