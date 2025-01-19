import React, { useState } from "react";

const AddCarForm = ({ onAddCar }) => {
  const [form, setForm] = useState({
    marka: "",
    model: "",
    rok: "",
    cena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nowySamochod = { 
      // Zmień generowanie ID na string
      id: `car_${Date.now()}`, 
      marka: form.marka,
      model: form.model,
      rok: parseInt(form.rok),
      cena: parseInt(form.cena)
    }; 
    onAddCar(nowySamochod);
    setForm({ marka: "", model: "", rok: "", cena: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="marka"
        placeholder="Marka"
        value={form.marka}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rok"
        placeholder="Rok"
        value={form.rok}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="cena"
        placeholder="Cena"
        value={form.cena}
        onChange={handleChange}
        required
      />
      <button type="submit">Dodaj Samochód</button>
    </form>
  );
};

export default AddCarForm;