import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import itemStore from '../../../store/item-store';
import {createRequestItem} from '../../../api/checkRequest'

const Schema = Joi.object({
  title: Joi.string().required(),
});

const RequestItem = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const checkAllItem = itemStore((state) => state.checkAllItem);
  const items = itemStore((state) => state.items);


  useEffect(() => {
    checkAllItem();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(Schema),
    mode: 'on',
  });

  const handleOnSubmit = (data) => {
    if (!user) {
      console.error("User not defined");
      return;
    }
    console.log("Selected Item ID:", selectedItem);
    console.log("Additional Information:", data.title);
    createRequestItem(1, selectedItem, data.title);
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-medium mb-6">Request Form</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {/* Dropdown to Select Item */}
        <div className="mb-8">
          <label className="block text-sm mb-2">เลือก Item</label>
          <select
            value={selectedItem || ""}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">เลือก Item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.itemName} - {item.cost} บาท
              </option>
            ))}
          </select>
        </div>

        {/* Input for Additional Information */}
        <div className="mb-4">
          <label className="block text-sm mb-2">ข้อมูลเพิ่มเติม</label>
          <input
            type="text"
            {...register("title")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกข้อมูลเพิ่มเติม..."
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RequestItem;
