import axios from "../config/axios";

export const clockIn = (latitude, longitude) => {
    return axios.post('/clock-in', { latitude, longitude });
}
export const clockOut = (latitude, longitude) => {
    return axios.post('/clock-out', { latitude, longitude });
}