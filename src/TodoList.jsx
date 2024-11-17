// TodoList.jsx
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const TodoList = ({ tasks, removeTask }) => {
  return (
    <ListGroup>
      {tasks.map((task, index) => (
        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
          {task}
          <Button variant="danger" onClick={() => removeTask(index)}>
            Usuń
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
