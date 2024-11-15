import React, { useEffect, useState } from "react";
import CreateJob from "../../components/user/job-comp-user/CreateJob";
import adminStore from "../../store/admin-store";
import useAuthStore from "../../store/authSrore";
import { toast } from "react-toastify";
import userStore from "../../store/user-store";
import useJobStore from "../../store/job-store";

export default function job() {
  const getAllEmployees = adminStore((state) => state.getAllEmployees); //เรียก
  const allEmployees = adminStore((state) => state.allEmployees);       //ใช้
  const getLeaderEachSupId = userStore((state) => state.getLeaderEachSupId);//เรียก
  const LeaderEachSupId = userStore((state) => state.LeaderEachSupId);      //ใช้

  const getProject = useJobStore((state)=>state.getProject) //เรียก
  const projectDataBase = useJobStore((state)=>state.projectDataBase) //ใช้
  const projectCreate = useJobStore((state)=>state.projectCreate)  

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

// ใช้ Local ถ้าใช้DB ลบทิ้งได้เลย
const loadProjects = () => {
  const savedProjects = localStorage.getItem("projects");
  return savedProjects ? JSON.parse(savedProjects) : [];
};

  const [projects, setProjects] = useState(loadProjects); //ถ้าไม่ใช้ local ใส่เป็น []
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    dueDate: "",
    completeDate: "",
    isCompleteDate: "",
    comment: "",
  });
  console.log('projects', projects)
  console.log('newProject', newProject)

  const [isOpen, setIsOpen] = useState(false);

  const currentUser = allEmployees.find((employee) => employee.id === user.id); //โชว์ข้อมูลทุกอย่างของไอดีนี้


  const addProject = () => {
    if (!newProject.title || !newProject.description) {
      toast.error("Please fill in both the name and description.");
      return;
    } 
    const newProjects = [...projects, { ...newProject, id: projects?.length + 1 }];
    setProjects(newProjects);
    // projectCreate(projects)
 
    // API Create (projects) 
    localStorage.setItem("projects", JSON.stringify(newProjects));//ใช้ Local ถ้าใช้DB ลบทิ้งได้เลย
    setNewProject({ title: "", description: "", dueDate: "", completeDate: "", isCompleteDate: "", comment: "" });
  };

  const deleteProject = (id) => {
     if(LeaderEachSupId.subordinates?.length > 0 || user.id === LeaderEachSupId?.subordinates?.supId){   
    if (window.confirm("Please confirm to delete this project")) {
      const notDeleteId = projects.filter((el) => el.id !== id);
      setProjects(notDeleteId);
      //API Delete (id)
      localStorage.setItem("projects", JSON.stringify(notDeleteId));//ใช้ Local ถ้าใช้DB ลบทิ้งได้เลย
    }
     }
  };

  const toggleDropdown = () => {
    if(LeaderEachSupId.subordinates?.length > 0 || user.id === LeaderEachSupId?.subordinates?.supId){   
    setIsOpen(!isOpen);
  }
  };

  useEffect(() => {
    getAllEmployees(token)
    getLeaderEachSupId(user.id,token)
  }, []);

  return (
    <div className="flex  flex-col p-4 gap-4">
      <div className="text-4xl font-normal">
        Department :{" "}
        {currentUser?.departmentId === 1 ? "Engineer" : "Purchaser"}
        {/* ถ้ามีแผนกมากกว่านี้ ต้องดึงชื่อในDBมาโช ทำ if else แบบนี้ไม่ได้  */}
      </div>
    
      <button
        // className="border p-2 rounded-xl w-full font-bold text-xl bg-[#082777] hover:bg-blue-700"
        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={toggleDropdown}
      >
        <p className="text-2xl font-medium text-white">Create Project</p>
      </button>

      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >

        <div className="flex flex-col rounded-xl p-4 gap-4 bg-[#F3F8FF]">
          <input
            className="px-2"
            placeholder="Project Name"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />

          <textarea
            className="p-2"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            rows="4" // จำนวนแถว
            cols="50" // จำนวนคอลัมน์
            placeholder="Project Description"
          />

          <div>
          <p>Due date</p>
          <input type="date"
          value={newProject.dueDate}
          onChange={(e) =>
            setNewProject({ ...newProject, dueDate: e.target.value })
          }
          />
          </div>

          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={addProject}
          >
            Add Project
          </button>
        </div>
        </div>

        {projects.map((el) => (
          <CreateJob
            key={el.id}
            project={el}
            allEmployees={LeaderEachSupId.subordinates}
            leader={LeaderEachSupId.leader}
            deleteProject={deleteProject}
            subordinates={LeaderEachSupId?.subordinates}
            userId={user.id}
          />
        ))}

      

    </div>
  );
}
