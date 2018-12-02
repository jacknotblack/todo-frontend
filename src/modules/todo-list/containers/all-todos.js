import { connect } from "react-redux";
import Todos from "../components/todos";
import { todoActions as actions } from "../actions";

const filterTodos = state => {
  switch (state.todos.filter) {
    case "completed":
      return state.todos.todos.filter(todo => todo.completed);
    case "wip":
    default:
      return state.todos.todos;
  }
};

const mapStateToProps = state => {
  return { todos: filterTodos(state) };
};

const mapDispatchToProps = dispatch => ({
  createTodo: () => {
    dispatch(actions.createTodo());
  },
  addTodo: todo => {
    dispatch(actions.addTodo(todo));
  },
  editTodo: todo => {
    dispatch(actions.editTodo(todo));
  }
});

const ConnectedAllTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export default ConnectedAllTodos;
