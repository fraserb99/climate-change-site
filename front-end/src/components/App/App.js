import React from 'react';
import logo from './logo.svg';
import { Row } from 'react-bootstrap';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Routes from '../../infrastructure/routes/routes';
import LoginPage from '../../slices/LogIn/LoginPage';


function App(props) {
  console.log(props);
  return (
      <Switch>
        <Route path='/' component={Routes} />
        {/* <Route path='/login' component={LoginPage} /> */}
      </Switch>
  );
}

export default App;
