import axios from "../config/axios";

export const clockIn = (latitude, longitude, location) => {
  return axios.post("/clock-in", { latitude, longitude, location });
};
export const clockOut = (latitude, longitude, location) => {
  return axios.post("/clock-out", { latitude, longitude, location });
};

export const getSiteLocation = () => axios.get("/user/getsitelocation");

export const getLeaderEachSupIdApi = (id,token) => axios.get(`/admin/leader-superId/${id}`,{
  headers: { 
    Authorization: `Bearer ${token}`,
  }});;
