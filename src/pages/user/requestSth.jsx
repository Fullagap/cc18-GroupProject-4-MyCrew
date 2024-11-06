import React from 'react';
import { MdAdd, MdFileDownload, MdAccessTime, MdError, MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const RequestList = () => {

    const navigate = useNavigate();

  const requests = [
    {
      no: 1,
      name: 'ใบรับรองเงินเดือน',
      status: 'Requested',
      remark: ''
    },
    {
      no: 2,
      name: 'ใบภพ 50',
      status: 'Download',
      remark: ''
    },
    {
      no: 3,
      name: 'ใบรับรองสถานะการเป็นพนักงาน',
      status: 'Download',
      remark: ''
    },
    {
      no: 4,
      name: 'จองห้องประชุม',
      status: 'Rejected',
      remark: 'มีการใช้งานห้องประชุมในช่วงเวลาที่ท่านได้จองเรียบร้อยแล้ว'
    },
    {
      no: 5,
      name: 'ใบเบิกค่ารักษาพยาบาล',
      status: 'Rejected',
      remark: 'รายละเอียดการรักษาไม่ถูกต้องกรุณาทำรายการใหม่'
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Requested':
        return {
          color: 'text-yellow-600',
          icon: <MdAccessTime className="inline-block mr-1" />,
          bgColor: 'bg-yellow-50'
        };
      case 'Download':
        return {
          color: 'text-green-600',
          icon: <MdFileDownload className="inline-block mr-1" />,
          bgColor: 'bg-green-50'
        };
      case 'Rejected':
        return {
          color: 'text-red-600',
          icon: <MdError className="inline-block mr-1" />,
          bgColor: 'bg-red-50'
        };
      default:
        return {
          color: 'text-gray-600',
          icon: <MdCheckCircle className="inline-block mr-1" />,
          bgColor: 'bg-gray-50'
        };
    }
  };

  const onClickAddRequest = () => {
    navigate('/requestItem');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">รายการร้องขอ</h2>
          <button 
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center gap-1"
            onClick={onClickAddRequest}
          >
            <MdAdd className="text-xl" />
            Add request
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left w-16">No.</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left w-32">Status</th>
                <th className="py-3 px-4 text-left">Remark</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => {
                const statusInfo = getStatusInfo(request.status);
                return (
                  <tr key={request.no} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">{request.no}.</td>
                    <td className="py-4 px-4">{request.name}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${statusInfo.color} ${statusInfo.bgColor}`}>
                        {statusInfo.icon}
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{request.remark}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestList;