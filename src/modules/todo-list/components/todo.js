import React, { Component, Fragment } from "react";
import "./todo.scss";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      name: "",
      id: -1,
      completed: false,
      star: false,
      deadline: "",
      date: "",
      time: ""
    };
  }

  componentDidMount() {
    console.log(this.props.todo);
    if (this.props.editing !== undefined) {
      this.setState({ editing: this.props.editing });
    }
    this.setState({ ...this.props.todo });
  }

  componentDidUpdate(props) {
    // if (props.todo.id !== this.state.id)
    // this.setState({ todo: this.props.todo });
  }

  getTodo = () => {
    const { name, id, completed, star, deadline, date, time } = this.state;
    return { name, id, completed, star, deadline, date, time };
  };

  toggleStar = () => {
    const todo = this.getTodo();
    if (this.props.todo.id !== undefined) {
      this.props.editTodo({ ...todo, star: !todo.star });
    }
  };

  toggleTodoStatus = status => {
    const { todo } = this.props;
    this.setState({
      [status]: !this.state[status]
    });
    if (this.props.todo.id !== undefined) {
      this.props.editTodo({ ...todo, [status]: !todo[status] });
    }
  };

  inputDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  inputTime = e => {
    this.setState({
      time: e.target.value
    });
  };

  editTodo = () => {
    this.props.editTodo(this.getTodo());
    this.setState({ editing: false });
  };

  addTodo = () => {
    this.props.addTodo(this.getTodo());
    this.setState({ editing: false });
  };

  cancel = () => {
    if (this.props.cancel) this.props.cancel();
    else this.setState({ editing: false });
  };

  render() {
    // const { name } = this.props.todo;
    const { name, completed, editing, date, time, comment, star } = this.state;
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
                  value={name}
                  onChange={e => {
                    this.setState({
                      name: e.target.value
                    });
                    console.log(this.state);
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
              {star ? (
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
                <br />
                <br />
                <div className="date-inputs">
                  <input
                    value={date}
                    type="text"
                    placeholder="yyyy/mm/dd"
                    onChange={e => {
                      this.setState({
                        date: e.target.value
                      });
                    }}
                    // onBlur={this.inputDate}
                  />
                  <input
                    value={time}
                    type="text"
                    placeholder="hh:mm"
                    onChange={e => {
                      this.setState({
                        time: e.target.value
                      });
                    }}
                    // onBlur={this.inputTime}
                  />
                </div>
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
                  value={comment}
                  placeholder="Type your memo here…"
                  onChange={e => {
                    this.setState({
                      comment: e.target.value
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
