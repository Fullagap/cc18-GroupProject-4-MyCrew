import { MdDescription } from "react-icons/md";
import axios from "../config/axios";

export const request = (id) => {
    return axios.get(`http://localhost:8890/checkRequest/${id}`);
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

export const addItem = (item) => {
    return axios.post(`http://localhost:8890/createItem`, item);
}

export const checkAllItem = () => {
    return axios.get(`http://localhost:8890/checkItem`);
}

export const checkAllItemManage = (id) => {
    return axios.get(`http://localhost:8890/checkItemSup/${id}`);
}

export const changeStatusItem = (id,status) => {
    return axios.patch(`http://localhost:8890/changeStatusRequestItem/${id}` ,{
        status
    });
}

export const checkUserAllItem = (id) => {
    return axios.get(`http://localhost:8890/checkUserRequestItem/${id}`);
}

export const createRequestItem = (userId,itemId,description) => {
    return axios.post(`http://localhost:8890/createRequestItem`, userId, itemId, description);
}