import { useEffect, useState } from 'react'
import * as wn from 'webnative'

let fs = null; // File system
let ns = null; // App namespace

const useAsyncReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState),
    dispatch = async action => {
      setState(await reducer(state ?? initialState, action))
    };

  return [state, dispatch];
}

const reducer = async (state, action) => {
  if (!fs || !ns) { return; }

  const todosPath = wn.path.appData(ns, wn.path.file('todos.json'));

  switch (action.type) {
    case 'all':
      if (await fs.exists(todosPath)) {
        const todos = new TextDecoder().decode(await fs.read(todosPath))
        state = JSON.parse(todos)
      }
      break;

    case 'add':
      state.push(action.value);
      await fs.write(todosPath, new TextEncoder().encode(JSON.stringify(state)));
      await fs.publish();
      break;

    case 'update':
      state = state.map(todo => todo.id === action.value.id ? action.value : todo);
      await fs.write(todosPath, new TextEncoder().encode(JSON.stringify(state)));
      await fs.publish();
      break;

    case 'delete':
      state = state.filter(todo => todo.id !== action.value);
      await fs.write(todosPath, new TextEncoder().encode(JSON.stringify(state)));
      await fs.publish();
      break;

    case 'toggleCompletion':
      state = state.map(todo =>
        todo.id === action.value ? { ...todo, completed: !todo.completed } : todo
      )
      await fs.write(todosPath, new TextEncoder().encode(JSON.stringify(state)));
      await fs.publish();
      break;

    case 'toggleAll':
      state = state.map(todo => ({ ...todo, completed: !action.value }))
      await fs.write(todosPath, new TextEncoder().encode(JSON.stringify(state)));
      await fs.publish();
      break;

    case 'clearCompleted':
      state = state.filter(todo => !todo.completed);
      await fs.write(todosPath, new TextEncoder().encode(JSON.stringify(state)));
      await fs.publish();
      break;

    default:
      break;
  }
  return state;
}


export function useFilesystem(filesystem, namespace) {
  fs = filesystem;
  ns = namespace;

  const [todos, dispatch] = useAsyncReducer(reducer, []);

  useEffect(() => {
    async function init() {
      await dispatch({ type: "all" });
    }
    init();
  }, [fs]); // eslint-disable-line react-hooks/exhaustive-deps

  return [todos, dispatch];
}