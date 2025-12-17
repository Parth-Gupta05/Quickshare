import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../redux/features/authSlice";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          userName: username,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(setUser());
      toast.success("Signup successfull!");
      navigate(-1);
    } catch (error) {
      // console.log(error)
      toast.error(error?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden flex justify-center items-center px-4">

      {/* 🌌 SVG GRID BACKGROUND */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020b16" />
            <stop offset="50%" stopColor="#040f1f" />
            <stop offset="100%" stopColor="#020b16" />
          </linearGradient>

          <radialGradient id="glow1" cx="20%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#ff7a18" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="glow2" cx="80%" cy="70%" r="45%">
            <stop offset="0%" stopColor="#1e90ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        <circle cx="300" cy="250" r="300" fill="url(#glow1)" />
        <circle cx="1100" cy="650" r="350" fill="url(#glow2)" />

        {/* 🔲 GRID (small cells) */}
        <g stroke="#ffffff" strokeOpacity="0.035">
          {[100, 200, 300, 400, 500, 600, 700, 800].map((y) => (
            <line key={`h-${y}`} x1="0" y1={y} x2="1440" y2={y} />
          ))}
          {[120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320].map((x) => (
            <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="900" />
          ))}
        </g>
      </svg>

      {/* 🧩 SIGNUP CARD */}
      <div className="relative z-10 bg-[#051121]/90 backdrop-blur p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-orange-600 font-bold text-center mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div>
            <label className="text-orange-600 font-bold mb-1 block">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#0b1d33] text-white border border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-orange-600 font-bold mb-1 block">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#0b1d33] text-white border border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-orange-600 font-bold mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg bg-[#0b1d33] text-white border border-orange-600 focus:ring-2 focus:ring-orange-600 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-orange-600 font-bold"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
