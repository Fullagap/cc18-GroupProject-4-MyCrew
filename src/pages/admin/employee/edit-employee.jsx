import React, { useEffect, useState } from 'react';
import adminStore from '../../../store/admin-store';
import { register } from '../../../api/admin';
import { toast } from 'react-toastify';
import useAuthStore from '../../../store/authSrore';
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import registerSchema from '../../../utils/validate'; 
import RightFormRegister from '../../../components/user/admin/RightFormRegister';
import LeftFormRegister from '../../../components/user/admin/LeftFormRegister';

export default function EditEmployee() {
    const { employees, employeeInEachDepartment, positions, positionInDepartment, departments, employeeDepartment, getLeader, leader } = adminStore();
    const token = useAuthStore((state) => state.token);

    const { register: registerField, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: joiResolver(registerSchema),
        defaultValues: {
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
            personalLeaveAmount: "",
            address: ""
        }
    });
    const [resetSelect, setResetSelect] = useState(false);

    useEffect(() => {
        employeeDepartment(token);
        getLeader(token);
    }, []);

    const onSubmit = async (data) => {
        try {
            const resp = await register(data, token);
            toast.success(resp.data);
            reset();
            setResetSelect(prev => !prev);
        } catch (err) {
            toast.error("fail to register");
            console.log(err)
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Add New User Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left side form inputs */}
                    <LeftFormRegister registerField={registerField} errors={errors} positions={positions} employees={employees} leader={leader} positionInDepartment={positionInDepartment} employeeInEachDepartment={employeeInEachDepartment} departments={departments}/>

                    {/* Right side form inputs */}
                    <RightFormRegister errors={errors} registerField={registerField} resetSelect={resetSelect} />
                </div>
                <div className="flex justify-center mt-6">
                    <button className="bg-blue-500 text-white font-semibold py-1.5 px-4 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
