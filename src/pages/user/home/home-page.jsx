import React from "react";
import { ArrowRight, Users, BarChart2, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-4 bg-[#F3F8FF] rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen  bg-[#E5EDF9]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">MY CREW</span>
          </div>
          <Link to="/login">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <span>Login</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </nav>

      {/* middle */}
      <div className="bg-[url('https://media.istockphoto.com/id/1584684342/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B9%84%E0%B8%A5%E0%B8%99%E0%B9%8C%E0%B9%81%E0%B8%99%E0%B8%A7%E0%B8%84%E0%B8%B4%E0%B8%94.jpg?s=2048x2048&w=is&k=20&c=j_E6UA4-Vt1QzDrWnG6ONEtdAZBLQsuFiHFDpKQTcTQ=')] 
      bg-cover
      bg-center
      filter: blur(50px)
      "
      >
      
        <div className="max-w-7xl mx-auto px-4 py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              A Modern Human Resource Management System
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Enhance the efficiency of HR operations with a comprehensive
              system
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg">
              Something Dunno
            </button>
          </div>
        </div>

      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            title="Employee Data Management"
            description="Manage all employee data in one place, including work history and important documents."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8 text-blue-600" />}
            title="Online Leave System"
            description="Easily manage leave and working hours through an online system."
          />
          <FeatureCard
            icon={<BarChart2 className="h-8 w-8 text-blue-600" />}
            title="Reports and Analytics"
            description="Analyze personnel data with comprehensive and accurate reports."
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-gray-600">
                International Standard Security System
              </span>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 MY CREW. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
