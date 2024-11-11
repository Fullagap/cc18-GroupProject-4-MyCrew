import { create } from "zustand";
import {allEmployees, allLeader, department, EmployeeInDepartment, positionDepartment,createOfficeSiteLocation,editOfficeSiteLocation,deleteOfficeSiteLocation} from "../api/admin";



const adminStore = create((set) => ({
    ////Department in company
    departments: [],
    // //Position each departmen
    positions:[],
    employees:[],
    allEmployees:[],
    leader:[],
    employeeDepartment: async (token) => {
        try {
            const resp = await department(token)
            //Department in company
            set({ departments: resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    positionInDepartment: async(id,token)=>{
        try {
            const resp = await positionDepartment(id,token)
            //Position each departmen
            set({ positions: resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    employeeInEachDepartment: async(id,token)=>{
        try {
            const resp = await EmployeeInDepartment(id,token)
            // Position each department
            console.log(resp.data)
            set({ employees: resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    getAllEmployees: async(token)=>{
        try {
            const resp = await allEmployees(token)
            set({allEmployees:resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    getLeader: async(token)=>{
        try {
            const resp = await allLeader(token)
            // console.log(resp,"------------------")
            set({leader:resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    createSiteLocation:async(form,token)=>{
        try{
            const response = await createOfficeSiteLocation(form,token)
            console.log('from create site location',response)
        }catch(err){
            console.log(err)
        }
    },
    editSiteLocation:async(form,token)=>{
        try{
            const response = await editOfficeSiteLocation(form,token)
            console.log('from edit site location',response)
        }catch(err){
            console.log(err)
        }
    },
    deleteSiteLocation:async(form,token)=>{
        try{
            const response = await deleteOfficeSiteLocation(form,token)
            console.log('from delete site location',response)
        }catch(err){
            console.log(err)
        }
    },


}))

export default adminStore

