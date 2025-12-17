import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import FileDropZone from "../Components/FileDropZone.jsx";
import { motion, AnimatePresence } from "motion/react";
import Errorpage from "./Errorpage.jsx";
import FileRoomCard from "../Components/FileRoomCard.jsx";
import axios from "axios";
import { FilePreviewer } from "../Components/FilePreviewer.jsx";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function JoinRoom() {
  const { id } = useParams();
  const data = useLoaderData();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [time, settime] = useState(10);
  const [file,setFile]=useState(null)
  const navigate=useNavigate()

  
  const loggedin = useSelector((state) => state.auth);

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please select files first.");
      return;
    }

    setUploadStatus("uploading");

    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("roomcode", id);
    formData.append("time", time);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/file-upload/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // console.log("Server response:", response.data);
      setUploadStatus("success");
      toast.success("Files uploaded successfully");
      setUploadedFiles([]);
      navigate(`/joinroom/${id}`)
    } catch (error) {
      // console.error("Upload failed:", error);
      setUploadStatus("error");
      const errMsg = error.response?.data?.message || "Server error occurred.";
      // alert(`Upload failed: ${errMsg}`);
      toast.error(`Upload failed: ${errMsg}`)
    }
  };

  const handleFilesUploaded = async (files) => {
    await setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    // console.log("Files received:", uploadedFiles);
    setUploadStatus("idle");
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const [previewFileIndex, setPreviewFileIndex] = useState(null);
  // console.log(previewFileIndex)
  const fileToPreview = previewFileIndex !== null 
      ? data.body?.parsedredisdata?.[previewFileIndex] 
      : null;
// console.log(fileToPreview)
  return data.result.status === 404 ? (
    <Errorpage data={data.body} />
  ) : (
    <div className="text-white relative min-h-screen">
      <AnimatePresence>
        {fileToPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // 💡 Key: Fixed position, high Z-index, covers entire viewport
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full h-full max-w-4xl max-h-[90vh] bg-slate-800 rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewFileIndex(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-700/80 hover:bg-red-600 rounded-full text-white transition-all"
                aria-label="Close Preview"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* File Previewer Content */}
              <div className="w-full h-full p-4 md:p-8 overflow-y-auto">
                <FilePreviewer 
                  filedata={{
                    fileUrl: fileToPreview.url,
                    fileType: fileToPreview.format // Assuming 'format' is the file type
                  }} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated Loading Overlay */}
      <AnimatePresence>
        {uploadStatus === "uploading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-slate-800/95 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-6">
              

              {/* Animated Text */}
              <div className="flex items-center gap-2 text-2xl font-medium">
                <span>Uploading</span>
                <motion.span
                  className="text-orange-600 font-bold"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ...
                </motion.span>
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12 mt-20">
        {/* Room Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-light mb-2">
            Room{" "}
            <span className="text-orange-600 font-semibold">"{id}"</span>
          </h1>
          <div className="h-1 w-24 bg-orange-600 rounded-full"></div>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl p-8 mb-8 border border-slate-700/50"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Upload Your Documents
          </h2>

          <FileDropZone onFilesChange={handleFilesUploaded} />

          {/* Selected Files and Time Selector */}
          <div className="mt-8 flex flex-col lg:flex-row gap-8 justify-between items-start">
            {/* Selected Files List */}
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 w-full"
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  Selected Files
                  <span className="text-sm font-normal text-slate-400">
                    ({uploadedFiles.length})
                  </span>
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between bg-slate-700/50 rounded-lg px-4 py-3 border border-slate-600/50 hover:border-orange-600/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate font-medium">
                          {file.name}
                        </p>
                        <p className="text-sm text-slate-400">
                          {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Time Selector */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="time"
                className="text-sm font-medium text-slate-300"
              >
                Expiry Time
              </label>
              <select
                value={time}
                onChange={(e) => settime(Number(e.target.value))}
                className="px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 hover:border-orange-600 focus:border-orange-600 focus:outline-none cursor-pointer transition-all"
                disabled={!loggedin.userLoggedIn}
                name="time"
                id="time"
              >
                <option value={10}>10 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
          </div>

          {/* Upload Button */}
          <motion.button
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0}
            whileHover={{ scale: uploadedFiles.length > 0 ? 1.02 : 1 }}
            whileTap={{ scale: uploadedFiles.length > 0 ? 0.98 : 1 }}
            className={`w-full mt-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              uploadedFiles.length > 0
                ? "bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            {uploadedFiles.length > 0
              ? `Upload ${uploadedFiles.length} File${
                  uploadedFiles.length > 1 ? "s" : ""
                }`
              : "Select Files to Upload"}
          </motion.button>
        </motion.div>

        {/* Existing Files Section */}
        {data.body?.parsedredisdata?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50"
          >
            <h2 className="text-2xl font-semibold mb-6">Room Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.body.parsedredisdata.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FileRoomCard data={file} file={index} setFile={setPreviewFileIndex} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default JoinRoom;

export const loadJoinRoomData = async ({ params }) => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/rooms/joinroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      roomcode: params.id,
    }),
  });
  // console.log(result);
  const body = await result.json();
  // console.log(body);
  return { body, result };
};