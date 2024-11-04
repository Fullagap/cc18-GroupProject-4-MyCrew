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
      console.log(resp);
      employeeDepartment();
      setInput({ departmentName: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const hdlCreatePosition = async () => {
    try {
      const resp = await createPosition(positionInput);
      console.log(resp);
      positionInDepartment(positionInput.departmentId);
      setPositionInput({ departmentId: "", positionName: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-start space-x-6 p-6 w-full">
      {/* <div className="bg-white shadow-md p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Add Department</h2>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="type department name"
            name="departmentName"
            value={input.departmentName}
            onChange={hdlOnChange}
          />
          <button
            className="bg-green-500 text-white p-3 ml-3 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={hdlCreateDepartment}
          >
            Add
          </button>
        </div>
        <h3 className="text-lg font-medium mb-4">Department list</h3>

        {departments.map((el, index) => (
          <div className="flex justify-between items-center mb-4" key={el.id}>
            <span className="text-gray-700 cursor-pointer" onClick={() => hdlPosition(el.id)}>
              {index + 1} {el.departmentName}
            </span>
          </div>
        ))}
      </div> */}

      <AddDepartment
        input={input}
        hdlOnChange={hdlOnChange}
        hdlCreateDepartment={hdlCreateDepartment}
        departments={departments}
        hdlPosition={hdlPosition} // Pass this prop
      />



      <AddPosition
        hdlPositionOnChange={hdlPositionOnChange}
        positionInput={positionInput}
        departments={departments}
        hdlCreatePosition={hdlCreatePosition}
        positions={positions}
      />
    </div>
  );
}

export default DepartmentPosition;
