import { deepCopy } from "../../tools";

export const initState = {
  todos: []
};

const todoReducers = (state = initState, action) => {
  const { playLists } = state;
  const editTodo = (todos, todo) => {
    const index = todos.findIndex(t => t.id === todo.id);
    const alteredTodos = deepCopy(todos);
    alteredTodos.splice(index, 1, todo);
    return alteredTodos;
  };
  switch (action.type) {
    case "GET_TODOS_SUCCESS":
      return {
        ...state,
        todos: action.payload
      };
    case "CREATE_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    case "ADD_TODO_SUCCESS":
      let todos = deepCopy(state.todos);
      todos.splice(0, 1, action.payload);
      return { ...state, todos };

    case "EDIT_TODO_SUCCESS":
      todos = deepCopy(state.todos);
      todos.splice(
        todos.findIndex(t => t.id === action.payload.id),
        1,
        action.payload
      );
      return { ...state, todos };

    // case "EDIT_TODO":
    //   return {
    //     ...state,
    //     todos: editTodo(state.todos, action.payload)
    //   };
    case "ADD_SONG_TO_LIST_SUCCESS":
      const { listID, songID } = action.payload;
      const listIdx = state.playLists.findIndex(list => list.id === listID);
      const currentPlayList = playLists[listIdx];
      const updatedPlayList = {
        ...currentPlayList,
        songs: [...currentPlayList.songs, songID]
      };
      playLists.splice(listIdx, 1, updatedPlayList);
      return {
        ...state,
        playLists: [...playLists]
      };
    default:
      return state;
  }
};

export default todoReducers;