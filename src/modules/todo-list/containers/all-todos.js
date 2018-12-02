import { connect } from "react-redux";
import Todos from "../components/todos";
import { todoActions as actions } from "../actions";

const mapStateToProps = state => {
  return { todos: state.todos.todos };
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
