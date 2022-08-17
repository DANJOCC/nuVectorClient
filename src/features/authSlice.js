import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../helpers";

const initialState={
    token:null,
    user:{
        username:'',
        id:'',
        logged:false,
        role:'',
    }
}

export const authSlice=createSlice({
    name:'authentication',
    initialState,
    reducers:{
        entry:(state, action)=>{
            state.token=action.payload.token
            state.user.username=action.payload.username
            state.user.id=action.payload.id
            state.user.logged=action.payload.logged
            state.user.role=action.payload.role
        },
        getStorageData:(state)=>{
            const dataString=getItem('user');
            if(dataString !== null){
                const data=JSON.parse(dataString)
                state.token=data.token
                state.user.username=data.username
                state.user.id=data.id
                state.user.logged=data.logged
                state.user.role=data.role
            }
        },
        logged:(state)=>{
            state.user.logged=!state.user.logged
        }
    }
})

export const {entry,getStorageData,logged}=authSlice.actions

export default authSlice.reducer