import React, { useState } from "react";

const DataList = ({ 
  samochody, 
  onRemoveCar, 
  onEditCar, 
  editingCar, 
  setEditingCar 
}) => {
  const [editForm, setEditForm] = useState({
    marka: "",
    model: "",
    rok: "",
    cena: ""
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const startEditing = (car) => {
    setEditingCar(car);
    setEditForm({
      id: car.id,
      marka: car.marka,
      model: car.model,
      rok: car.rok,
      cena: car.cena
    });
  };

  const saveEdit = () => {
    const editedCar = {
      id: editingCar.id, // Użyj istniejącego ID
      marka: editForm.marka,
      model: editForm.model,
      rok: parseInt(editForm.rok),
      cena: parseInt(editForm.cena)
    };
    onEditCar(editedCar);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Marka</th>
          <th>Model</th>
          <th>Rok</th>
          <th>Cena</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {samochody.map((samochod) => (
          <tr key={samochod.id}>
            {editingCar && editingCar.id === samochod.id ? (
              // Tryb edycji
              <>
                <td>{samochod.id}</td>
                <td>
                  <input
                    type="text"
                    name="marka"
                    value={editForm.marka}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="model"
                    value={editForm.model}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="rok"
                    value={editForm.rok}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="cena"
                    value={editForm.cena}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button onClick={saveEdit}>Zapisz</button>
                  <button onClick={() => setEditingCar(null)}>Anuluj</button>
                </td>
              </>
            ) : (
              // Tryb wyświetlania
              <>
                <td>{samochod.id}</td>
                <td>{samochod.marka}</td>
                <td>{samochod.model}</td>
                <td>{samochod.rok}</td>
                <td>{samochod.cena}</td>
                <td>
                  <button onClick={() => startEditing(samochod)}>Edytuj</button>
                  <button onClick={() => onRemoveCar(samochod.id)}>Usuń</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataList;