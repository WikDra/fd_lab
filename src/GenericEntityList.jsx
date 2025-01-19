import React, { useState, useEffect } from "react";

const GenericEntityList = ({ 
  entityName, 
  entities, 
  onRemoveEntity, 
  onEditEntity,
  fields 
}) => {
  const [editingEntity, setEditingEntity] = useState(null);

  const handleEditClick = (entity) => {
    console.log("Rozpoczęcie edycji:", entity);
    // Utwórz dokładną kopię encji do edycji
    setEditingEntity({...entity});
  };

  const handleSaveEdit = () => {
    console.log("Próba zapisu:", editingEntity);
    
    if (!editingEntity) {
      console.error("Brak encji do zapisu");
      return;
    }

    // Konwersja numerycznych pól
    const processedEntity = {...editingEntity};
    fields.forEach(field => {
      if (field.type === 'number') {
        const numValue = parseFloat(processedEntity[field.name]);
        processedEntity[field.name] = isNaN(numValue) 
          ? processedEntity[field.name] 
          : numValue;
      }
    });

    console.log("Encja do zapisu:", processedEntity);

    // Wywołaj metodę edycji
    onEditEntity(entityName, processedEntity);
    
    // Resetuj stan edycji
    setEditingEntity(null);
  };

  const handleCancelEdit = () => {
    console.log("Anulowanie edycji");
    setEditingEntity(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    console.log("Zmiana wartości:", { name, value });
    
    setEditingEntity(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <div className="generic-entity-list">
      <h3>Lista: {entityName}</h3>
      {entities.length === 0 ? (
        <p>Brak elementów</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {fields.map(field => (
                <th key={field.name}>{field.label}</th>
              ))}
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {entities.map((entity) => (
              <tr key={entity.id}>
                {editingEntity && editingEntity.id === entity.id ? (
                  // Tryb edycji
                  <>
                    <td>{entity.id}</td>
                    {fields.map(field => (
                      <td key={field.name}>
                        <input
                          type={field.type}
                          name={field.name}
                          value={editingEntity[field.name] || ''}
                          onChange={handleEditChange}
                          required={field.required}
                        />
                      </td>
                    ))}
                    <td>
                      <button 
                        onClick={handleSaveEdit}
                        type="button"
                      >
                        Zapisz
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        type="button"
                      >
                        Anuluj
                      </button>
                    </td>
                  </>
                ) : (
                  // Tryb wyświetlania
                  <>
                    <td>{entity.id}</td>
                    {fields.map(field => (
                      <td key={field.name}>{entity[field.name]}</td>
                    ))}
                    <td>
                      <button 
                        onClick={() => handleEditClick(entity)}
                        type="button"
                      >
                        Edytuj
                      </button>
                      <button 
                        onClick={() => onRemoveEntity(entityName, entity.id)}
                        type="button"
                      >
                        Usuń
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GenericEntityList;