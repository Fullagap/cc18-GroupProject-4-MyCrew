import React from 'react';

const Hierarchy = () => {
  const orgData = {
    role: "Board of Directors",
    children: [{
      role: "CEO",
      children: [
        {
          role: "Advisory Board",
        },
        {
          role: "Staff Director",
        },
        {
          role: "Volunteer Director",
        }
      ]
    }]
  };

  const departmentData = [
    {
      director: "Finance Director",
      specialist: "Finance Specialist"
    },
    {
      director: "Communications Director",
      specialist: "Communications Specialist"
    },
    {
      director: "Fundraising Director",
      specialist: "Fundraising Specialist"
    },
    {
      director: "Program Director",
      specialist: "Program Specialist"
    },
    {
      director: "Operations Director",
      specialist: "Operations Specialist"
    }
  ];

  const Box = ({ title, isTop }) => (
    <div className={`relative px-2 py-2 rounded-lg text-center  text-sm ${
      isTop ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-gray-800'
    }`}>
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-12 h-12 rounded-full bg-white border-2 border-indigo-200 overflow-hidden">
          <img 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
            alt="profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="mt-4">
        {title}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-8 ">
      <h1 className="text-2xl font-bold text-center mb-8">Hierarchical Structure</h1>
      
      <div className="flex flex-col items-center space-y-8">
        {/* Top Level */}
        <div className="relative w-48">
          <Box title={orgData.role} isTop={true} />
          {/* Vertical line to CEO */}
          <div className="absolute w-0.5 h-16 bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        {/* CEO Level */}
        <div className="relative w-48">
          <Box title={orgData.children[0].role} isTop={true} />
          {/* Vertical line to directors */}
          <div className="absolute w-0.5 h-16 bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
          {/* Horizontal line for directors */}
          <div className="absolute w-full h-0.5 bg-gray-300 left-0 top-full"></div>
        </div>
        
        {/* Director Level */}
        <div className="relative">
          {/* Container for horizontal line */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-full">
            {/* <div className="w-full h-0.5 bg-gray-300"></div> */}
          </div>
          <div className="flex justify-center space-x-8">
            {orgData.children[0].children.map((item, index) => (
              <div key={index} className="relative w-40">
                <Box title={item.role} isTop={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Department Level */}
        <div className="relative w-full">
          {/* Horizontal line connecting all departments */}

          {/* <div className="absolute -top-8 w-full h-0.5 bg-gray-300"></div> */}
          
          <div className="flex justify-between  px-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="relative flex flex-col items-center space-y-12 ">
                <div className="relative w-36">
                  <Box title={dept.director} isTop={false} />
                  {/* Vertical line to specialist */}
                  <div className="absolute w-0.5 h-12 bg-gray-300 left-1/2 transform -translate-x-1/2 top-full"></div>
                </div>
                <div className="w-36">
                  <Box title={dept.specialist} isTop={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hierarchy;