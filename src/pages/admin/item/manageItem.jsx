import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import itemStore from "../../../store/item-store";
import { addItem, addCategory, editIsHide } from "../../../api/checkRequest";

const Schema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "string.empty": "Please enter the title" }),
  price: Joi.number()
    .required()
    .messages({
      "number.base": "Please enter the price",
      "any.required": "Please enter the price",
    }),
  category: Joi.string()
    .required()
    .messages({ "string.empty": "Please select a category" }),
});

const RequestItem = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false); // State for category creation
  const [hiddenItems, setHiddenItems] = useState({}); // Toggle hide/show status
  const [newCategory, setNewCategory] = useState(""); // State for new category input

  const checkAllItem = itemStore((state) => state.checkAllItem);
  const items = itemStore((state) => state.items);
  const checkAllCategory = itemStore((state) => state.checkAllCategory);
  const categories = itemStore((state) => state.categories);

  useEffect(() => {
    checkAllItem();
    checkAllCategory();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const validateForm = (data) => {
    const { error } = Schema.validate(data, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      return newErrors;
    }
    return {};
  };

  const onSubmitItem = async (data) => {
    const formErrors = validateForm(data);
    if (Object.keys(formErrors).length > 0) return;

    await addItem(data.title, data.price, data.category);
    reset();
    await checkAllItem();
    await checkAllCategory();
  };

  const onCreateCategory = async () => {
    if (newCategory.trim()) {
      await addCategory(newCategory);
      setNewCategory("");
      setIsCreatingCategory(false);
      await checkAllCategory();
    }
  };

  const toggleHideShow = async (id, isHide) => {
    const newIsHide = !isHide;
    await setHiddenItems((prev) => ({ ...prev, [id]: newIsHide }));
    await editIsHide(id, newIsHide);
    await checkAllItem();
  };

  const toggleCreateForm = (type) => {
    if (type === "item") {
      setIsCreating((prev) => !prev);
      setIsCreatingCategory(false); // Close category form if it's open
    } else if (type === "category") {
      setIsCreatingCategory((prev) => !prev);
      setIsCreating(false); // Close item form if it's open
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Request Form</h1>
        <div className="flex gap-4">
          <button
            onClick={() => toggleCreateForm("item")}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            {isCreating ? "Create Item" : "Create Item"}
          </button>
          <button
            onClick={() => toggleCreateForm("category")}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            {isCreatingCategory ? "Create Category" : "Create Category"}
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium mb-4">Create New Item</h2>
          <form onSubmit={handleSubmit(onSubmitItem)}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Title</label>
              <input
                {...register("title")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the desired title..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Category</label>
              <select
                {...register("category")}
                className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Price</label>
              <input
                type="number"
                {...register("price")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the desired price..."
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => toggleCreateForm("item")}
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

      {isCreatingCategory && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium mb-4">Create New Category</h2>
          <div className="mb-4">
            <label className="block text-sm mb-2">Category Name</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new category name..."
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => toggleCreateForm("category")}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onCreateCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
            >
              Save Category
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium mb-4">Item List</h2>
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className={`text-center ${
                  hiddenItems[item.id] || item.isHide ? "bg-gray-200 text-gray-500" : ""
                }`}
              >
                <td className="p-2 border">{item.itemName}</td>
                <td className="p-2 border">{item.cost}</td>
                <td className="p-2 border">{item.category.categoryName}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => toggleHideShow(item.id, item.isHide)}
                    className={`px-4 py-1 rounded ${
                      hiddenItems[item.id] || item.isHide ? "bg-gray-500" : "bg-[#082777]"
                    } text-white`}
                  >
                    {hiddenItems[item.id] || item.isHide ? "Hidden" : "Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestItem;
