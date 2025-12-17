import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userLoggedIn:false
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userLoggedIn=true
        },
        logoutUser:(state,action)=>{
            state.userLoggedIn=false
        }
    }
})

export const {setUser,logoutUser} = authSlice.actions

export default authSlice.reducer