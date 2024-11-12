import {create} from 'zustand'
import {request} from '../api/checkRequest'

const requestStore = create((set) => ({
    requests: [],
    checkRequest: async(id) => {
        console.log("id",id)
        try {
            const resp = await request(id)
            console.log("resp",resp)
            set({requests: resp.data})
            return resp.data
        } catch (err) {
            console.log(err)
        }
    }

}))

export default requestStore