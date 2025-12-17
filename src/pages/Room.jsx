import axios from "axios";
import React,{useState} from "react";
import { Navigate, useLoaderData, useParams } from "react-router";
import Errorpage from "./Errorpage.jsx";

function Room() {
  const { id } = useParams();
  const data = useLoaderData();
  const result=data.result
  // console.log(result.status)

  

  return result.status==401?<Errorpage data={data.body} />:<Navigate to={`/joinroom/${id}`} />

}

export const loadRoomData = async ({ params }) => {
  // console.log(params);

  // const password="123456789"
  const result = await fetch(`${import.meta.env.VITE_API_URL}/rooms/createroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    //user routes testing

    body: JSON.stringify({
      roomcode: params.id,
      allowotherstodropdocs: false,
      time: params.time, // time in minutes
    }),
  });
  // console.log(result)
  const body = await result.json();
  // console.log(body);
  return {body,result};
};

export default Room;
