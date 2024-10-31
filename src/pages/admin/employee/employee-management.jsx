import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EmployeeManagement() {
    const navigate = useNavigate()
    const hdlEditClick=()=>{
        navigate("/admin/edit-employee")
    }

  return (
    <div>
        <button onClick={()=>hdlEditClick()}>Edit</button>
    </div>
  )
}
