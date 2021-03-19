import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import CreateAccount from './Components/CreateAccount/CreateAccount'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';

export const fullContext = createContext()


function App() {
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
  })
  return (
    <fullContext.Provider value={[newAccount, setNewAccount]} >
      <Router>
        <Switch>

          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/create-account'>
            <CreateAccount></CreateAccount>
          </Route>
          <Route path='/log-in'>
            <Login></Login>
          </Route>
          <Route path='/*'>
            <h1>no match</h1>
          </Route>
        </Switch>
      </Router>
    </fullContext.Provider >
  );
}

export default App;
