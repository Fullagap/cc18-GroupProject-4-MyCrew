import axios from 'axios';

const API_URL = '/payroll';

// Fetch payroll data based on userId, month, and year
export const fetchPayrollData = async ( month, year, token) => {
  try {
    const response = await axios.get(API_URL, {
      params: { month, year },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching payroll data');
  }
};

// Submit payroll data for a single user
export const submitPayrollData = async (data, token) => {
  console.log('ข้อมูลที่กรอก:', data);
  console.log('Token:', token);
  // try {
  //   const response = await axios.post(`${API_URL}/submit`, data, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return response.data;
  // } catch (error) {
  //   throw new Error('Error submitting payroll data');
  // }
};

// Fetch all payroll data (no filters)
export const fetchAllPayrollData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching all payroll data');
  }
};

// Submit all payroll data in bulk
export const submitAllPayrollData = async (allPayrollData, token) => {
  try {
    const response = await axios.post(`${API_URL}/submitAll`, allPayrollData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error submitting all payroll data');
  }
};
