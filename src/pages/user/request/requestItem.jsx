import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';

const Schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

const RequestItem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(Schema),mode: 'on',
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-medium mb-6">Request Form</h1>
      
      {/* Form Section */}
      <div className="mb-8">
        <label className="block text-sm mb-2">ประเภทที่ร้องขอ</label>
        <div className="flex gap-4">
          <select 
            value="Text"
            readOnly
            className="flex-1 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Text">Text</option>
          </select>
          
          <button 
            className="px-8 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Preview Section with Title and Description */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium mb-4">Preview</h2>
        
        <div className="mb-4">
          <label className="block text-sm mb-2">หัวข้อ</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกหัวข้อที่ต้องการ..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">รายละเอียด</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="กรอกรายละเอียดที่ต้องการ..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
