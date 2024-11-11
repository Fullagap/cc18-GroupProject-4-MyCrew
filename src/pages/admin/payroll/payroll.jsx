import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'; // ใช้ axios สำหรับการดึงข้อมูลจาก API

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [showAll, setShowAll] = useState(false);
  const [employees, setEmployees] = useState([]); // ข้อมูลพนักงานที่ดึงมาจาก API

  // ดึง token จาก localStorage หรือจาก cookies
  const token = localStorage.getItem('token'); // หรือใช้ sessionStorage หรือ cookie ตามที่เก็บไว้

  // ตรวจสอบว่า token มีอยู่ไหม
  if (!token) {
    // ถ้าไม่มี token ควร redirect หรือแจ้งผู้ใช้ให้ login ใหม่
    console.log('No token found. Please login.');
    return <div>Please login to view payroll details.</div>;
  }

  // ดึงข้อมูลพนักงานจาก API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/payroll', {
          headers: {
            Authorization: `Bearer ${token}`, // ส่ง token ไปใน header
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      }
    };
    fetchEmployees();
  }, [token]); // ดึงข้อมูลเมื่อ token มีการเปลี่ยนแปลง

  // ฟังก์ชันสำหรับการกรองข้อมูลตามเดือนและปี
  const filteredEmployees = employees.filter(employee => {
    const date = new Date(employee.salaryDate);
    if (showAll) {
      return true;
    }
    return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
  }).sort((a, b) => new Date(b.salaryDate) - new Date(a.salaryDate));

  // ฟังก์ชันสำหรับการส่งข้อมูลไปยัง Backend
  const handleSendData = async (employeeId, netSalary, salaryDate) => {
    try {
      const response = await axios.post('/api/payroll/submit', {
        userId: employeeId,
        paidAmount: netSalary,
        paidDate: salaryDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ไปใน header
        },
      });
      alert('Data successfully submitted');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl text-center mb-6">Payroll Details</h2>

      {/* ปุ่ม Show All */}
      <button 
        className="my-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors" 
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Filtered" : "Show All"}
      </button>

      {/* Filter */}
      {!showAll && (
        <div className="flex justify-center gap-6 mb-6">
          <FormControl fullWidth>
            <InputLabel htmlFor="month-native">Month</InputLabel>
            <NativeSelect
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              inputProps={{
                name: 'month',
                id: 'month-native',
              }}
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </NativeSelect>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="year-native">Year</InputLabel>
            <NativeSelect
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              inputProps={{
                name: 'year',
                id: 'year-native',
              }}
            >
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </NativeSelect>
          </FormControl>
        </div>
      )}

      {/* ตารางข้อมูลพนักงาน */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="payroll table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Salary</TableCell>
                <TableCell align="center">Income</TableCell>
                <TableCell align="center">Compensation</TableCell>
                <TableCell align="center">Social Security Fund</TableCell>
                <TableCell align="center">Provident Fund</TableCell>
                <TableCell align="center">Tax</TableCell>
                <TableCell align="center">Net Income</TableCell>
                <TableCell align="center">Net Salary</TableCell>
                <TableCell align="center">Salary Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => {
                  const netIncome = employee.income - (employee.tax + employee.socialSecurityFund + employee.providentFund);
                  const netSalary = employee.salary + netIncome;

                  return (
                    <TableRow key={employee.id}>
                      <TableCell align="center">{employee.id}</TableCell>
                      <TableCell align="center">{employee.name}</TableCell>
                      <TableCell align="center">{employee.position}</TableCell>
                      <TableCell align="center">{employee.salary}</TableCell>
                      <TableCell align="center">{employee.income}</TableCell>
                      <TableCell align="center">{employee.compensation}</TableCell>
                      <TableCell align="center">{employee.socialSecurityFund}</TableCell>
                      <TableCell align="center">{employee.providentFund}</TableCell>
                      <TableCell align="center">{employee.tax}</TableCell>
                      <TableCell align="center">{netIncome}</TableCell>
                      <TableCell align="center">{netSalary}</TableCell>
                      <TableCell align="center">{employee.salaryDate}</TableCell>
                      <TableCell align="center">
                        <button
                          onClick={() => handleSendData(employee.id, netSalary, employee.salaryDate)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                          Submit
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={13} align="center" className="py-4 text-gray-500">No data available for this month/year.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Payroll;
