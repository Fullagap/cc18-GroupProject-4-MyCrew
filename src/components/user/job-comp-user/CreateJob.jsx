import React, { useState } from "react";
import useAuthStore from "../../../store/authSrore";
import { toast } from "react-toastify";

export default function CreateJob({
  project,
  allEmployees,
  deleteProject,
  leader,
  userId,
}) {
  const [modal, setModal] = useState(false);
  const [modalComplete, setModalComplete] = useState(false);
  const [statusComplete, setStatusComplete] = useState("Submit for Approval");
  const [comment, setComment] = useState("");

  console.log("comment", comment);

  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : [];
  });

  const openEdit = () => {
    if (userId === leader?.id) {
      setModal(!modal);
    }
  };

  const hdlAddClick = (id, name, img) => {
    if (userId === leader?.id) {
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
    if (userId === leader?.id) {
      const delUserInfo = userInfo.filter((user) => user.id !== id);
      setUserInfo(delUserInfo);
      localStorage.setItem("userInfo", JSON.stringify(delUserInfo)); // อัปเดตใน localStorage ด้วย เพื่อให้ข้อมูลไม่หายเมื่อรีเฟรช
    }
  };

  const hdlProjectUpdateClick = (message) => {
    const id = project.id;
    if (message === "Complete") {
      const completeDate = new Date();
      //API Update complete(id,completeDate)
      setModalComplete(true);
      setStatusComplete("Awaiting Approval");
    }

    if (message === "Approved") {
      //API เรียกProjectมาใช้ เช่น
      // const IsComplete = ProjectApi.completeDate
      //API Update complete(id,IsComplete)
      setModalComplete(false);
      setStatusComplete("Complete");
      setComment("");
    }
    if (message === "Reject") {
      //API เรียกProjectมาใช้ เช่น
      // const completeDate = ProjectApi.dueDate
      //API Update complete(id,completeDate) ไม่รู้ส่งกลับเป็ฯ null ได้ไหม เลยส่ง DueDate กลับไป
      /////ถ้าใช้ null ได้
      //API Update complete(id,null)
      setModalComplete(false);
      setStatusComplete("Submit for Approval");
    }
  };

  return (
    <div className="my-2 flex flex-col gap-2">
      <div className="flex gap-4">
        <div className="border rounded-xl p-4 bg-[#F3F8FF] h-min w-[850px]">
          <p className="text-3xl pb-4">{project.title}</p>
          <p className="pb-4">{project.description}</p>
          <p>Due date : {project.dueDate}</p>

          <div className="flex flex-col gap-6 mt-5 p-4 rounded-xl bg-white ">
            <p>User</p>
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

              {userId === leader?.id && (
                <div className="flex gap-5 items-start">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                    onClick={() => openEdit()}
                  >
                    Edit User
                  </button>

                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete Project
                  </button>
                </div>
              )}
            </div>
            <hr />
           
            <div className="flex justify-between">


              <div className="flex flex-col gap-2">


                {comment.length > 0 && (
                  <div className="border rounded-xl p-2">
                    <p className="text-red-500 font-semibold">Comment</p>
                    <p>{comment}</p>
                  </div>
                )}

                <button
                  className="bg-green-500 text-white w-48 py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => hdlProjectUpdateClick("Complete")}
                >
                  {statusComplete}
                </button>
                </div>

                {modalComplete && userId === leader?.id && (
                  <div className="flex flex-col gap-5 items-end">
                    <div>
                      <textarea
                        className="p-2 border rounded-xl"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4" // จำนวนแถว
                        cols="50" // จำนวนคอลัมน์
                        placeholder="Reject Comment"
                      />
                    </div>

                    <div className="flex gap-5">
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                        onClick={() => hdlProjectUpdateClick("Approved")}
                      >
                        Approved
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => hdlProjectUpdateClick("Reject")}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                
              


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
                        Add User
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => hdlDelClick(el.id)}
                      >
                        Remove User
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
