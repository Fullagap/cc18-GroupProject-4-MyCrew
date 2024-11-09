import React from 'react'
import useAuthStore from '../../../store/authSrore';

function LeftFormRegister({registerField,errors,positions,employees,leader,positionInDepartment,employeeInEachDepartment,departments})

{
    const token = useAuthStore((state) => state.token);
  return (
    <div>
    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Firstname</label>
        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("firstName")}
        />
        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Start Date</label>
        <input type="date" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("dateStart")}
        />
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">E-mail</label>
        <input type="email" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("email")}
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Phone Number</label>
        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("phoneNumber")}
        />
        {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>}
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
        <label className="block text-gray-700 text-sm">Position</label>
        <select className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("positionId")}
        >
            <option disabled value="">Please select</option>
            {positions.map((el) => (
                <option key={el.id} value={el.id}>
                    {el.positionName}
                </option>
            ))}
        </select>
    </div>

    <div className="mb-3">
        <label className="block text-gray-700 text-sm">Supervisor ID</label>
        <select className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("supId")}
        >
            <option disabled value="">Please select</option>
            <option value={leader.id}> [{leader.position?.positionName}] {leader.firstName} {leader.lastName}</option>
            {employees.map((el) => (
                <option key={el.id} value={el.id}>
                    [{el.position.positionName}] {el.firstName} {el.lastName}
                </option>
            ))}
        </select>
    </div>
</div>
  )
}

export default LeftFormRegister