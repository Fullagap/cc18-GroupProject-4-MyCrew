import React from 'react'

function AddDepartment({input,hdlOnChange,hdlCreateDepartment,departments,hdlPosition}) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-1/2">
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
      </div>
  )
}

export default AddDepartment