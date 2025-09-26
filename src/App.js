import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {UserProvider} from './context/UserContext';
import api from './api';
import { useParams } from 'react-router-dom';

//Routes
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddJob from './pages/AddJob';       
import EditJob from './pages/EditJob';    


// Wrapper component to extract :id param for EditJob
function EditJobWrapper() {
  const { id } = useParams();
  return <EditJob id={id} />;
}

function App() {
  // In React, a state is an object that stores data that can be accessed and modified by our components
  // useState has two elements in an array, these are getters and setters
  /*
    getters-variables that reads values, similar to how we get values from a variable
    setters-functions/methods that stores values.
  */
  //useState does not allow directly modifying a value/variable
  //useState() parameter will store the initial value
  //useState is similar to ref() and reactive() in Vue
  // const [count, setCount] = useState(0);

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const setNewToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  }
 // !! is a Double Negation operator, this will allow us to convert the token into a boolean value
  const isAuthenticated = () => !!token;



  return (
    //React JSX Fragments - empty opening and closing tags
    <UserProvider value={{ token, setNewToken, clearToken, isAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* AddJob and EditJob routes */}
          <Route path="/addJob" element={<AddJob />} />
          <Route path="/editJob/:id" element={<EditJobWrapper />} />
        </Routes>
      </Router>
    </UserProvider>
    );

}

export default App;


