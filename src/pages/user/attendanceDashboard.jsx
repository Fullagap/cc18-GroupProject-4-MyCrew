import React, { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Paper, Button } from "@mui/material";
import { LuUserSquare2, LuCalendar } from "react-icons/lu";
import userStore from "../../store/user-store";
import authStore from '../../store/authSrore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: "userId", headerName: "User ID", width: 100},
  { field: "firstName", headerName: "First Name", width: 180 },
  { field: "lastName", headerName: "Last Name", width: 180 },
  { field: "siteName", headerName: "Office", width: 180 },
  { field: "date", headerName: "Date", width: 200 },
  { field: "checkInTime", headerName: "Clock-In Time", width: 180 },
  { field: "checkOutTime", headerName: "Clock-Out Time", width: 180 },
];

export default function FilteredAttendanceDashboard() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { getAttendanceData } = userStore();
  const { token } = authStore();
  const navigate = useNavigate();


  const goToHierarchy = () =>{
    navigate('/user/hierarchy')
  }

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = dayjs(date);
    return dateObj.format('DD MMMM YYYY');
  };

  const fetchAttendanceData = async (date = null) => {
    try {
      const result = await getAttendanceData(token);
      
      let flattenedData = result.map((item) => ({
        ...item,
        siteName: item.site?.siteName || "N/A",
        firstName: item.user?.firstName || "N/A",
        lastName: item.user?.lastName || "N/A",
        checkInTime: item.checkInTime
          ? dayjs(item.checkInTime).format('HH:mm:ss')
          : "N/A",
        checkOutTime: item.checkOutTime
          ? dayjs(item.checkOutTime).format('HH:mm:ss')
          : "N/A",
        date: item.dateTime
          ? formatDate(item.dateTime)
          : "N/A",
      }));

      // Filter by selected date if present
      if (date) {
        const formattedSelectedDate = formatDate(date);
        flattenedData = flattenedData.filter(item => item.date === formattedSelectedDate);
      }

      setAttendanceData(flattenedData);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchAttendanceData();
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    fetchAttendanceData(newDate);
    setShowDatePicker(false);
  };

  const handleClearFilter = () => {
    setSelectedDate(null);
    fetchAttendanceData();
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LuUserSquare2
            style={{
              fontSize: "35px",
              marginRight: "8px",
              color: "#3f51b5",
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
            All Employees Clock-in and Clock-out List
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 2, position: "relative" }}>
          <Button
            variant="contained"
            startIcon={<LuCalendar />}
            onClick={() => setShowDatePicker(!showDatePicker)}
            sx={{ 
              bgcolor: "#082777",
              '&:hover': { bgcolor: "#1d4ed8" }
            }}
          >
            {selectedDate ? formatDate(selectedDate) : 'Select Date'}
          </Button>
          
          <Button
          variant="contained"
          onClick={() => goToHierarchy()}
          sx={{ 
            bgcolor: "#082777",
            '&:hover': { bgcolor: "#1d4ed8" }
          }}
          >
          Hierarchy
          </Button>
          
          {selectedDate && (
            <Button
              variant="outlined"
              onClick={handleClearFilter}
              sx={{ borderColor: "#3f51b5", color: "#3f51b5" }}
            >
              Clear Filter
            </Button>
          )}
          
          {showDatePicker && (
            <Paper
              sx={{
                position: 'absolute',
                top: '100%',
                right: 0,
                mt: 1,
                zIndex: 1000,
                p: 1
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: { width: '220px' }
                    }
                  }}
                />
              </LocalizationProvider>
            </Paper>
          )}
        </Box>
      </Box>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={attendanceData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } }
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}