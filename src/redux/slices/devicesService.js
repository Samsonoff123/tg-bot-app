import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deviceAPI = createApi({
    reducerPath: 'deviceAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL}, ),
    endpoints: (build) => ({
        fetchAllDevices: build.query({
            query: ({type, sort}) => (
                {
                url: `/api/device/type/${type}/${sort}?limit=10&page=1`
            })
        })
    })
})

export const  { useFetchAllDevicesQuery } = deviceAPI