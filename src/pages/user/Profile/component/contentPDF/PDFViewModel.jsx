import { PDFViewer } from "@react-pdf/renderer";
import ContentPayslip from "./contentPayslip";
import useAuthStore from "../../../../../store/authSrore";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PDFViewModel() {
  const user = useAuthStore((state) => state.user);
  const date = new Date()
  const body = {
      month : Number(date.getMonth()) ,
      year : Number(date.getFullYear())
  }
  const [payroll,setPayroll] = useState({})
  console.log(body)
  const getlastedPayRecord = async () => {
    const resp = await axios.post(`user/payroll/${user.id}`,body);
    setPayroll(resp.data)
  };
  useEffect(()=>{
    getlastedPayRecord()
  },[])
  return (
    <div>
      <PDFViewer width="1000" height="650" className="app">
        <ContentPayslip payroll={payroll} />
      </PDFViewer>
    </div>
  );
}
