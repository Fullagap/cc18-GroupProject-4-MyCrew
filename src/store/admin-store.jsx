import { create } from "zustand";
import {allEmployees, allLeader, department, EmployeeInDepartment, positionDepartment} from "../api/admin";



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
    }

    
  




}))

export default adminStore

