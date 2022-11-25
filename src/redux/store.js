import { configureStore } from '@reduxjs/toolkit'
import { deviceAPI } from './slices/devicesService'
import { cartReducer } from './slices/cart.slice'
import { postsReducer } from './slices/devices'

const store = configureStore({
    reducer: {
        devices: postsReducer,

        [deviceAPI.reducerPath] : deviceAPI.reducer, cart: cartReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(deviceAPI.middleware)
})

export default store