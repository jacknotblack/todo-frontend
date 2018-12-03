import React, { Component } from "react";
import Todo from "./todo";
import "./todos.scss";
import { generateTodo } from "../../../tools";

class Todos extends Component {
  constructor() {
    super();
    this.state = {
      addingNewTodo: false
    };
  }

  toggleAddingNewTodo = () => {
    this.setState({ addingNewTodo: !this.state.addingNewTodo });
  };
  render() {
    const { todos, editTodo, createTodo, addTodo, filter } = this.props;
    const { addingNewTodo } = this.state;
    return (
      <div className="todos">
        <div className="add-btn" onClick={() => this.toggleAddingNewTodo()}>
          + Add Task
        </div>
        {addingNewTodo ? (
          <Todo
            todo={generateTodo({})}
            addTodo={todo => {
              console.log(todo);
              addTodo(todo);
              this.setState({ addingNewTodo: false });
            }}
            editing={true}
            cancel={this.toggleAddingNewTodo}
          />
        ) : null}
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            // name={todo.name}
            // star={todo.star}
            // comment={todo.comment}
            // completed={todo.completed}
            editTodo={editTodo}
            addTodo={addTodo}
          />
        ))}
        {filter === "completed"
          ? `${todos.filter(todo => todo.completed).length} tasks completed`
          : `${todos.filter(todo => !todo.completed).length} tasks left`}
      </div>
    );
  }
}

// const Todos = ({ todos, editTodo, createTodo, addTodo }) => (
//   <div className="todos">
//     <div className="add-btn" onClick={() => createTodo()}>
//       + Add Task
//     </div>

//     {todos.map(todo => (
//       <Todo
//         key={todo.id}
//         todo={todo}
//         // name={todo.name}
//         // star={todo.star}
//         // comment={todo.comment}
//         // completed={todo.completed}
//         editTodo={editTodo}
//         addTodo={addTodo}
//       />
//     ))}
//   </div>
// );

export default Todos;
