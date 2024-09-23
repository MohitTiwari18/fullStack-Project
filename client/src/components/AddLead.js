import React, { useState } from "react";
import "./AddLead.css";
const AddLead = ({ onSave, onCancel }) => {
  const [newLead, setNewLead] = useState({
    leadID: "",
    name: "",
    phone: "",
    email: "",
    leadPriority: "",
    leadType: "",
    leadOwner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newLead); // Pass the new lead back to the Home component
    setNewLead({
      leadID: "",
      name: "",
      phone: "",
      email: "",
      leadPriority: "",
      leadType: "",
      leadOwner: "",
    }); // Reset form
  };

  return (
    <div className="add-lead-modal">
      <h3>Add New Lead</h3>
      <form onSubmit={handleSubmit}>
        {/* Input fields for the new lead */}
        <input
          type="text"
          name="leadID"
          placeholder="Lead ID"
          value={newLead.leadID}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newLead.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newLead.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newLead.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="leadPriority"
          placeholder="Lead Priority"
          value={newLead.leadPriority}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="leadType"
          placeholder="Lead Type"
          value={newLead.leadType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="leadOwner"
          placeholder="Lead Owner"
          value={newLead.leadOwner}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Lead</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddLead;
