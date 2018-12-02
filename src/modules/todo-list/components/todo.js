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
    if (this.props.todo.editing !== undefined) {
      this.setState({ editing: this.props.todo.editing });
    }
    this.setState({ todo: this.props.todo });
  }

  completeTodo = () => {
    const { todo } = this.props;
    this.props.editTodo({ ...todo, completed: !todo.completed });
  };
  editTodo = () => {
    this.props.editTodo(this.state.todo);
    this.setState({ editing: false });
  };

  addTodo = () => {
    this.props.addTodo(this.state.todo);
    this.setState({ editing: false });
  };

  render() {
    const { completed, name } = this.props.todo;
    const { editing } = this.state;
    return (
      <div className="todo">
        <div className={`brief ${completed ? "completed" : ""}`}>
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
                <span>{name}</span>
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
                placeholder="Type your memo here…"
                onChange={e => {
                  this.setState({
                    todo: { ...this.state.todo, comment: e.target.value }
                  });
                }}
              />
            </div>
            <div className="control-btns">
              <div className="X cancel">Cancel</div>
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

export default Todo;
