import { useEffect, useState } from 'react'
import * as wn from 'webnative'

let fs = null;

const useAsyncReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState),
    dispatch = async action => {
      setState(await reducer(state ?? initialState, action))
    };

  return [state, dispatch];
}

const reducer = async (state, action) => {
  if (!fs) { return; }

  const todosPath = fs.appPath(wn.path.file('todos.json'));

  switch (action.type) {
    case 'all':
      if (await fs.exists(todosPath)) {
        const todos = await fs.read(todosPath)
        state.todos = JSON.parse(todos)
      }
      break;

    case 'add':
      state.todos.push(action.value);
      await fs.write(todosPath, JSON.stringify(state.todos));
      await fs.publish();
      break;

    default:
      break;
  }
  return state;
}


export function useFilesystem(filesystem) {
  fs = filesystem;

  const [todos, dispatch] = useAsyncReducer(reducer, { todos: [] });

  useEffect(() => {
    async function init() {
      await dispatch({ type: "all" });
    }
    init();
  }, [fs]); // eslint-disable-line react-hooks/exhaustive-deps

  return [todos, dispatch];
}