import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AppRouter from "./components/AppRouter";

import Navbar from "./components/UI/navbar/Navbar";

import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )  
}

export default App;
