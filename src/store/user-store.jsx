import {create} from 'zustand'
import {clockIn,clockOut,getSiteLocation,getAttendanceData} from '../api/user'

const userStore = create((set) => ({
    response: [],
    createClockIn: async (latitude, longitude,location,token) => {
        try {
            const apiResponse = await clockIn(latitude, longitude,location,token)
            set({ response: apiResponse }) // Update store state
            return apiResponse // Return the response to the component
        } catch(err) {
            console.log(err)
            throw err // Rethrow error to be caught in the component
        }
    },
    createClockOut: async (latitude, longitude,location,token) => {
        try {
            const apiResponse = await clockOut(latitude, longitude,location,token)
            set({ response: apiResponse }) // Update store state
            return apiResponse // Return the response to the component
        } catch(err) {
            console.log(err)
            throw err // Rethrow error to be caught in the component
        }
    },
    getAttendanceData:async(token)=>{
        try{
            const response = await getAttendanceData(token)
            return response.data
        }catch(err){
            console.log(err)
        }
    }
    ,
    getSiteLocationData:async()=>{
        try{
            const response = await getSiteLocation()
            return response.data
        }catch(err){
            console.log(err)
        }
    }

}))

export default userStore