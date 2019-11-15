import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Routes from './routes';


function App(props) {
  console.log(props);
  return (
      <Switch>
        <Route path='/' component={Routes} />
      </Switch>
  );
}

export default App;
