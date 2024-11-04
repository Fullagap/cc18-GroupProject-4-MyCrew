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
    employeeDepartment: async () => {
        try {
            const resp = await department()
            //Department in company
            set({ departments: resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    positionInDepartment: async(id)=>{
        try {
            const resp = await positionDepartment(id)
            //Position each departmen
            set({ positions: resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    employeeInEachDepartment: async(id)=>{
        try {
            const resp = await EmployeeInDepartment(id)
            // Position each department
            console.log(resp.data)
            set({ employees: resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    getAllEmployees: async()=>{
        try {
            const resp = await allEmployees()
            set({allEmployees:resp.data})
        } catch (err) {
            console.log(err)
        }
    },
    getLeader: async()=>{
        try {
            const resp = await allLeader()
            // console.log(resp,"------------------")
            set({leader:resp.data})
        } catch (err) {
            console.log(err)
        }
    }

    
  




}))

export default adminStore

