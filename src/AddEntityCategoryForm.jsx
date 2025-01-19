import React, { useState } from "react";

const AddEntityCategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [fields, setFields] = useState([
    { name: "", type: "text", required: false }
  ]);

  const handleCategoryNameChange = (e) => {
    // Usuń spacje, zamień na małe litery i zamień niebezpieczne znaki
    const sanitizedName = e.target.value
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
    setCategoryName(sanitizedName);
  };

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...fields];
    
    // Normalizacja nazwy pola
    if (name === 'name') {
      newFields[index][name] = value
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
    } else {
      newFields[index][name] = value;
    }
    
    setFields(newFields);
  };

  const addFieldInput = () => {
    setFields([...fields, { name: "", type: "text", required: false }]);
  };

  const removeFieldInput = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!categoryName) {
      alert("Nazwa kategorii jest wymagana");
      return;
    }

    // Filtrowanie pustych pól
    const validFields = fields.filter(field => field.name.trim() !== "");

    if (validFields.length === 0) {
      alert("Dodaj przynajmniej jedno pole");
      return;
    }

    const newCategory = {
      name: categoryName,
      fields: validFields.map(field => ({
        name: field.name,
        label: field.name.replace(/_/g, ' '), // Zamień _ na spacje dla etykiety
        type: field.type,
        required: field.required
      }))
    };

    onAddCategory(newCategory);
    
    // Reset formularza
    setCategoryName("");
    setFields([{ name: "", type: "text", required: false }]);
  };

  return (
    <div className="entity-category-form">
      <h3>Dodaj nową kategorię encji</h3>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nazwa kategorii (np. produkty, zamówienia)"
          value={categoryName}
          onChange={handleCategoryNameChange}
          required
        />

        <h4>Pola kategorii:</h4>
        {fields.map((field, index) => (
          <div key={`field_${index}`} className="field-input">
            <input
              type="text"
              name="name"
              placeholder="Nazwa pola"
              value={field.name}
              onChange={(e) => handleFieldChange(index, e)}
              required
            />
            
            <select
              name="type"
              value={field.type}
              onChange={(e) => handleFieldChange(index, e)}
            >
              <option value="text">Tekst</option>
              <option value="number">Liczba</option>
              <option value="email">Email</option>
              <option value="date">Data</option>
            </select>
            
            <label>
              <input
                type="checkbox"
                name="required"
                checked={field.required}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index].required = e.target.checked;
                  setFields(newFields);
                }}
              />
              Wymagane
            </label>

            {fields.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeFieldInput(index)}
                className="remove-field-btn"
              >
                Usuń pole
              </button>
            )}
          </div>
        ))}

        <div className="form-actions">
          <button type="button" onClick={addFieldInput}>
            Dodaj pole
          </button>
          
          <button type="submit">Utwórz kategorię</button>
        </div>
      </form>
    </div>
  );
};

export default AddEntityCategoryForm;