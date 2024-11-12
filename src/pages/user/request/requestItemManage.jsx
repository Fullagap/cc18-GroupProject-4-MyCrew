import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCheck, MdClose } from "react-icons/md";
import itemStore from "../../../store/item-store";
import { changeStatusItem } from "../../../api/checkRequest";
import useAuthStore from "../../../store/authSrore";

const RequestItemManage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const checkAllItemManage = itemStore((state) => state.checkAllItemManage);
  const supItems = itemStore((state) => state.supItems);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    checkAllItemManage(user.id)
    setIsLoading(false);
}, [isLoading]);



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

  const handleApprove = async (id) => {
    await changeStatusItem(id, "APPROVE");
    await checkAllItemManage(user.id);
    console.log("approve")
    setIsLoading(false);
  };

  const handleReject = async (id) => {
    await changeStatusItem(id, "REJECT");
    await checkAllItemManage(user.id);
    console.log("reject")
    setIsLoading(false);
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      {isLoading ? (
        <p className="text-gray-500 text-xl">Loading data...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Request Item Management
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-left text-lg">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-4 px-6 text-gray-600 font-semibold">Item</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Name</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Cost</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Status</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {supItems.map((request) => (
                  <React.Fragment key={request.id}>
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRowClick(request.id)}
                    >
                      <td className="py-6 px-6 text-gray-700">{request.item.itemName}</td>
                      <td className="py-6 px-6 text-gray-700">{request.user.firstName}</td>
                      <td className="py-6 px-6 text-gray-700">{request.item.cost} bath</td>
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
                            <h3 className="font-semibold text-xl text-gray-800">Description</h3>
                            <p className="text-lg text-gray-600 mb-4">{request.description}</p>
                            <div className="flex justify-end space-x-4">
                              {request.status === "WAITING" && (
                                <>
                                  <button
                                    onClick={() => handleReject(request.id)}
                                    className="flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-lg"
                                  >
                                    <MdClose size={24} className="mr-2" />
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => handleApprove(request.id)}
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
      )}
    </div>
  );
};

export default RequestItemManage;
