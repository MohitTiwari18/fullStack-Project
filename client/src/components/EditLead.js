import React, { useState, useEffect } from "react";
import "./EditLead.css";

const EditLead = ({ lead, onSave, onCancel }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(lead);
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass updated lead data back to Home component
  };

  return (
    <div className="edit-lead-modal">
      <h2>Edit Lead</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Lead Priority:
          <input
            type="text"
            name="leadPriority"
            value={formData.leadPriority || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Lead Type:
          <input
            type="text"
            name="leadType"
            value={formData.leadType || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Lead Owner:
          <input
            type="text"
            name="leadOwner"
            value={formData.leadOwner || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditLead;
