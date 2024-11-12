import React, { useEffect, useState } from "react";
import CreateJob from "../../components/user/job-comp-user/CreateJob";
import adminStore from "../../store/admin-store";
import useAuthStore from "../../store/authSrore";
import { toast } from "react-toastify";
import userStore from "../../store/user-store";

export default function job() {
  const getAllEmployees = adminStore((state) => state.getAllEmployees);
  const getLeaderEachSupId = userStore((state) => state.getLeaderEachSupId);
  const LeaderEachSupId = userStore((state) => state.LeaderEachSupId);
  const allEmployees = adminStore((state) => state.allEmployees);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
console.log('LeaderEachSupId', LeaderEachSupId)

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = allEmployees.find((employee) => employee.id === user.id); //โชว์ข้อมูลทุกอย่างของไอดีนี้
  const addProject = () => {
    if (!newProject.name || !newProject.description) {
      toast.error("Please fill in both the name and description.");
      return;
    } 
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    setNewProject({ name: "", description: "" });
  };

  const deleteProject = (id) => {
     if(user.id === LeaderEachSupId?.leader?.id || null){   
    if (window.confirm("Please confirm to delete this project")) {
      const notDeleteId = projects.filter((el) => el.id !== id);
      setProjects(notDeleteId);
    }
     }
  };

  const toggleDropdown = () => {
    if(user.id === LeaderEachSupId?.leader?.id || null){   
    setIsOpen(!isOpen);
  }
  };

  useEffect(() => {
    getAllEmployees(token)
    getLeaderEachSupId(user.supId,token)
  }, []);

  return (
    <div className="flex  flex-col p-4 gap-4">
      <div className="text-4xl font-bold">
        Department :{" "}
        {currentUser?.departmentId === 1 ? "Engineer" : "Purchaser"}
        {/* ถ้ามีแผนกมากกว่านี้ ต้องดึงชื่อในDBมาโช ทำ if else แบบนี้ไม่ได้  */}
      </div>

      <button
        className="border p-2 rounded-xl w-full font-bold text-xl bg-[#082777] hover:bg-blue-700"
        onClick={toggleDropdown}
      >
        <p className="text-3xl font-bold text-white">Create Project</p>
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
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
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

          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={addProject}
          >
            Add Project
          </button>
        </div>
        </div>

        {projects.map((project) => (
          <CreateJob
            key={project.id}
            project={project}
            allEmployees={LeaderEachSupId.subordinates}
            leader={LeaderEachSupId.leader}
            deleteProject={deleteProject}
            userId={user.id}
          />
        ))}

      

    </div>
  );
}
