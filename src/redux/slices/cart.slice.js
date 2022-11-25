import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = []

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload)
        },

        removeItem: (state, action) => {
            return state.filter(p => p.id !== action.payload.id)
        },
    }
})

export const cartReducer = CartSlice.reducer
export const cartActions = CartSlice.actions