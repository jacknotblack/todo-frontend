import React from "react";
import Todo from "./todo";

const Todos = ({ todos, editTodo, createTodo, addTodo }) => (
  <div className="todos">
    <div onClick={() => createTodo()}>+ Add Task</div>
    {console.log(todos)}
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        name={todo.name}
        star={todo.star}
        comment={todo.comment}
        completed={todo.completed}
        editTodo={editTodo}
        addTodo={addTodo}
      />
    ))}
  </div>
);

export default Todos;