import { createBrowserRouter } from "react-router";
import App from "../src/App.jsx";
import { loadAuthData } from "./loaderFunctions.js";
import Home from "../src/pages/Home.jsx";
import Login from "../src/pages/Login.jsx";
import Room, { loadRoomData } from "../src/pages/Room.jsx";
import JoinRoom, { loadJoinRoomData } from "../src/pages/JoinRoom.jsx";
import Signup from "../src/pages/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path:"/createroom/:id/:time",
        Component: Room,
        loader: loadRoomData,
      },
      {
        path:'/joinroom/:id',
        Component: JoinRoom,
        loader:loadJoinRoomData
      }
    ],
  },
  
]);

export default router;
