import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../redux/features/authSlice";

function Navbar() {
  const userin = useSelector((state) => state.auth);
  // console.log(userin.userLoggedIn);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const logouthandle=async (e)=>{
    e.preventDefault();
    // console.log("loggin outerHeight...")
    try {
      // console.log("trying...")
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`,{},{
        withCredentials:true
      })
      // console.log("done")
      toast.success(res.data.message)
      dispatch(logoutUser())
      
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <div className="flex z-20 items-center justify-between text-2xl text-white p-[2rem] w-screen h-[5rem] bg-transparent absolute top-0 left-0">
      <div className="flex justify-center items-center gap-[1rem]">
        {/* <Link to={'/Home'}>Home</Link>
      <Link to={'/hello'}>Hello</Link>*/}
      {/* <Link to={'/About'}>About</Link> */}
        <Link to={"/"}>QuickShare</Link>
      </div>
      {!userin.userLoggedIn && (<div className="flex gap-5">
        <Link to={"/login"}>
          <button className=" border p-2 rounded text-[1rem] ">Login</button>
        </Link>
        <Link to={"/signup"}>
          <button className=" border p-2 rounded text-[1rem] ">Sign up</button>
        </Link>
        </div>
      )}
      {userin.userLoggedIn && (
        <div>
          <button onClick={(e)=>logouthandle(e)} className=" border border-red-500 p-2 rounded text-[1rem] ">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
