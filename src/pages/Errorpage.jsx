import React from "react";
import { Link } from "react-router";

function Errorpage({ data }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020b16] px-4">
      <div className="max-w-md w-full text-center bg-[#051121] border border-red-500/40 rounded-xl p-8 shadow-xl">
        
        {/* Icon */}
        <div className="text-red-500 text-6xl mb-4">⚠️</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-red-500 mb-2">
          
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-xl  mb-6">
          {data?.message || "An unexpected error occurred."}
        </p>

        {/* Action */}
        <Link
          to="/"
          className="inline-block mt-2 px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Errorpage;
