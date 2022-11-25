import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchDevices = createAsyncThunk('devices/fetchDevices', async ({type, page})=>{
    if (type && page) {
        console.log(type, page);
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/device/type/${type}?limit=10&page=${page}`)

        return data
    }
})

const initialState = {
    devices: {
        items: [],
        status: 'loading',
    }
}

const postsSlice = createSlice({
    name: 'devices',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchDevices.pending] : (state)=>{
            state.devices.items = []
            state.devices.status = 'loading'
        },
        [fetchDevices.fulfilled] : (state, action)=>{
            state.devices.items = action.payload
            state.devices.status = 'loaded'
        },
        [fetchDevices.rejected] : (state)=>{
            state.devices.items = []
            state.devices.status = 'error'
        },
    }
})

export const postsReducer = postsSlice.reducer