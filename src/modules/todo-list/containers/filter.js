import { connect } from "react-redux";
import Filter from "../components/filter";
import { todoActions as actions } from "../actions";

const mapStateToProps = state => {
  return { selectedFilter: state.todos.filter };
};

const mapDispatchToProps = dispatch => ({
  switchFilter: filter => {
    dispatch(actions.switchFilter(filter));
  },
  addTodo: todo => {
    dispatch(actions.addTodo(todo));
  },
  editTodo: todo => {
    dispatch(actions.editTodo(todo));
  }
});

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);

export default ConnectedFilter;
