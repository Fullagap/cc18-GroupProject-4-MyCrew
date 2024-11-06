import React from 'react'
import { checkAllItem } from '../api/checkRequest'
import {create} from 'zustand'

const itemStore = create((set) => ({
    items: [],
    checkAllItem: async () => {
        try {
            const resp = await checkAllItem()
            console.log(resp)
            set({ items: resp.data })
        } catch (err) {
            console.log(err)
        }
    },
}))
export default itemStore