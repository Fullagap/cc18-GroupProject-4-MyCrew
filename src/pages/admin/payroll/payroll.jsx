import React, { useState } from 'react';
import { fetchPayrollData, submitPayrollData, fetchAllPayrollData } from '../../../api/payroll';

const PayrollPage = ({ token }) => {
  const [formData, setFormData] = useState({ month: '', year: '' });
  const [payrollData, setPayrollData] = useState([]);
  const [allPayrollData, setAllPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleFetchPayrollData = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const data = await fetchPayrollData(formData.month, formData.year, token); // ใช้แค่ month และ year
      setPayrollData(data);
    } catch (err) {
      setError('กรุณากรอกข้อมูลให้ครบ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPayroll = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      await submitPayrollData(formData, token);
      setSuccessMessage('ส่งข้อมูลเงินเดือนเรียบร้อยแล้ว');
      setFormData({ month: '', year: '' });
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการส่งข้อมูลเงินเดือน');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllPayrollData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllPayrollData(token);
      setAllPayrollData(data);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการดึงข้อมูลเงินเดือนทั้งหมด');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
    } else {
      handleFetchAllPayrollData();
      setShowAll(true);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">การจัดการเงินเดือน</h1>

      {/* Input และปุ่มสำหรับ Fetch และ Submit */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">ดึงและส่งข้อมูลเงินเดือน</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            placeholder="เดือน"
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="ปี"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleFetchPayrollData}
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-300"
          >
            {loading ? 'กำลังดึงข้อมูล...' : 'ดึงข้อมูล'}
          </button>
          <button
            onClick={handleSubmitPayroll}
            disabled={loading}
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none disabled:bg-gray-300"
          >
            {loading ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
          </button>
        </div>
        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* แสดงข้อมูลที่ดึงมา */}
      {payrollData.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">ข้อมูลเงินเดือน</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">User ID</th>
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">Month</th>
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">Year</th>
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">Salary</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-gray-700">{item.userId}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{item.month}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{item.year}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{item.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        payrollData.length === 0 && <p className="text-gray-500 mt-4">ไม่มีข้อมูลเงินเดือนในเดือนและปีที่เลือก</p>
      )}

      {/* ปุ่มแสดงข้อมูลทั้งหมด */}
      <div className="mb-6">
        <button
          onClick={toggleShowAll}
          disabled={loading}
          className={`w-full mt-3 p-3 text-white rounded-md hover:bg-opacity-80 focus:outline-none ${showAll ? 'bg-red-500' : 'bg-blue-500'} disabled:bg-gray-300`}
        >
          {loading ? 'กำลังโหลด...' : showAll ? 'ซ่อนข้อมูลทั้งหมด' : 'แสดงข้อมูลทั้งหมด'}
        </button>
        {showAll && allPayrollData.length > 0 ? (
          <div className="mt-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-b text-left">User ID</th>
                  <th className="px-4 py-2 border-b text-left">Month</th>
                  <th className="px-4 py-2 border-b text-left">Year</th>
                  <th className="px-4 py-2 border-b text-left">Net Income</th>
                  <th className="px-4 py-2 border-b text-left">Income</th>
                  <th className="px-4 py-2 border-b text-left">Salary</th>
                </tr>
              </thead>
              <tbody>
                {allPayrollData.map((payroll, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{payroll.userId}</td>
                    <td className="px-4 py-2 border-b">{payroll.month}</td>
                    <td className="px-4 py-2 border-b">{payroll.year}</td>
                    <td className="px-4 py-2 border-b">{payroll.netIncome}</td>
                    <td className="px-4 py-2 border-b">{payroll.income}</td>
                    <td className="px-4 py-2 border-b">{payroll.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          showAll && <p className="text-gray-500 mt-4">ไม่มีข้อมูลเงินเดือนทั้งหมด</p>
        )}
      </div>
    </div>
  );
};

export default PayrollPage;
