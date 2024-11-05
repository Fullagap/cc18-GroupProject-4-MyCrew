import {create} from 'zustand'
import {request} from '../api/checkRequest'

const requestStore = create((set) => ({
    requests: [],
    checkRequest: async(a) => {
        console.log("a",a)
        try {
            const resp = await request(a)
            console.log(resp)
            set({requests: resp.data})
        } catch (err) {
            console.log(err)
        }
    }

}))

export default requestStore