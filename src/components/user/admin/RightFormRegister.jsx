import React, { useEffect, useState } from 'react'


function RightFormRegister({errors,registerField,resetSelect}) {

   
    const [isSickLeaveOther, setIsSickLeaveOther] = useState(false);
    const [isPersonalLeaveOther, setIsPersonalLeaveOther] = useState(false);
    const [isAnnualLeaveOther, setIsAnnualLeaveOther] = useState(false);

    const handleSickLeaveChange = (event) => {
        setIsSickLeaveOther(event.target.value === "other");
    };

    const handlePersonalLeaveChange = (event) => {
        setIsPersonalLeaveOther(event.target.value === "other");
    };

    const handleAnnualLeaveChange = (event) => {
        setIsAnnualLeaveOther(event.target.value === "other");
    };

    useEffect(() => {
        // Reset the state for dropdowns when select change
        setIsSickLeaveOther(false);
        setIsPersonalLeaveOther(false);
        setIsAnnualLeaveOther(false);
      }, [resetSelect]);
  
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
        <label className="block text-gray-700 text-sm">Identity Card Number</label>
        <input type="text" className="border rounded w-full py-1 px-2 text-gray-700"
            {...registerField("identicalNumber")}
        />
        {errors.identicalNumber && <span className="text-red-500 text-xs">{errors.identicalNumber.message}</span>}
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
                {!isSickLeaveOther ? (
                    <select
                        className="border rounded w-full py-1 px-2 text-gray-700"
                        {...registerField("sickLeaveAmount")}
                        onChange={(e) => {
                            handleSickLeaveChange(e);
                            registerField("sickLeaveAmount").onChange(e);
                        }}
                    >
                        <option disabled value="">Please select</option>
                        <option value={30}>30 Days</option>
                        <option value={45}>45 Days</option>
                        <option value="other">Other</option>
                    </select>
                ) : (
                    <input
                        type="number"
                        className="border rounded w-full py-1 px-2 text-gray-700"
                        {...registerField("sickLeaveAmount")}
                        placeholder="Fill SickLeave Amount"
                    />
                )}
            </div>


        <div className="mb-3">
                <label className="block text-gray-700 text-sm">Personal Leave</label>
                {!isPersonalLeaveOther ? (
                    <select
                        className="border rounded w-full py-1 px-2 text-gray-700"
                        {...registerField("personalLeaveAmount")}
                        onChange={(e) => {
                            handlePersonalLeaveChange(e);
                            registerField("personalLeaveAmount").onChange(e);
                        }}
                    >
                        <option disabled value="">Please select</option>
                        <option value={15}>15 Days</option>
                        <option value={30}>30 Days</option>
                        <option value="other">Other</option>
                    </select>
                ) : (
                    <input
                        type="number"
                        className="border rounded w-full py-1 px-2 text-gray-700"
                        {...registerField("personalLeaveAmount")}
                        placeholder="Fill PersonalLeave Amount "
                    />
                )}
            </div>

    
            <div className="mb-3">
                <label className="block text-gray-700 text-sm">Annual Leave</label>
                {!isAnnualLeaveOther ? (
                    <select
                        className="border rounded w-full py-1 px-2 text-gray-700"
                        {...registerField("annualLeaveAmount")}
                        onChange={(e) => {
                            handleAnnualLeaveChange(e);
                            registerField("annualLeaveAmount").onChange(e);
                        }}
                    >
                        <option disabled value="">Please select</option>
                        <option value={6}>6 Days</option>
                        <option value={7}>7 Days</option>
                        <option value={8}>8 Days</option>
                        <option value={9}>9 Days</option>
                        <option value={10}>10 Days</option>
                        <option value={11}>11 Days</option>
                        <option value={12}>12 Days</option>
                        <option value="other">Other</option>
                    </select>
                ) : (
                    <input
                        type="number"
                        className="border rounded w-full py-1 px-2 text-gray-700"
                        {...registerField("annualLeaveAmount")}
                        placeholder="Fill annualLeaveAmount"
                    />
                )}
            </div>
</div>
  )
}

export default RightFormRegister