import axios from "../config/axios"

export const getSessionApi = ()=> axios.get(`/calendar/session`)

export const addSessionApi = ()=> axios.get(`/calendar/session/addSession/${createUserId}`)
export const updateSessionApi = (sessionId,form)=> axios.get(`/calendar/session/updateSession/${sessionId}`,form)
export const deleteSessionApi = (sessionId)=> axios.get(`/calendar/deleteSession/${sessionId}`)