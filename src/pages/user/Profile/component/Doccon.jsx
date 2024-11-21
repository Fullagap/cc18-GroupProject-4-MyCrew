import React from "react";
import { Link } from "react-router-dom";
import { GoLaw } from "react-icons/go";
import IconPaySlip from "./Icon/IconPaySlip";
import { IoIosInformationCircle } from "react-icons/io";
import { GrCertificate } from "react-icons/gr";
import { RiContractLine } from "react-icons/ri";
import { AiOutlineSecurityScan } from "react-icons/ai";

const classLink =
  "flex flex-col border w-40 rounded-xl bg-[#F3F8FF] p-4 hover:bg-[#2453CA] hover:scale-105 hover:duration-200 active:bg-green-400 rounded-xl shadow-sm px-3 py-2 gap-2";

export default function Doccon() {
  return (
    <div className="flex flex-col w-full h-full justify-around">

      <p className="text-4xl font-bold text-center">Document Request</p>

      <div className="flex flex-wrap justify-center px-4 gap-4 ">
        <Link to="/user/profile/doccon/payslip" className={classLink}>
          <IconPaySlip/>
          <p className="text-center">
            PaySlip
            <br />
            Request.
          </p>
        </Link>

        <Link to="/user/profile/doccon/payslip" className={classLink}>
          <div className="flex justify-center">
            <GoLaw size={130} />
          </div>
          <p className="text-center">
            Legal Documents
            <br />
            Request.
          </p>
        </Link>

        <Link to="/user/profile/doccon/payslip" className={classLink}>
          <div className="flex justify-center">
            <IoIosInformationCircle size={130} />
          </div>
          <p className="text-center">
            Information
            <br />
            Request.
          </p>
        </Link>

        <Link to="/user/profile/doccon/payslip" className={classLink}>
          <div className="flex justify-center">
            <GrCertificate size={130} />
          </div>
          <p className="text-center">
            Employment Certificate
            <br />
            Request.
          </p>
        </Link>

        <Link to="/user/profile/doccon/payslip" className={classLink}>
          <div className="flex justify-center">
            <RiContractLine size={130} />
          </div>
          <p className="text-center">
            Contract
            <br />
            Request.
          </p>
        </Link>

        <Link to="/user/profile/doccon/payslip" className={classLink}>
          <div className="flex justify-center">
            <AiOutlineSecurityScan size={130} />
          </div>
          <p className="text-center">
            Social Security
            <br />
            Request.
          </p>
        </Link>
      </div>
    </div>
  );
}
