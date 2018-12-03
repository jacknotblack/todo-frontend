import { connect } from "react-redux";
import Todos from "../components/todos";
import { todoActions as actions } from "../actions";

const filterUndue = now => todo => {
  if (todo.completed) return false;
  const deadline = new Date(todo.date.split("/").join("-") + " " + todo.time);
  return deadline > now || todo.date === "";
};

const filterTodos = state => {
  const now = new Date();
  switch (state.todos.filter) {
    case "completed":
      return state.todos.todos.filter(todo => todo.completed);
    case "wip":
      return state.todos.todos.filter(filterUndue(now));
    default:
      return state.todos.todos.sort((a, b) => {
        if (a.star === true && b.star === false) return -1;
        else if (a.star === false && b.star === true) return 1;
        return 0;
      });
  }
};

const mapStateToProps = state => {
  return { todos: filterTodos(state), filter: state.todos.filter };
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
