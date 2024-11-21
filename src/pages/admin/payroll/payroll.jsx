import React, { useEffect, useState } from 'react';
import { fetchAllPayrollData, submitPayrollData, checkPayrollDataDuplicate } from '../../../api/payroll';
import { toast } from 'react-toastify';
import { MaterialReactTable } from "material-react-table";
import { LinearProgress, Box, Typography, Button } from '@mui/material';

const PayrollPage = ({ token }) => {
  const [formData, setFormData] = useState({ month: '', year: '' });
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [inputError, setInputError] = useState({ month: '', year: '' });

  useEffect(() => {
    handleFetchAllPayrollData(); // ดึงข้อมูลทั้งหมดเมื่อหน้าโหลด
  }, []);

  const handleFetchAllPayrollData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllPayrollData(token);
      // แปลงโครงสร้างข้อมูล
      const transformedData = data.map((item) => ({
        userId: item.userId,
        firstName: item.firstName,
        lastName: item.lastName,
        month: item.month,
        year: item.year,
        salary: item.salary,
        netIncome: item.netIncome,
        // เพิ่มฟิลด์อื่น ๆ ตามที่ต้องการ
      }));
      transformedData.sort((a, b) => (b.year === a.year ? b.month - a.month : b.year - a.year));
      setPayrollData(transformedData);
    } catch (err) {
      setError('Error occurred while fetching payroll data');
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmitPayroll = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
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
      handleFetchAllPayrollData(); // รีเฟรชข้อมูลหลังการ submit
    } catch (err) {
      setError('Error occurred while submitting payroll data');
      toast.error('Error occurred while submitting payroll data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (value !== '' && isNaN(value)) {
      setInputError({ ...inputError, [field]: 'Only numbers are allowed' });
    } else {
      setInputError({ ...inputError, [field]: '' });
    }
    setFormData({ ...formData, [field]: value });
  };

  const columns = [
    { header: "User ID", accessorKey: "userId", size: 50 },
    { header: "First Name", accessorKey: "firstName", size: 50 },
    { header: "Last Name", accessorKey: "lastName", size: 50 },
    { header: "Month", accessorKey: "month", size: 50 },
    { header: "Year", accessorKey: "year", size: 50 },
    { header: "Salary", accessorKey: "salary", size: 100 },
    { header: "Net Income", accessorKey: "netIncome", size: 100 },
  ];
  

  return (
    <Box className="max-w-screen-lg mx-auto p-6 bg-gray-100 rounded-lg">
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Payroll Management
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Generate Payroll Data</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <input
            placeholder="Month"
            value={formData.month}
            onChange={(e) => handleInputChange(e, 'month')}
            className={`p-3 border ${inputError.month ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
          />
          {inputError.month && <Typography color="error">{inputError.month}</Typography>}

          <input
            placeholder="Year"
            value={formData.year}
            onChange={(e) => handleInputChange(e, 'year')}
            className={`p-3 border ${inputError.year ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
          />
          {inputError.year && <Typography color="error">{inputError.year}</Typography>}
        </Box>

        <Button
          onClick={handleSubmitPayroll}
          disabled={loading || !!inputError.month || !!inputError.year}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {loading ? 'Submitting...' : 'Generate Payroll'}
        </Button>
        {successMessage && <Typography color="green" sx={{ mt: 1 }}>{successMessage}</Typography>}
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <MaterialReactTable
        columns={columns}
        data={payrollData}
        enableStickyHeader
        muiTableContainerProps={{ sx: { overflowX: 'auto' } }}
        initialState={{ pagination: { pageSize: 10 } }}
      />

      {!loading && payrollData.length === 0 && (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          No payroll data available
        </Typography>
      )}
    </Box>
  );
};

export default PayrollPage;
