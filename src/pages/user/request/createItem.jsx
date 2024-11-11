import React, { useState, useEffect } from 'react';
import { addItem } from '../../../api/checkRequest';
import itemStore from '../../../store/item-store';

const CreateItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  // ดึงฟังก์ชันและ categories จาก itemStore
  const checkAllCategory = itemStore((state) => state.checkAllCategory);
  const categories = itemStore((state) => state.categories);

  useEffect(() => {
    checkAllCategory();  // เรียก checkAllCategory เมื่อ component โหลดครั้งแรก
    console.log("Categories Loaded:", categories);  // ตรวจสอบข้อมูล categories ที่ดึงมา
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Item Name:', name);
    console.log('Item Price:', price);
    console.log('Selected Category:', category);
    addItem(name, price, category);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-medium mb-6">Create New Item</h2>

      <form onSubmit={handleSubmit}>
        {/* Input สำหรับชื่อสินค้า */}
        <div className="mb-4">
          <label className="block text-sm mb-2">ชื่อสินค้า</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกชื่อสินค้า"
            required
          />
        </div>

        {/* Dropdown สำหรับหมวดหมู่สินค้า */}
        <div className="mb-4">
          <label className="block text-sm mb-2">หมวดหมู่สินค้า</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">เลือกหมวดหมู่สินค้า</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Input สำหรับราคา */}
        <div className="mb-4">
          <label className="block text-sm mb-2">ราคา</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกราคา"
            required
          />
        </div>

        {/* ปุ่ม Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
