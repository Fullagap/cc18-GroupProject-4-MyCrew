import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCheck, MdClose, MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import itemStore from "../../store/item-store";

const RequestList = () => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const checkAllUserItem = itemStore((state) => state.checkAllUserItem);
  const userItems = itemStore((state) => state.userItems);

  useEffect(() => {
    checkAllUserItem(2);
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
    navigate("/requestItem");
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">รายการร้องขอ</h2>
        <button 
          className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center gap-1"
          onClick={onClickAddRequest}
        >
          <MdAdd className="text-xl" />
          Add request
        </button>
      </div>
      
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
    </div>
  );
};

export default RequestList;
