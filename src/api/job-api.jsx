import axios from "../config/axios";

export const getProjectApi = () => axios.get(`/job/Project`);
export const projectCreateApi = (form) => axios.post(`/job/ProjectCreate`,form);
export const projectUpdateApi = (projectId,form) => axios.patch(`/job/ProjectUpdate/${projectId}`,form);
export const projectDeleteApi = (projectId) => axios.delete(`/job/ProjectDelete/${projectId}`);
