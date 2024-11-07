import React from 'react'
import useAuthStore from '../../../store/authSrore';;

function RightFormRegister({errors,registerField,positionInDepartment,employeeInEachDepartment,departments}) {
    const token = useAuthStore((state) => state.token);
  return (
    <div>
    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Lastname</label>
        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("lastName")}
        />
        {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Book Bank Number</label>
        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("bookBank")}
        />
        {errors.bookBank && <span className="text-red-500 text-xs">{errors.bookBank.message}</span>}
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Department</label>
        <select
            {...registerField("departmentId")}
            onChange={(e) => {
                const departmentId = e.target.value;
                positionInDepartment(departmentId, token);
                employeeInEachDepartment(departmentId, token);
            }}
            className="border rounded w-full py-1 px-2 text-gray-700"
        >
            <option disabled value="">Please select</option>
            {departments.map((el) => (
                <option key={el.id} value={el.id}>
                    {el.departmentName}
                </option>
            ))}
        </select>
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Salary</label>
        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("salary")}
        />
        {errors.salary && <span className="text-red-500 text-xs">{errors.salary.message}</span>}
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Sick Leave</label>
        <select className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("sickLeaveAmount")}
        >
            <option disabled value="">Please select</option>
            <option value={30}>30 Days</option>
            <option value={45}>45 Days</option>
        </select>
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Personal Leave</label>
        <select className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("personalLeaveAmount")}
        >
            <option disabled value="">Please select</option>
            <option value={15}>15 Days</option>
            <option value={30}>30 Days</option>
        </select>
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Annual Leave</label>
        <select className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("annualLeaveAmount")}
        >
            <option disabled value="">Please select</option>
            <option value={6}>6 Days</option>
            <option value={7}>7 Days</option>
            <option value={8}>8 Days</option>
            <option value={9}>9 Days</option>
            <option value={10}>10 Days</option>
            <option value={11}>11 Days</option>
            <option value={12}>12 Days</option>
        </select>
    </div>
</div>
  )
}

export default RightFormRegister