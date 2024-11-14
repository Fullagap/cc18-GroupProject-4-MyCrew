import React, { useState } from 'react';
import { fetchPayrollData, submitPayrollData, fetchAllPayrollData, checkPayrollDataDuplicate } from '../../../api/payroll';
import { toast } from 'react-toastify';

const PayrollPage = ({ token }) => {
  const [formData, setFormData] = useState({ month: '', year: '' });
  const [payrollData, setPayrollData] = useState([]);
  const [allPayrollData, setAllPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [inputError, setInputError] = useState({ month: '', year: '' }); // เก็บข้อผิดพลาดสำหรับเดือนและปี

  const handleFetchPayrollData = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const data = await fetchPayrollData(formData.month, formData.year, token);
      // จัดเรียงข้อมูลตามปีและเดือนจากใหม่ไปเก่า
      data.sort((a, b) => {
        if (b.year === a.year) {
          return b.month - a.month;  // เรียงจากเดือนล่าสุด
        }
        return b.year - a.year;  // เรียงจากปีล่าสุด
      });
      setPayrollData(data);
      if (data.length === 0) {
        setError('No payroll data found for this month and year.');
      }
    } catch (err) {
      setError('Please fill in all required fields');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPayroll = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const duplicateCheck = await checkPayrollDataDuplicate(formData, token);

      if (duplicateCheck !== 'No duplicate data') {
        toast.error(duplicateCheck);
        setLoading(false);
        return;
      }

      await submitPayrollData(formData);
      setSuccessMessage('Payroll data submitted successfully');
      setFormData({ month: '', year: '' });
      toast.success('Payroll data submitted successfully');
    } catch (err) {
      setError('Error occurred while submitting payroll data');
      toast.error('Error occurred while submitting payroll data');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllPayrollData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllPayrollData(token);

      data.sort((a, b) => {
        if (b.year === a.year) {
          return b.month - a.month;
        }
        return b.year - a.year;
      });
      setAllPayrollData(data);
    } catch (err) {
      setError('Error occurred while fetching all payroll data');
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

  const handleInputChange = (e, field) => {
    const value = e.target.value;
  
    // ตรวจสอบว่าเป็นตัวเลขหรือไม่
    if (value !== '' && isNaN(value)) {
      setInputError({ ...inputError, [field]: 'Only numbers are allowed' });
    } else {
      setInputError({ ...inputError, [field]: '' });
    }
  
    // อัพเดทค่า formData โดยไม่ทำให้ข้อมูลหาย
    setFormData({ ...formData, [field]: value });
  };
  
  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payroll Management</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pay Period and Submit Payroll Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            
            placeholder="Month"
            value={formData.month}
            onChange={(e) => handleInputChange(e, 'month')}
            className={`p-3 border ${inputError.month ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {inputError.month && <p className="text-red-500 text-xs mt-1">{inputError.month}</p>}
          
          <input
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => handleInputChange(e, 'year')}
            className={`p-3 border ${inputError.year ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {inputError.year && <p className="text-red-500 text-xs mt-1">{inputError.year}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleFetchPayrollData}
            disabled={loading || inputError.month || inputError.year}
            className="w-full p-3 bg-[#082777] text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-300"
          >
            {loading ? 'Fetching Data...' : 'Pay Period'}
          </button>
          <button
            onClick={handleSubmitPayroll}
            disabled={loading || inputError.month || inputError.year}
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none disabled:bg-gray-300"
          >
            {loading ? 'Submitting...' : 'Generate payroll'}
          </button>
        </div>
        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* ข้อมูล Payroll ของเดือนและปีที่ระบุ */}
      {payrollData.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Payroll Data</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">User ID</th>
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">Month</th>
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">Year</th>
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">Salary</th>
                  <th className="px-6 py-3 border-b text-left font-medium text-gray-600">Net income</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b text-gray-700">{item.userId}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{item.month}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{item.year}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{item.salary}</td>
                    <td className="px-6 py-4 border-b text-gray-700">{item.netIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        payrollData.length === 0 && <p className="text-gray-500 mt-4">No payroll data for the selected month and year</p>
      )}

      <div className="mb-6">
        <button
          onClick={toggleShowAll}
          disabled={loading}
          className={`w-full mt-3 p-3 text-white rounded-md hover:bg-blue-700 focus:outline-none ${showAll ? 'bg-red-500' : 'bg-[#082777]'} disabled:bg-gray-300`}
        >
          {loading ? 'Loading...' : showAll ? 'Hide All Data' : 'Show All Data'}
        </button>
        {showAll && allPayrollData.length > 0 ? (
          <div className="mt-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-b text-left">User ID</th>
                  <th className="px-4 py-2 border-b text-left">Month</th>
                  <th className="px-4 py-2 border-b text-left">Year</th>
                  <th className="px-4 py-2 border-b text-left">Salary</th>
                  <th className="px-4 py-2 border-b text-left">Net income</th>
                </tr>
              </thead>
              <tbody>
                {allPayrollData.map((payroll, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{payroll.userId}</td>
                    <td className="px-4 py-2 border-b">{payroll.month}</td>
                    <td className="px-4 py-2 border-b">{payroll.year}</td>
                    <td className="px-4 py-2 border-b">{payroll.salary}</td>
                    <td className="px-4 py-2 border-b">{payroll.netIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          showAll && <p className="text-gray-500 mt-4">No payroll data available</p>
        )}
      </div>
    </div>
  );
};

export default PayrollPage;
