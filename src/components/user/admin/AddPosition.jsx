import React from 'react';

function AddPosition({ hdlPositionOnChange, positionInput, departments, hdlCreatePosition, positions,positionInDepartment }) {
  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Position</h2>
      <div className="flex items-center mb-6 space-x-2">
            <input
                type="text"
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type position name"
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
                className="bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                onClick={hdlCreatePosition}
                style={{ minWidth: "60px" }} // Set a fixed width for alignment
            >
                <i className="fas fa-plus mr-2"></i> Add
            </button>
        </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Position List</h3>
      <div className="space-y-4">
        {positions.length > 0 ? (
          positions.map((el, index) => (
            <div
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
              key={el.id}
            >
              <span className="text-gray-800">
                {index + 1}. {el.positionName}
              </span>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center p-4 bg-gray-50 rounded-lg shadow-sm">
            No positions available. Please select a department to show the list of positions.
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPosition;
