import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deviceDetailAPI = createApi({
    reducerPath: 'deviceDetailAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL}, ),
    endpoints: (build) => ({
        fetchOneDevice: build.query({
            query: ({id}) => (
                {
                url: `/api/device/${id}`
            })
        })
    })
})

export const  { useFetchOneDeviceQuery } = deviceDetailAPI