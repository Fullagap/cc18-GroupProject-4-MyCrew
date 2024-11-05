import React, { useEffect, useState } from 'react';
import adminStore from '../../../store/admin-store';
import { createDepartment, createPosition } from '../../../api/admin';
import AddPosition from '../../../components/user/admin/AddPosition';
import AddDepartment from '../../../components/user/admin/AddDepartment';

function DepartmentPosition() {
  const { departments, employeeDepartment, positionInDepartment, positions } = adminStore();
  const [input, setInput] = useState({ departmentName: "" });
  const [positionInput, setPositionInput] = useState({ departmentId: "", positionName: "" });

  useEffect(() => {
    employeeDepartment();
  }, []);

  const hdlPosition = (id) => {
    positionInDepartment(id);
  };

  const hdlOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const hdlPositionOnChange = (e) => {
    setPositionInput({ ...positionInput, [e.target.name]: e.target.value });
  };

  const hdlCreateDepartment = async () => {
    try {
      const resp = await createDepartment(input);
      employeeDepartment();
      setInput({ departmentName: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const hdlCreatePosition = async () => {
    try {
      const resp = await createPosition(positionInput);
      positionInDepartment(positionInput.departmentId);
      setPositionInput({ departmentId: "", positionName: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-start space-x-6 p-6 w-full">

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
