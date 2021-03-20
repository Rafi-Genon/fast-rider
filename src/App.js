import { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import BookRide from './Components/BookRide/BookRide';
import CreateAccount from './Components/CreateAccount/CreateAccount'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NotMatch from './Components/NotMatch/NotMatch';

export const fullContext = createContext()


function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false,
    destinationConfirm: false
  })
  return (
    <fullContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <PrivateRoute path='/book/:vehicleType'>
            <BookRide></BookRide>
          </PrivateRoute>
          <Route path='/create-account'>
            <CreateAccount></CreateAccount>
          </Route>
          <Route path='/log-in'>
            <Login></Login>
          </Route>
          <Route path='/*'>
            <NotMatch></NotMatch>
          </Route>
        </Switch>
      </Router>
    </fullContext.Provider >
  );
}

export default App;
