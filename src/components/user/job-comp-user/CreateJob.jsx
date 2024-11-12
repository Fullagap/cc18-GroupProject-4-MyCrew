// import React, { useEffect, useState } from "react";
// import adminStore from "../../../store/admin-store";
// import useAuthStore from "../../../store/authSrore";
// import { toast } from "react-toastify";

// export default function CreateJob() {
//   const getAllEmployees = adminStore((state) => state.getAllEmployees);
//   const allEmployees = adminStore((state) => state.allEmployees);
//   const token = useAuthStore((state) => state.token);
//   const user = useAuthStore((state) => state.user);

//   const [modal, setModal] = useState(false);
//   const [userInfo, setUserInfo] = useState(() => {
//     // Retrieve from localStorage, or use an empty array if no data
//     const savedUserInfo = localStorage.getItem("userInfo");
//     return savedUserInfo ? JSON.parse(savedUserInfo) : [];
//   });
//   const currentUser = allEmployees.find((employee) => employee.id === user.id); //โชว์ข้อมูลทุกอย่างของไอดีนี้

//   useEffect(() => {
//     getAllEmployees(token);
//   }, []);

//   const hdlAddClick = (id, name, img) => {
//     if (userInfo.some((user) => user.id === id)) {
//       toast.error("Already Added");
//     } else {
//       const updatedUserInfo = [
//         ...userInfo,
//         { id, firstName: name, profileImg: img },
//       ];
//       setUserInfo(updatedUserInfo);
//       localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo)); // เก็บไว้ใน localStorage
//     }
//   };

//   const hdlDelClick = (id) => {
//     const delUserInfo = userInfo.filter((user) => user.id !== id);
//     setUserInfo(delUserInfo);
//     localStorage.setItem("userInfo", JSON.stringify(delUserInfo)); // อัปเดตใน localStorage ด้วย เพื่อให้ข้อมูลไม่หายเมื่อรีเฟรช
//   };

//   return (
//     <div className="p-4 flex flex-col gap-2">
//       <div className="text-4xl font-bold p-4">
//         Department :{" "}
//         {currentUser?.departmentId === 1 ? "Engineer" : "Purchaser"}
//         {/* ถ้ามีแผนกมากกว่านี้ ต้องดึงชื่อในDBมาโช ทำ if else แบบนี้ไม่ได้  */}
//       </div>

//       <div className="flex gap-4">
//         <div className="border rounded-xl p-4 bg-[#F3F8FF] h-min w-[850px]">
//           <p className="text-3xl pb-4">Project1</p>
//           <p>
//             Detail of Project Lorem ipsum dolor, sit amet consectetur
//             adipisicing elit. Praesentium quo a eum optio quas ipsam placeat,
//             nostrum vel accusamus fugit provident ex harum voluptatum, quia
//             voluptates dolor id soluta excepturi.
//           </p>

//           <div className="mt-5 p-4 bg-white ">
//             <p className="mb-4">User</p>
//             <div className="flex justify-between gap-4">
//               <div className="flex gap-8 flex-wrap">
//                 {userInfo.map((el) => (
//                   <div key={el.id} className="flex flex-col items-center">
//                     <img
//                       src={
//                         el.img ||
//                         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//                       }
//                       alt="Profile"
//                       className="h-14 w-14 rounded-full bg-slate-200"
//                     />
//                     <p className="flex items-center justify-center">
//                       {el.firstName}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex gap-5 items-start">
//                 <button
//                   className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
//                   onClick={() => setModal(!modal)}
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {modal && (
//           <div className="flex flex-col bg-[#F3F8FF] p-4 rounded-xl w-[30%] ">
//             {allEmployees
//               .sort((a, b) => {
//                 const aIsAdded = userInfo.some((user) => user.id === a.id);
//                 const bIsAdded = userInfo.some((user) => user.id === b.id);
//                 return bIsAdded - aIsAdded; // จัดเรียงให้สีเขียวอยู่ก่อน อันนี้ copy GPT มา
//               })
//               .map((el) => {
//                 const isAdded = userInfo.some((user) => user.id === el.id);
//                 return (
//                   <li key={el.id} className="flex justify-between py-2">
//                     <span className={`${isAdded ? "text-green-500" : ""}`}>
//                       {el.firstName}
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
//                         onClick={() =>
//                           hdlAddClick(el.id, el.firstName, el.profileImg)}
//                       >
//                         Add
//                       </button>
//                       <button
//                         className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
//                         onClick={() => hdlDelClick(el.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import useAuthStore from "../../../store/authSrore";
import { toast } from "react-toastify";

export default function CreateJob({ project, allEmployees,deleteProject,leader,userId }) {

console.log("Test",project)

  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    // Retrieve from localStorage, or use an empty array if no data
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : [];
  });

  const openEdit=()=>{
    if(userId === leader.id){
    setModal(!modal)
    }
  }

  const hdlAddClick = (id, name, img) => {
    if(userId === leader.id){
    if (userInfo.some((user) => user.id === id)) {
      toast.error("Already Added");
    } else {
      const updatedUserInfo = [
        ...userInfo,
        { id, firstName: name, profileImg: img },
      ];
      setUserInfo(updatedUserInfo);
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo)); // เก็บไว้ใน localStorage
    }
  }
  };

  const hdlDelClick = (id) => {
    if(userId === leader.id){
    const delUserInfo = userInfo.filter((user) => user.id !== id);
    setUserInfo(delUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(delUserInfo)); // อัปเดตใน localStorage ด้วย เพื่อให้ข้อมูลไม่หายเมื่อรีเฟรช
    }
  };

  return (
    <div className="my-2 flex flex-col gap-2">

      <div className="flex gap-4">

        <div className="border rounded-xl p-4 bg-[#F3F8FF] h-min w-[850px]">
          <p className="text-3xl pb-4">{project.name}</p>
          <p>{project.description}</p>

          <div className="mt-5 p-4 bg-white ">
            <p className="mb-4">User</p>
            <div className="flex justify-between gap-4">
              <div className="flex gap-8 flex-wrap">
                {userInfo.map((el) => (
                  <div key={el.id} className="flex flex-col items-center">
                    <img
                      src={
                        el.img ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="Profile"
                      className="h-14 w-14 rounded-full bg-slate-200"
                    />
                    <p className="flex items-center justify-center">
                      {el.firstName}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-5 items-start">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => openEdit()}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => deleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {modal && (
          <div className="flex flex-col bg-[#F3F8FF] p-4 rounded-xl w-[30%] overflow-y-scroll">
            {allEmployees
              .sort((a, b) => {
                const aIsAdded = userInfo.some((user) => user.id === a.id);
                const bIsAdded = userInfo.some((user) => user.id === b.id);
                return bIsAdded - aIsAdded; // จัดเรียงให้สีเขียวอยู่ก่อน อันนี้ copy GPT มา
              })
              .map((el) => {
                const isAdded = userInfo.some((user) => user.id === el.id);
                return (
                  <li key={el.id} className="flex justify-between py-2">
                    <span className={`${isAdded ? "text-green-500" : ""}`}>
                      {el.firstName}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                        onClick={() =>
                          hdlAddClick(el.id, el.firstName, el.profileImg)
                        }
                      >
                        Add
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => hdlDelClick(el.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
