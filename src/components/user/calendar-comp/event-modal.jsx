    import React, { useEffect, useState } from "react";

    export default function EventModal({event, onClose, onSave}) {
    const [title, setTitle] = useState(event.title || "");

    console.log('event butt', event)
        
    useEffect(() => {
        // เมื่อ event เปลี่ยน ให้ตั้งค่า title ใหม่
        setTitle(event.title || "");
      }, [event]);

    const handleSave = () => {
        onSave({ ...event, title });
    };

    return (
        <div className="modal">
        <h2>{event.id ? "Edit Event" : "Add Event"}</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
        </div>
    );
    }
