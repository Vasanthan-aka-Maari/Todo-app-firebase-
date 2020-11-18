import { List, ListItem, Button } from "@material-ui/core";
import React from "react";
import "./Todo.css";
import { db } from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

function Todo({ todo, setTodoOnEdit, setOnEdit, setInput }) {
  const deleteHandler = () => {
    db.collection("todo").doc(todo.id).delete();
  };
  const editHandler = () => {
    setOnEdit(true);
    setTodoOnEdit(todo);
    setInput(todo.todo);
  };

  return (
    <List className="todo-list">
      <ListItem className="todo-item">
        <h2 className="todo-text">{todo.todo}</h2>
      </ListItem>
      <div className="button-container">
        <Button onClick={deleteHandler}>
          <DeleteIcon color="secondary" />
        </Button>
        <Button onClick={editHandler}>
          <CreateIcon style={{ color: "white" }} />
        </Button>
      </div>
    </List>
  );
}

export default Todo;
