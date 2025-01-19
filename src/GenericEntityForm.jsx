import React, { useState } from "react";

const GenericEntityForm = ({ entityName, fields, onAddEntity }) => {
  const [form, setForm] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Walidacja wymaganych pól
    const missingRequiredFields = fields
      .filter(field => field.required && !form[field.name])
      .map(field => field.label);

    if (missingRequiredFields.length > 0) {
      alert(`Proszę wypełnić wymagane pola: ${missingRequiredFields.join(', ')}`);
      return;
    }

    const newEntity = { ...form };
    
    // Konwersja numerycznych pól
    fields.forEach(field => {
      if (field.type === 'number' && newEntity[field.name]) {
        newEntity[field.name] = parseFloat(newEntity[field.name]);
      }
    });

    onAddEntity(entityName, newEntity);
    
    // Reset formularza
    setForm(
      fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {})
    );
  };

  return (
    <div className="generic-entity-form">
      <h3>Dodaj: {entityName}</h3>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-field">
            <label>
              {field.label} 
              {field.required && <span style={{color: 'red'}}>*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.label}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default GenericEntityForm;