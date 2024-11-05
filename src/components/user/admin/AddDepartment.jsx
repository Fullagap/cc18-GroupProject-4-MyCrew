import React from 'react'

// bg-white shadow-md p-6 rounded-lg w-1/2
function AddDepartment({input,hdlOnChange,hdlCreateDepartment,departments,hdlPosition}) {
  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Department</h2>
    <div className="flex items-center mb-6">
        <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type department name"
            name="departmentName"
            value={input.departmentName}
            onChange={hdlOnChange}
        />
        <button
            className="bg-blue-600 text-white p-4 ml-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={hdlCreateDepartment}
        >
          Add
        </button>
    </div>
    <h3 className="text-xl font-semibold mb-4 text-gray-700">Department List</h3>
    <div className="space-y-4">
        {departments.map((el, index) => (
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm" key={el.id}>
                <span className="text-gray-800 cursor-pointer" onClick={() => hdlPosition(el.id)}>
                    {index + 1}. {el.departmentName}
                </span>
                <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
        ))}
    </div>
</div>
  )
}

export default AddDepartment