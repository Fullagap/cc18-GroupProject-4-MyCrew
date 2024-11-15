import React, { useEffect, useState } from "react";

export default function EventModal({ event, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(event.title || "");

    const buttonStyle = "bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"

  useEffect(() => {
    setTitle(event.title || "");
  }, [event]);

  const handleSave = () => {
    onSave({ ...event, title });
  };
  const handleDelete = () => {
    onDelete(event.id);
  };

  return (
    <div className="modal flex gap-2 pt-4">
        <h2>{event.id ? "Edit Event" : "Add Event"}</h2>

      <div className="flex gap-6">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <div className="flex gap-2">
        <button className={buttonStyle} onClick={handleSave}>Save</button>
        <button className={buttonStyle} onClick={handleDelete}>Delete</button>
        <button className={buttonStyle} onClick={onClose}>Close</button>
      </div>
      </div>

    </div>
  );
}
