import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import SignUpForm from "./Pages/SignUpForm/SignUpForm";
import LoginForm from "./Pages/LoginForm/LoginForm";
import Dashboard from "./Pages/Dashboard/Dashboard";
import List from './Pages/List/List';
import SinglePage from './Pages/SinglePage/SinglePage';
import NewPage from './Pages/NewPage/NewPage';
import { userInputs } from './formSource';
import "./style/dark.scss"
import { DarkModeContext } from './Context/darkModeContext';
import RoutesPage from './Pages/RoutesPage/RoutesPage';
import { AuthContext } from './Context/AuthContext';

function App() {
  const {darkMode} = useContext(DarkModeContext); 

  return (
    <div className={ darkMode ? "app dark" : "app"}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/signup" element={<SignUpForm />}/>
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="user">
        <Route index element={<List />         
          }/>
        <Route path=":userId" element={          
            <SinglePage />        
        }/>
        <Route path="new" element={          
            <NewPage inputs = {userInputs} title="Add New User" />}/>
      </Route>
      <Route path="routespage">
        <Route index element={<RoutesPage />
        }/>
      </Route>
    </Routes>
    <ToastContainer />
    </BrowserRouter>
    </div>

  );
}

export default App;
