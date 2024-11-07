import React, { useState , useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import itemStore from '../../../store/item-store';

const Schema = Joi.object({
    title: Joi.string().required().messages({ 'string.empty': 'กรุณากรอกหัวข้อ' }),
    price: Joi.number().required().messages({ 'number.base': 'กรุณากรอกราคา', 'any.required': 'กรุณากรอกราคา' }),
});

const RequestItem = () => {
  const [isCreating, setIsCreating] = useState(false);

  const checkAllItem = itemStore((state) => state.checkAllItem);
  const items = itemStore((state) => state.items);
  
  useEffect(() => {
      checkAllItem();
      console.log("items",items);
  }, []);


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: joiResolver(Schema),
    mode: 'onSubmit',
  });

  const onSubmit = (data) => {
    setItems([...items, { id: items.length + 1, ...data }]);
    setIsCreating(false);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Request Form</h1>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
        >
          Create Item
        </button>
      </div>

      {/* Form Section */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium mb-4">Create New Item</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm mb-2">หัวข้อ</label>
              <input
                {...register("title")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรอกหัวข้อที่ต้องการ..."
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">ราคา</label>
              <input
                type="number"
                {...register("price")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรอกราคาที่ต้องการ..."
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Item List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium mb-4">Item List</h2>
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">หัวข้อ</th>
              <th className="p-2 border">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.itemName}</td>
                <td className="p-2 border">{item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestItem;
