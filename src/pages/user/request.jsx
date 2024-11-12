import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCheck, MdClose } from "react-icons/md";
import requestStore from "../../store/checkRequest";
import { changeStatus, changeComment } from "../../api/checkRequest";
import useAuthStore from "../../store/authSrore";

const LeaveRequestTable = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const checkRequest = requestStore((state) => state.checkRequest);
  const requests = requestStore((state) => state.requests);
  const user = useAuthStore((state) => state.user);

  const fetchRequests = async () => {
    try {
      await checkRequest(user.id);
      setComments(
        requests.reduce((acc, request) => {
          acc[request.id] = request.comment || "";
          return acc;
        }, {})
      );
      setHasError(false); // reset error state on success
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user.id]);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCommentChange = (id, value) => {
    setComments({
      ...comments,
      [id]: value,
    });
  };

  const handleApprove = async (id) => {
    await changeStatus(id, "APPROVE");
    await changeComment(id, comments[id]);
    await fetchRequests();
  };

  const handleReject = async (id) => {
    await changeStatus(id, "REJECT");
    await changeComment(id, comments[id]);
    await fetchRequests();
  };

  const handleBackToWaiting = async (id) => {
    await changeStatus(id, "WAITING");
    await fetchRequests();
  };

  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  if (hasError) {
    return (
      <div className="text-center">
        <p className="text-red-500 text-xl mb-4">There was an error loading the data</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      {isLoading ? (
        <p className="text-gray-500 text-xl">Loading data...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No leave requests available</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Leave Approval Requests Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left text-lg">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-4 px-6 text-gray-600 font-semibold">ID</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Employee Name</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Leave Type</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Leave Date</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Days</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold">Status</th>
                  <th className="py-4 px-6 text-gray-600 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((leave) => (
                  <React.Fragment key={leave.id}>
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRowClick(leave.id)}
                    >
                      <td className="py-6 px-6 text-gray-700">{leave.id}</td>
                      <td className="py-6 px-6 text-gray-700">{leave.user.firstName}</td>
                      <td className="py-6 px-6 text-gray-700">{leave.leaveCategory.leaveName}</td>
                      <td className="py-6 px-6 text-gray-700">
                        {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                      </td>
                      <td className="py-6 px-6 text-gray-700">
                        {calculateLeaveDays(leave.startDate, leave.endDate)} days
                      </td>
                      <td className="py-6 px-6">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-gray-400">
                        {expandedId === leave.id ? (
                          <MdKeyboardArrowUp size={28} />
                        ) : (
                          <MdKeyboardArrowDown size={28} />
                        )}
                      </td>
                    </tr>
                    {expandedId === leave.id && (
                      <tr>
                        <td colSpan="7" className="bg-gray-100 p-8">
                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <h3 className="font-semibold text-xl text-gray-800">Leave Details</h3>
                              <p className="text-lg text-gray-600">
                                <span className="font-semibold">Request Date:</span> {formatDate(leave.requestDate)}
                              </p>
                              <p className="text-lg text-gray-600">
                                <span className="font-semibold">Reason:</span> {leave.description}
                              </p>
                            </div>
                            <div className="space-y-6 flex flex-col">
                              <h3 className="font-semibold text-xl text-gray-800">
                                {leave.status === "WAITING" ? "Manage Status" : "Details"}
                              </h3>
                              {leave.status === "WAITING" ? (
                                <textarea
                                  className="w-full p-4 border border-gray-300 rounded-lg text-lg resize-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                  rows="5"
                                  placeholder="Enter comment..."
                                  value={comments[leave.id] || ""}
                                  onChange={(e) => handleCommentChange(leave.id, e.target.value)}
                                />
                              ) : (
                                <p className="text-lg text-gray-700">{comments[leave.id] || "No comments"}</p>
                              )}
                              <div className="flex justify-end space-x-4">
                                {leave.status === "WAITING" ? (
                                  <>
                                    <button
                                      onClick={() => handleReject(leave.id)}
                                      className="flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-lg"
                                    >
                                      <MdClose size={24} className="mr-2" />
                                      Reject
                                    </button>
                                    <button
                                      onClick={() => handleApprove(leave.id)}
                                      className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg"
                                    >
                                      <MdCheck size={24} className="mr-2" />
                                      Approve
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleBackToWaiting(leave.id);
                                    }}
                                    className="flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-lg"
                                  >
                                    Return to Waiting
                                  </button>
                                )}
                              </div>
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

export default LeaveRequestTable;
