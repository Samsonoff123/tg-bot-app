import { configureStore } from '@reduxjs/toolkit'
import { deviceAPI } from './slices/devicesService'
import { cartReducer } from './slices/cart.slice'
import { postsReducer } from './slices/devices'
import { deviceDetailAPI } from './slices/deviceDetailService'

const store = configureStore({
    reducer: {
        devices: postsReducer,

        [deviceAPI.reducerPath] : deviceAPI.reducer,

        [deviceDetailAPI.reducerPath] : deviceDetailAPI.reducer,
    },
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(deviceAPI.middleware, deviceDetailAPI.middleware)
    
})

export default store