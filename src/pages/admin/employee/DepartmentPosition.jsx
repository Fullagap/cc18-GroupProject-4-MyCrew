import React, { useEffect, useState } from 'react';
import adminStore from '../../../store/admin-store';
import { createDepartment, createPosition } from '../../../api/admin';
import AddPosition from '../../../components/user/admin/AddPosition';
import AddDepartment from '../../../components/user/admin/AddDepartment';
import useAuthStore from '../../../store/authSrore';

function DepartmentPosition() {
  const { departments, employeeDepartment, positionInDepartment, positions } = adminStore();
  const token = useAuthStore((state)=>state.token)

  const [input, setInput] = useState({ departmentName: "" });
  const [positionInput, setPositionInput] = useState({ departmentId: "", positionName: "" });

  useEffect(() => {
    employeeDepartment(token);
  }, []);

  const hdlPosition = (id) => {
    positionInDepartment(id,token);
  };

  const hdlOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const hdlPositionOnChange = (e) => {
    setPositionInput({ ...positionInput, [e.target.name]: e.target.value });
  };

  const hdlCreateDepartment = async () => {
    try {
      const resp = await createDepartment(input,token);
      employeeDepartment(token);
      setInput({ departmentName: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const hdlCreatePosition = async () => {
    try {
      const resp = await createPosition(positionInput,token);
      positionInDepartment(positionInput.departmentId,token);
      setPositionInput({ departmentId: "", positionName: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:space-x-6 space-y-6 md:space-y-0 p-6 w-full">

    <AddDepartment
      input={input}
      hdlOnChange={hdlOnChange}
      hdlCreateDepartment={hdlCreateDepartment}
      departments={departments}
      hdlPosition={hdlPosition}
    />
  
    <AddPosition
      hdlPositionOnChange={hdlPositionOnChange}
      positionInDepartment={positionInDepartment}
      positionInput={positionInput}
      departments={departments}
      hdlCreatePosition={hdlCreatePosition}
      positions={positions}
    />
  </div>
  
  );
}

export default DepartmentPosition;
