import axios from 'axios';

const API_URL = '/payroll';


export const fetchPayrollData = async (month, year) => {
  const token = localStorage.getItem('token'); 
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


export const submitPayrollData = async (data) => {
  const token = localStorage.getItem('token'); 
  console.log('Data being sent:', data);
  console.log('Token:', token);

  try {
   
    const duplicateCheck = await checkPayrollDataDuplicate(data, token);
    if (duplicateCheck === 'No duplicate data') {
      
      const response = await axios.post('/salary', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } else {
      
      throw new Error(`Unable to submit data: ${duplicateCheck}`);
    }
  } catch (error) {
    console.error('Error submitting payroll data:', error);
    throw new Error('Error submitting payroll data');
  }
};


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


export const submitAllPayrollData = async (allPayrollData) => {
  const token = localStorage.getItem('token'); 
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


export const checkPayrollDataDuplicate = async (data, token) => {
  try {
    
    const allData = await fetchAllPayrollData(token);
   
    
   
    const month = String(data.month).padStart(2, '0'); 
    const year = String(data.year); 

   
    const duplicate = allData.some(
      (entry) => String(entry.month).padStart(2, '0') === month && String(entry.year) === year
    );

    console.log("duplicate", duplicate); 
    
    
    if (duplicate) {
      return `Payroll data for month ${data.month} year ${data.year} already exists`;
    }

    
    return 'No duplicate data';
    
  } catch (error) {
    throw new Error(error.message || 'Error occurred while checking data');
  }
};
