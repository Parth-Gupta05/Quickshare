import axios from "axios"

const loadAuthData=async ()=>{
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 0.5 seconds
  return { message: "Data successfully loaded from the root loader!" };
}



export {loadAuthData}