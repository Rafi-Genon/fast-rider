import { createContext, useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';

export const fullContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    photo: '',
    error:'',
    success:false,
    worngPassError: false
  })
  return (
    <fullContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <div  style={{textAlign:'center'}}>
        <h1 style={{ color: 'red' }}>I am the best developer. I do everythig however it difficult</h1>
        <p>name: {loggedInUser.name}</p>
        <p>email: {loggedInUser.email}</p>
        <p>password: {loggedInUser.password}</p>
        <p>confirm-password: {loggedInUser.confirmPassword}</p>
        <img src={loggedInUser.photo} alt="" />
        <Login></Login>
      </div>
    </fullContext.Provider>
  );
}

export default App;
