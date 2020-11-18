import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Landing from '../Landing/Landing';
import Chat from "../Chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/room" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
