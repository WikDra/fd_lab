import React, { useState, useEffect } from "react";
import GenericEntityForm from "./GenericEntityForm";
import GenericEntityList from "./GenericEntityList";
import AddEntityCategoryForm from "./AddEntityCategoryForm";
import "./DataDisplayApp.css";

export default function DataDisplayApp() {
  const [entities, setEntities] = useState({});
  const [entityDefinitions, setEntityDefinitions] = useState({
    samochody: [
      { name: 'marka', label: 'Marka', type: 'text', required: true },
      { name: 'model', label: 'Model', type: 'text', required: true },
      { name: 'rok', label: 'Rok', type: 'number', required: true },
      { name: 'przebieg', label: 'Przebieg', type: 'number', required: true },
      { name: 'cena', label: 'Cena', type: 'number', required: true }
    ],
    uzytkownicy: [
      { name: 'imie', label: 'Imię', type: 'text', required: true },
      { name: 'nazwisko', label: 'Nazwisko', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
    ],
  });

  // Pobieranie wszystkich encji
  const fetchEntities = () => {
    // Pobieranie encji dla każdej zdefiniowanej kategorii
    Object.keys(entityDefinitions).forEach(entityName => {
      fetch(`http://localhost:3001/${entityName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setEntities(prev => ({
            ...prev,
            [entityName]: data
          }));
        })
        .catch(error => console.error(`Błąd pobierania ${entityName}:`, error));
    });
  };

  // Inicjalne pobranie encji i cykliczne odświeżanie
  useEffect(() => {
    fetchEntities();

    // Odświeżanie co 1 sekundę
    const intervalId = setInterval(fetchEntities, 1000);

    // Cleanup interwału
    return () => clearInterval(intervalId);
  }, []);

  // Dodawanie nowej kategorii
  const handleAddCategory = (newCategory) => {
    // Dodatkowa walidacja nazwy kategorii
    const sanitizedName = newCategory.name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
  
    if (entityDefinitions[sanitizedName]) {
      alert("Kategoria o tej nazwie już istnieje!");
      return;
    }
  
    // Wczytaj aktualną bazę danych
    fetch('http://localhost:3001/db')
      .then(response => {
        if (!response.ok) {
          throw new Error('Nie można pobrać bazy danych');
        }
        return response.json();
      })
      .then(currentDb => {
        // Dodaj nową kategorię do bazy danych
        const updatedDb = {
          ...currentDb,
          [sanitizedName]: [] // Dodaj pustą tablicę dla nowej kategorii
        };
  
        // Zaktualizuj całą bazę danych
        return fetch('http://localhost:3001/db', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedDb)
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd aktualizacji bazy: ${response.statusText}`);
        }
        
        // Aktualizacja definicji encji lokalnie
        setEntityDefinitions(prev => ({
          ...prev,
          [sanitizedName]: newCategory.fields
        }));
  
        // Odśwież dane
        fetchEntities();
      })
      .catch(error => {
        console.error("Błąd dodawania kategorii:", error);
        alert(error.message);
      });
  
    // Aktualizacja definicji encji lokalnie z użyciem sanityzowanej nazwy
    setEntityDefinitions(prev => ({
      ...prev,
      [sanitizedName]: newCategory.fields
    }));
  
    // Dodanie pustej kategorii do bazy danych
    fetch(`http://localhost:3001/${sanitizedName}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify([]) // Inicjalizacja pustej tablicy
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd dodawania kategorii: ${response.statusText}`);
      }
      return response.json();
    })
    .then(() => {
      // Odśwież dane po dodaniu kategorii
      fetchEntities();
    })
    .catch(error => {
      console.error("Błąd dodawania kategorii:", error);
      alert(error.message);
    });
  

    // Aktualizacja definicji encji lokalnie
    setEntityDefinitions(prev => ({
      ...prev,
      [newCategory.name]: newCategory.fields
    }));

    // Dodanie pustej kategorii do bazy danych
    fetch(`http://localhost:3001/${newCategory.name}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify([]) // Inicjalizacja pustej tablicy
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd dodawania kategorii: ${response.statusText}`);
      }
      return response.json();
    })
    .then(() => {
      // Odśwież dane po dodaniu kategorii
      fetchEntities();
    })
    .catch(error => {
      console.error("Błąd dodawania kategorii:", error);
      alert(error.message);
    });
  };

  // Dodawanie encji
  const handleAddEntity = (entityName, newEntity) => {
    const entityWithPrefix = {
      ...newEntity,
      id: `${entityName}_${Date.now()}`
    };

    fetch(`http://localhost:3001/${entityName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entityWithPrefix),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd dodawania encji: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        fetchEntities();
      })
      .catch(error => {
        console.error("Błąd dodawania:", error);
        alert(error.message);
      });
  };

  // Edycja encji
  const handleEditEntity = (entityName, editedEntity) => {
    fetch(`http://localhost:3001/${entityName}/${editedEntity.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedEntity),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd edycji encji: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        fetchEntities();
      })
      .catch(error => {
        console.error("Błąd edycji:", error);
        alert(error.message);
      });
  };

  // Usuwanie encji
  const handleRemoveEntity = (entityName, id) => {
    // Dodaj potwierdzenie usunięcia
    if (!window.confirm('Czy na pewno chcesz usunąć ten element?')) {
      return;
    }

    fetch(`http://localhost:3001/${entityName}/${id}`, {
      method: "DELETE",
    })
    .then(response => {
      if (response.ok) {
        fetchEntities();
      } else {
        throw new Error(`Nie można usunąć encji: ${entityName}, ID: ${id}`);
      }
    })
    .catch(error => {
      console.error("Szczegółowy błąd usuwania:", error);
      alert(error.message);
    });
  };

  // Usuwanie kategorii
  const handleRemoveCategory = (categoryName) => {
    // Potwierdź usunięcie kategorii
    if (!window.confirm(`Czy na pewno chcesz usunąć kategorię ${categoryName}?`)) {
      return;
    }

    // Usuń wszystkie encje tej kategorii
    fetch(`http://localhost:3001/${categoryName}`)
      .then(response => response.json())
      .then(entities => {
        // Usuń każdą encję
        const deletePromises = entities.map(entity => 
          fetch(`http://localhost:3001/${categoryName}/${entity.id}`, {
            method: "DELETE"
          })
        );

        return Promise.all(deletePromises);
      })
      .then(() => {
        // Usuń definicję kategorii
        setEntityDefinitions(prev => {
          const newDefinitions = {...prev};
          delete newDefinitions[categoryName];
          return newDefinitions;
        });
      })
      .catch(error => {
        console.error("Błąd usuwania kategorii:", error);
        alert("Nie udało się usunąć kategorii");
      });
  };

  return (
    <div className="data-display-app">
      <h1>Dynamiczny Menedżer Encji</h1>
      
      <AddEntityCategoryForm onAddCategory={handleAddCategory} />
      
      <div className="entities-container">
        {Object.entries(entityDefinitions).map(([entityName, fields]) => (
          <div key={entityName} className="entity-section">
            <div className="entity-header">
              <h2>{entityName.charAt(0).toUpperCase() + entityName.slice(1)}</h2>
              <button 
                onClick={() => handleRemoveCategory(entityName)}
                className="remove-category-btn"
                disabled={Object.keys(entityDefinitions).length <= 2} 
              >
                Usuń kategorię
              </button>
            </div>
            <GenericEntityForm
              entityName={entityName}
              fields={fields}
              onAddEntity={handleAddEntity}
            />
            <GenericEntityList
              entityName={entityName}
              entities={entities[entityName] || []}
              onRemoveEntity={handleRemoveEntity}
              onEditEntity={handleEditEntity}
              fields={fields}
            />
          </div>
        ))}
      </div>
    </div>
  );
}