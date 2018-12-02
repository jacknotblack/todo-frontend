import React, { Component } from "react";
import { connect } from "react-redux";
import { todoActions as actions } from "./modules/todo-list/actions";
import ConnectedAllTodos from "./modules/todo-list/containers/all-todos";
import ConnectedFilter from "./modules/todo-list/containers/filter";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    return (
      <div className="App">
        <ConnectedFilter />
        <ConnectedAllTodos />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTodos: () => {
    dispatch(actions.getTodos());
  }
});

const ConnectedApp = connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(App);

export default ConnectedApp;

// export default App;
