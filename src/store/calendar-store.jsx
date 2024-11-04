import React from 'react'
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';


const useCalendarStore = create(persist((set, get) => ({
//     AddSnake: async (form,token)=>{
//     try{
//       const res = await apiAddSnake(form,token)
//       toast(res.data.message)
//     }catch(err){
//       // console.log(err)
//         toast.error(err.response.data.message);
//     }
//   },

//   UpdateSnake: async (snakeId,form,token)=>{
//     try{
//       console.log('form UpdateSnake Store', snakeId,form,token)
//       const res = await apiUpdateSnake(snakeId,form,token)
//       toast(res.data.message)
//     }catch(err){
//       // console.log(err)
//         toast.error(err.response.data.message);
//     }
//   },

//   DeleteSnake: async (snakeId,token)=>{
//     try{
//       const res = await apiDeleteSnake(snakeId,token)
//       toast(res.data.message)
//     }catch(err){
//       // console.log(err)
//         toast.error(err.response.data.message);
//     }
//   }
}),

{
  name: "calendar-store",
  storage: createJSONStorage(() => localStorage),
}
)
);

export default useCalendarStore;