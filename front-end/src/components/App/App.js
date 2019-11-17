import React, { useState } from 'react';
import logo from './logo.svg';
import { Row } from 'react-bootstrap';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Routes from '../../infrastructure/routes/routes';
import LoginPage from '../../slices/LogIn/LoginPage';
import { UserContext } from '../../infrastructure/contexts/UserContext';


function App(props) {
  console.log(props);
  const [user, setUser] = useState();
  return (
      <Switch>
        <UserContext.Provider value={{user, setUser}}>
          <Route path='/' component={Routes} />
        </UserContext.Provider>
      </Switch>
  );
}

export default App;
