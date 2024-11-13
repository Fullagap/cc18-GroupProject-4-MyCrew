import React from "react";
import { ArrowRight, Users, BarChart2, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-[#F3F8FF] rounded-xl shadow-sm hover:shadow-md transition-shadow">
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
      <div className="bg-[url('https://i0.wp.com/www.collegehippo.com/blog/wp-content/uploads/2020/09/human-resource-management-transparent-png-download-for-free-human-resource-management-png-920_582.jpg?fit=920%2C582&ssl=1')] 
      bg-contain
      bg-center">
      
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              A Modern Human Resource Management System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
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
      <div className="max-w-7xl mx-auto px-4 py-16">
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
