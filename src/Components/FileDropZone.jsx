import React, { useState, useRef } from 'react';

function FileDropZone({ onFilesChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null); // Ref to access the hidden file input

  // Handler for when files are selected via the file dialog (click)
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFilesChange(files); // Pass files up to the parent component
    }
  };

  // Handler for when files are dropped onto the drop zone
  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default browser behavior (opening file)
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      onFilesChange(files); // Pass files up to the parent component
    }
  };

  // Prevent default behavior to allow dropping
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Reset dragging state when drag leaves the zone
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Trigger the hidden file input's click event
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`
        relative w-full max-w-lg h-64 rounded-xl border-2 border-dashed
        flex justify-center items-center text-gray-500 text-lg cursor-pointer
        transition-colors duration-200 ease-in-out
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        type="file"
        multiple // Allow multiple files
        accept="*" // Accept any file type
        onChange={handleFileSelect}
        ref={fileInputRef}
        className="hidden" // Hide the default file input
      />
      
      {isDragging ? (
        <span>Drop your files here!</span>
      ) : (
        <span>Click or Drag & Drop to Upload</span>
      )}

      {/* Optional: Add a visual cue for loading/processing if needed */}
    </div>
  );
}

export default FileDropZone;