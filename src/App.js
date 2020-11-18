import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import { db } from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [todoOnEdit, setTodoOnEdit] = useState({});
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    db.collection("todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) => {
        setTodos(
          snapShot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const editHandler = (e) => {
    e.preventDefault();
    db.collection("todo").doc(todoOnEdit.id).update({
      todo: input,
    });
    setInput("");
    setOnEdit(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    db.collection("todo").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="app">
      <h1>Add a Todo!</h1>
      <form onSubmit={onEdit ? editHandler : submitHandler}>
        <FormControl className="app-formControl">
          <InputLabel>Add a Todo</InputLabel>
          <Input
            className="app-input"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="eg: answer emails"
          />
        </FormControl>
        <Button
          className="app-button"
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
        >
          {onEdit ? "Edit" : "Add"}
        </Button>
      </form>
      <ul>
        {todos.length
          ? todos.map((todo) => (
              <Todo
                setInput={setInput}
                setTodoOnEdit={setTodoOnEdit}
                setOnEdit={setOnEdit}
                todo={todo}
              />
            ))
          : ""}
      </ul>
    </div>
  );
}

export default App;
