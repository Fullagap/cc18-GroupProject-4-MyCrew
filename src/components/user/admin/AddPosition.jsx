import React from 'react'

function AddPosition({hdlPositionOnChange,positionInput,departments,hdlCreatePosition,positions}) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-1/2">
    <h2 className="text-xl font-semibold mb-4">Add Position</h2>
    <div className="flex items-center mb-6">
      <input
        type="text"
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="type position name"
        name="positionName"
        value={positionInput.positionName}
        onChange={hdlPositionOnChange}
      />
      <select
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="departmentId"
        value={positionInput.departmentId}
        onChange={hdlPositionOnChange}
      >
        <option value="">Select Department</option>
        {departments.map((el) => (
          <option key={el.id} value={el.id}>
            {el.departmentName}
          </option>
        ))}
      </select>
      <button
        className="bg-green-500 text-white p-3 ml-3 rounded-lg hover:bg-green-600 transition duration-300"
        onClick={hdlCreatePosition}
      >
        Add
      </button>
    </div>
    <h3 className="text-lg font-medium mb-4">Position list</h3>

    {positions.map((el, index) => (
      <div className="flex justify-between items-center mb-4" key={el.id}>
        <span className="text-gray-700">{index + 1} {el.positionName}</span>
      </div>
    ))}
  </div>
  )
}

export default AddPosition