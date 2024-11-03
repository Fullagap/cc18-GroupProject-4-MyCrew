import React, { useEffect, useState } from 'react'
import adminStore from '../../../store/admin-store'
import { register } from '../../../api/admin'





export default function EditEmployee() {

    const employeeDepartment = adminStore((state) => state.employeeDepartment)
    const departments = adminStore((state) => state.departments)
    const positionInDepartment = adminStore((state) => state.positionInDepartment)
    const positions = adminStore((state) => state.positions)
    const employeeInEachDepartment = adminStore((state) => state.employeeInEachDepartment)
    const employees = adminStore((state) => state.employees)
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        identicalNumber: "",
        phoneNumber: "",
        supId: "",
        departmentId: "",
        positionId: "",
        bookBank: "",
        salary: "",
        dateStart: "",
        annualLeaveAmount: "",
        sickLeaveAmount: "",
        WOPayAmount: ""
    })

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        identicalNumber: "",
        phoneNumber: "",
        supId: "",
        departmentId: "",
        positionId: "",
        bookBank: "",
        salary: "",
        dateStart: "",
        annualLeaveAmount: "",
        sickLeaveAmount: "",
        WOPayAmount: ""
    }




    useEffect(() => {
        employeeDepartment()
    }, [])

    const hdlOnChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await register(form)
            console.log(resp)
            setForm(initialState)
        } catch (err) {
            console.log(err)
        }
    }

    // console.log("----------------------------", employees)
    // employees.map((el)=>console.log("---------------",el))


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-3xl" onSubmit={hdlSubmit}>
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Add New User Information</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Firstname</label>
                            <div className="flex items-center">
                                <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Start Date:</label>
                            <div className="flex items-center">
                                <input type="date" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="dateStart"
                                    value={form.dateStart}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">E-mail:</label>
                            <div className="flex items-center">
                                <input type="email" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="email"
                                    value={form.email}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Phone Number:</label>
                            <div className="flex items-center">
                                <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">identityCard Number</label>
                            <div className="flex items-center">
                                <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="identicalNumber"
                                    value={form.identicalNumber}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Position:</label>
                            <select className="border rounded w-full py-1 px-2 text-gray-700"
                                name="positionId"
                                required value={form.positionId}
                                onChange={hdlOnChange}
                            >
                                <option disabled value="" >Please select</option>
                                {positions.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.positionName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">sup Id:</label>
                            <select className="border rounded w-full py-1 px-2 text-gray-700"
                                name="supId"
                                required value={form.supId}
                                onChange={hdlOnChange}
                            >
                                <option disabled value="">Please select</option>
                                {employees.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        [{el.position.positionName}] {el.firstName} {el.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Annual Leave:</label>
                            <select
                                name="annualLeaveAmount"
                                value={form.annualLeaveAmount}
                                onChange={hdlOnChange}
                                className="border rounded w-full py-1 px-2 text-gray-700"
                            >
                                <option disabled value="">please select</option>
                                <option value="6">6 Days</option>
                                <option value="7">7 Days</option>
                                <option value="8">8 Days</option>
                                <option value="9">9 Days</option>
                                <option value="10">10 Days</option>
                                <option value="11">11 Days</option>
                                <option value="12">12 Days</option>
                            </select>
                        </div>
                        {/* <div className="mb-3">
                    <label className="block text-gray-700 text-sm">Without Pay leave:</label>
                    <select className="border rounded w-full py-1 px-2 text-gray-700">
                        <option>active</option>
                    </select>
                </div> */}
                    </div>
                    <div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Lastname</label>
                            <div className="flex items-center">
                                <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">End Date:</label>
                            <div className="flex items-center">
                                <input type="date" className="border rounded w-full py-1 px-2 text-gray-700" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Bookbank Number:</label>
                            <div className="flex items-center">
                                <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="bookBank"
                                    value={form.bookBank}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Department:</label>
                            <select
                                name="departmentId"
                                value={form.departmentId}
                                onChange={(e) => {
                                    const departmentId = e.target.value;
                                    setForm({ ...form, departmentId });
                                    positionInDepartment(departmentId);
                                    employeeInEachDepartment(departmentId);
                                }}
                                className="border rounded w-full py-1 px-2 text-gray-700"
                            >
                                <option disabled value="">
                                    Please select
                                </option>
                                {departments.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.departmentName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Salary:</label>
                            <div className="flex items-center">
                                <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
                                    name="salary"
                                    value={form.salary}
                                    onChange={hdlOnChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Sick leave:</label>
                            <select className="border rounded w-full py-1 px-2 text-gray-700"
                                name="sickLeaveAmount"
                                value={form.sickLeaveAmount}
                                onChange={hdlOnChange}
                            >
                                <option value="" disabled>Please select</option>
                                <option value={30}>30 Days</option>
                                <option value={45}>45 Days</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm">Without Pay leave:</label>
                            <select className="border rounded w-full py-1 px-2 text-gray-700"
                                name="WOPayAmount"
                                value={form.WOPayAmount}
                                onChange={hdlOnChange}
                            >
                                <option value="" disabled>Please select</option>
                                <option value={15}>15 Days</option>
                                <option value={30}>30 Days</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button className="bg-blue-500 text-white font-semibold py-1.5 px-4 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
