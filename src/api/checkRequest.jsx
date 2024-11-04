import axios from "../config/axios";

export const request = (a) => {
    return axios.get(`http://localhost:8890/checkRequest/${a}`);
}

export const changeStatus = (id,status) => {
    return axios.patch(`http://localhost:8890/changeStatus/${id}` ,{
        status
    });
}

export const changeComment = (id,comment) => {
    return axios.patch(`http://localhost:8890/changeComment/${id}` ,{
        comment
    });
}