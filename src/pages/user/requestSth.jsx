import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCheck, MdClose, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import itemStore from "../../store/item-store";
import useAuthStore from "../../store/authSrore";

const RequestList = () => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const checkAllUserItem = itemStore((state) => state.checkAllUserItem);
  const userItems = itemStore((state) => state.userItems);

  const user = useAuthStore((state) => state.user);
  console.log("userid", user.id);

  useEffect(() => {
    checkAllUserItem(user.id);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "WAITING":
        return "bg-yellow-200 text-yellow-900";
      case "APPROVE":
        return "bg-green-200 text-green-900";
      case "REJECT":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const onClickAddRequest = () => {
    navigate("/user/requestItem");
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-800">Request Item</h2>
    <button 
      className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center gap-1"
      onClick={onClickAddRequest}
    >
      <MdAdd className="text-xl" />
      Add request
    </button>
  </div>

  {userItems.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="p-6 bg-gray-100 rounded-full shadow-lg mb-6">
        <svg
          className="w-28 h-28 text-blue-500" 
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m2 4H7m8-8H7m12 10V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2z"
          />
        </svg>
      </div>
      <p className="text-gray-700 text-3xl font-extrabold mb-2">No Requests Available</p>
      <p className="text-gray-500 text-lg mb-4">It looks like there aren’t any requests yet.</p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-left text-lg">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-4 px-6 text-gray-600 font-semibold">No.</th>
            <th className="py-4 px-6 text-gray-600 font-semibold">Item Name</th>
            <th className="py-4 px-6 text-gray-600 font-semibold">Cost</th>
            <th className="py-4 px-6 text-gray-600 font-semibold">Status</th>
            <th className="py-4 px-6 text-gray-600 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {userItems.map((request, index) => (
            <React.Fragment key={request.id}>
              <tr
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(request.id)}
              >
                <td className="py-6 px-6 text-gray-700">{index + 1}</td>
                <td className="py-6 px-6 text-gray-700">{request.item.itemName}</td>
                <td className="py-6 px-6 text-gray-700">{request.item.cost}</td>
                <td className="py-6 px-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-6 px-6 text-gray-400">
                  {expandedId === request.id ? (
                    <MdKeyboardArrowUp size={28} />
                  ) : (
                    <MdKeyboardArrowDown size={28} />
                  )}
                </td>
              </tr>
              {expandedId === request.id && (
                <tr>
                  <td colSpan="5" className="bg-gray-100 p-8">
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-xl text-gray-800">Remark</h3>
                      <p className="text-lg text-gray-600 mb-4">{request.description}</p>
                      <div className="flex justify-end space-x-4">
                        {request.status === "Requested" && (
                          <>
                            <button
                              className="flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-lg"
                            >
                              <MdClose size={24} className="mr-2" />
                              Reject
                            </button>
                            <button
                              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg"
                            >
                              <MdCheck size={24} className="mr-2" />
                              Approve
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default RequestList;
