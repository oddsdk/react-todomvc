import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "todomvc-app-css/index.css";

import Login from './components/Login';
import TodoList from './components/TodoList';
import { useAuth } from './hooks/useAuth';

function App() {
  const { program } = useAuth()

  if (program) {
    if (program.session) {
      return (
        <HashRouter>
          <React.Fragment>
            <div className="todoapp">
              <Route path="/:filter?" component={TodoList} />
            </div>
          </React.Fragment>
        </HashRouter>
      );
    }
    else {
      return (
        <div className="todoapp">
          <Login />
        </div>
      );
    }
  }
  return <div>Loading...</div>
}

export default App;
