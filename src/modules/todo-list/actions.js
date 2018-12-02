import { from, of, merge } from "rxjs";
import { ofType } from "redux-observable";
import { mergeMap, catchError, tap, throttleTime } from "rxjs/operators";
// import { createPlayList } from "../../tools";

import axios from "axios";

const generateTodo = ({
  name = "",
  completed = false,
  star = false,
  editing = false,
  id = -1,
  comment = ""
}) => {
  return {
    name,
    completed,
    star,
    editing,
    id,
    comment
  };
};

export const todoActions = {
  getTodos: () => ({
    type: "GET_TODOS"
  }),
  createTodo: todo => ({
    type: "CREATE_TODO",
    payload: generateTodo({ editing: true })
  }),
  addTodo: todo => ({
    type: "ADD_TODO",
    payload: todo
  }),
  editTodo: todo => ({
    type: "EDIT_TODO",
    payload: todo
  }),
  switchFilter: filter => ({
    type: "SWITCH_FILTER",
    payload: filter
  })
};

const getTodosEpic = action$ =>
  action$.pipe(
    ofType("GET_TODOS"),
    // throttleTime(1000),
    mergeMap(action =>
      from(
        axios({
          method: "get",
          url: "http://localhost:8080/api/todos",
          data: {},
          headers: { "content-type": "application/x-www-form-urlencoded" }
        })
      ).pipe(
        mergeMap(success =>
          of({ type: "GET_TODOS_SUCCESS", payload: success.data })
        ),
        catchError(error =>
          merge(
            of({ type: "GET_TODOS_FAIL", payload: error.message }).pipe(
              tap(() => {
                alert(error.message);
              })
            )
          )
        )
      )
    )
  );

const addTodoEpic = action$ =>
  action$.pipe(
    ofType("ADD_TODO"),
    mergeMap(action =>
      from(
        axios({
          method: "post",
          url: "http://localhost:8080/api/todos",
          data: { ...action.payload, editing: false },
          headers: { "content-type": "application/json" }
        })
      ).pipe(
        mergeMap(success =>
          of({
            type: "ADD_TODO_SUCCESS",
            payload: success.data
          })
        ),
        catchError(error =>
          merge(
            of({ type: "ADD_TODO_FAIL", payload: error.message }).pipe(
              tap(() => {
                alert(error.message);
              })
            )
          )
        )
      )
    )
  );

const editTodoEpic = action$ =>
  action$.pipe(
    ofType("EDIT_TODO"),
    mergeMap(action =>
      from(
        axios({
          method: "PUT",
          url: `http://localhost:8080/api/todos/${action.payload.id}`,
          data: { ...action.payload, editing: false },
          headers: { "content-type": "application/json" }
        })
      ).pipe(
        mergeMap(success =>
          merge(
            of({
              type: "EDIT_TODO_SUCCESS",
              payload: success.data
            }),
            of({
              type: "GET_TODOS"
            })
          )
        ),
        catchError(error =>
          merge(
            of({ type: "EDIT_TODO_FAIL", payload: error.message }).pipe(
              tap(() => {
                alert(error.message);
              })
            )
          )
        )
      )
    )
  );

export const todoEpics = { getTodosEpic, addTodoEpic, editTodoEpic };
