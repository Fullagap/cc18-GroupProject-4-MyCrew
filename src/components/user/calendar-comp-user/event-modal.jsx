import React, { useEffect, useState } from "react";

export default function EventModal({ event, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(event.title || "");

    const buttonStyle = "border rounded bg-green-400 w-[30%] px-2"

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
    <div className="modal flex flex-col gap-2">
        <h2>{event.id ? "Edit Event" : "Add Event"}</h2>

      <div className="flex gap-10">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <div className="flex gap-5">
        <button className={buttonStyle} onClick={handleSave}>Save</button>
        <button className={buttonStyle} onClick={handleDelete}>Delete</button>
        <button className={buttonStyle} onClick={onClose}>Close</button>
      </div>
      </div>

    </div>
  );
}
