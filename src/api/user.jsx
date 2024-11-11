import axios from "../config/axios";

export const clockIn = (latitude, longitude, location,token) => {
  return axios.post("/clock-in", { latitude, longitude, location },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const clockOut = (latitude, longitude, location,token) => {
  return axios.post("/clock-out", { latitude, longitude, location },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAttendanceData = (token)=> axios.get('/get-attendance-data',{
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export const getSiteLocation = () => axios.get("/user/getsitelocation");