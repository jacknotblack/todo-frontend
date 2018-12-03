import React, { Component, Fragment } from "react";
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
    if (this.props.editing !== undefined) {
      this.setState({ editing: this.props.editing });
    }
    this.setState({ todo: this.props.todo });
  }

  toggleStar = () => {
    console.log(11);
    const { todo } = this.props;
    this.props.editTodo({ ...todo, star: !todo.star });
  };

  toggleTodoStatus = status => {
    const { todo } = this.props;
    this.props.editTodo({ ...todo, [status]: !todo[status] });
  };
  editTodo = () => {
    this.props.editTodo(this.state.todo);
    this.setState({ editing: false });
  };

  addTodo = () => {
    this.props.addTodo(this.state.todo);
    this.setState({ editing: false });
  };

  cancel = () => {
    if (this.props.cancel) this.props.cancel();
    else this.setState({ editing: false });
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
              onChange={() => {
                this.toggleTodoStatus("completed");
              }}
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
            <div
              onClick={() => {
                this.toggleTodoStatus("star");
              }}
            >
              {this.props.todo.star ? (
                <i className="fas fa-star" />
              ) : (
                <i className="far fa-star" />
              )}
            </div>
            <div
              onClick={() => {
                this.setState({ editing: !this.state.editing });
              }}
            >
              <i className={`fas fa-pen ${editing ? "blue" : ""}`} />
            </div>
          </div>
        </div>
        {editing ? (
          <Fragment>
            <div className="edit-panel">
              <div className="content-row">
                <span>
                  <i className="far fa-calendar-alt" />
                  Deadline
                </span>
              </div>
              <div className="content-row">
                <span>
                  <i className="far fa-file" />
                  File
                </span>
              </div>
              <div className="content-row">
                <span>
                  <i className="far fa-comment-dots" />
                  Comment
                </span>{" "}
                <br /> <br />
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
            </div>
            <div className="control-btns">
              <div className="cancel" onClick={this.cancel}>
                X Cancel
              </div>
              <div
                className="save"
                onClick={
                  this.props.todo.id === undefined
                    ? this.addTodo
                    : this.editTodo
                }
              >
                + Save
              </div>
            </div>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

export default Todo;
