import React, { Component } from "react";
import "./todo.scss";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      todo: {}
    };
  }

  componentDidMount() {
    console.log(this.props.todo);
    if (this.props.todo.editing !== undefined) {
      this.setState({ editing: this.props.todo.editing });
    }
    this.setState({ todo: this.props.todo });
  }

  shouldComponentUpdate(next) {
    console.log(this.props, next);
    return true;
  }
  componentWillReceiveProps() {
    console.log(this.props);
  }

  componentDidUpdate() {
    // this.setState({
    //   todo: { ...this.state.todo, comment: this.props.todo.comment }
    // });
  }
  completeTodo = () => {
    const { todo } = this.props;
    console.log(this.state.todo);
    this.setState({ todo: { ...this.state.todo, completed: false } });
    this.props.editTodo({ ...todo, completed: !todo.completed });
  };
  editTodo = () => {
    // const { todo } = this.props;
    console.log(this.state.todo);
    this.props.editTodo(this.state.todo);
    this.setState({ editing: false });
  };

  addTodo = () => {
    // const { todo } = this.props;
    this.props.addTodo(this.state.todo);
    this.setState({ editing: false });
  };

  render() {
    const { completed } = this.props;
    // const { star, completed } = todo;
    // console.log(this.state);
    const { editing, todo } = this.state;
    console.log(this.props.todo.completed);
    return (
      <div className={`todo ${completed ? "completed" : ""}`}>
        <div className="brief">
          <div className="left">
            <input
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={this.completeTodo}
            />
            <div className="name">
              {editing ? (
                <input
                  type="text"
                  value={this.state.todo.name}
                  onChange={e => {
                    this.setState({
                      todo: {
                        ...this.state.todo,
                        name: e.target.value
                      }
                    });
                  }}
                />
              ) : (
                <span>{todo.name}</span>
              )}
            </div>
          </div>
          <div className="right">
            <div>{this.props.todo.star ? "star" : "noStar"}</div>
            <div
              onClick={() => {
                this.setState({ editing: !this.state.editing });
              }}
            >
              {editing ? "editing" : "edit"}
            </div>
          </div>
        </div>
        {editing ? (
          <div className="edit-panel">
            <div className="deadline">
              <span>Deadline</span>
            </div>
            <div>File</div>
            <div>
              <span>Comment</span>
              <textarea
                value={this.state.todo.comment}
                onChange={e => {
                  this.setState({
                    todo: { ...this.state.todo, comment: e.target.value }
                  });
                }}
              />
            </div>
            <div className="control-btns">
              <div className="X cancel">Cancel</div>
              {console.log(this.props.todo.id)}
              <div
                className="save"
                onClick={
                  this.props.todo.id === -1 ? this.addTodo : this.editTodo
                }
              >
                + Save
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

// const Todo = ({ name, completed, star, editing }) => (
//   <div className="todo">
//     <div className="left">
//       <input type="checkbox" name="completed" checked={completed} />
//       <div>{name}</div>
//     </div>
//     <div className="right">
//       <div>{star ? "star" : "no"}</div>
//       <div>{editing ? "editing" : "edit"}</div>
//     </div>
//   </div>
// );

export default Todo;
