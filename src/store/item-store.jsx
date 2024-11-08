import React from 'react'
import { checkAllItem , checkAllItemManage, checkUserAllItem } from '../api/checkRequest'
import {create} from 'zustand'

const itemStore = create((set) => ({
    items: [],
    supItems: [],
    userItems: [],
    checkAllItem: async () => {
        try {
            const resp = await checkAllItem()
            console.log(resp)
            set({ items: resp.data })
        } catch (err) {
            console.log(err)
        }
    },
    checkAllItemManage : async (id) => {
        try {
            const resp = await checkAllItemManage(id)
            console.log("resp checkAllItemManage",resp)
            set({ supItems: resp.data })
        } catch (err) {
            console.log(err)
        }
    },
    checkAllUserItem : async (id) => {
        try {
            const resp = await checkUserAllItem(id)
            console.log("resp checkAllItemManage",resp)
            set({ userItems: resp.data })
        } catch (err) {
            console.log(err)
        }
    }

}))
export default itemStore