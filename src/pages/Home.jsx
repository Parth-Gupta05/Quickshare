import React, { useState, useEffect } from "react";
import RoomCodeInput from "../Components/RoomCodeInput";
import { Link } from "react-router";
import { easeInOut, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser, setUser } from "../redux/features/authSlice";
import Login from "./Login";

function Home() {
  const [code, setCode] = useState([]); // ✅ array
  const [time, setTime] = useState(10);
  const loggedin = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authcheck = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/check`,
        { withCredentials: true }
      );

      response.data?.loggedin
        ? dispatch(setUser())
        : dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ run once (avoid infinite loop)
  useEffect(() => {
    authcheck();
  }, []);

  const finalcodefind = () => {
    if (code.length === 6) return code.join("");
    return "";
  };

  // if (!loggedin.userLoggedIn) return <Login />;

  return (
    <div className="relative w-screen h-screen overflow-hidden ">

      {/* 🌌 SVG BACKGROUND */}
      <svg
        className="absolute inset-0 w-full -z-10 h-full"
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

        <g stroke="#ffffff" strokeOpacity="0.035">
  {/* horizontal lines */}
  {[100, 200, 300, 400, 500, 600, 700, 800].map((y) => (
    <line key={`h-${y}`} x1="0" y1={y} x2="1440" y2={y} />
  ))}

  {/* vertical lines */}
  {[120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320].map((x) => (
    <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="900" />
  ))}
</g>

      </svg>

      {/* 🧩 UI CONTENT */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">

        {/* Heading */}
        <span className="text-white font-thin absolute top-24 sm:top-32 text-lg sm:text-xl left-6 sm:left-12">
          Book Room for minutes{" "}
          <span className="text-orange-600 font-bold">. . .</span>
        </span>

        {/* Room Code Input */}
        <div className="w-full max-w-md flex justify-center">
          <RoomCodeInput setParentCode={setCode} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mt-10 w-full">
          <Link to={finalcodefind()!=""?`/createroom/${finalcodefind()}/${time}`:`/`} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ backgroundColor: "#051A30" }}
              transition={{ duration: 0.1, ease: easeInOut }}
              className="w-full sm:w-auto text-lg sm:text-xl rounded-md text-white p-3 sm:p-5 border border-gray-600 bg-transparent"
            >
              Create Room
            </motion.button>
          </Link>

          <Link to={finalcodefind()!=""?`/joinroom/${finalcodefind()}`:`/`} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ backgroundColor: "#051A30" }}
              transition={{ duration: 0.1, ease: easeInOut }}
              className="w-full sm:w-auto text-lg sm:text-xl rounded-md text-white p-3 sm:p-5 border border-gray-600 bg-transparent"
            >
              Join Room
            </motion.button>
          </Link>

          {/* Time Selector */}
          <select
            value={time}
            disabled={!loggedin.userLoggedIn}
            onChange={(e) => setTime(Number(e.target.value))}
            className="
              w-full sm:w-auto
              min-w-[8rem]
              px-4 py-3 sm:py-2
              rounded-lg
              bg-[#0b1a2f]
              text-white
              text-base sm:text-lg
              text-center
              border border-gray-600
              cursor-pointer
              hover:bg-slate-800
              transition
            "
          >
            <option value={10}>10 min</option>
            <option value={20}>20 min</option>
            <option value={30}>30 min</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Home;
