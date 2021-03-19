import { createContext, useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';

export const fullContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <fullContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <h1 style={{color:'red'}}>I am the best developer. I do everythig however it difficult</h1>
      <p>name: {loggedInUser.displayName}</p>
      <img src={loggedInUser.photoURL} alt="" />
      <Login></Login>
    </fullContext.Provider>
  );
}

export default App;
