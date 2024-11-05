import {create} from 'zustand'
import {clockIn,clockOut} from '../api/user'

const userStore = create((set) => ({
    response: [],
    createClockIn: async (latitude, longitude) => {
        try {
            const apiResponse = await clockIn(latitude, longitude)
            set({ response: apiResponse }) // Update store state
            return apiResponse // Return the response to the component
        } catch(err) {
            console.log(err)
            throw err // Rethrow error to be caught in the component
        }
    },
    createClockOut: async (latitude, longitude) => {
        try {
            const apiResponse = await clockOut(latitude, longitude)
            set({ response: apiResponse }) // Update store state
            return apiResponse // Return the response to the component
        } catch(err) {
            console.log(err)
            throw err // Rethrow error to be caught in the component
        }
    },

}))

export default userStore