import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context";

import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter";

import Navbar from "./components/UI/navbar/Navbar";

import './styles/App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth: isAuth,
      setIsAuth: setIsAuth, 
      isLoading: isLoading,
    }}>
      <BrowserRouter>
        <header className="header">
          <Navbar/>
        </header>
        <AppRouter/>
        <footer className="footer">
          <Footer/>
        </footer>
      </BrowserRouter>
    </AuthContext.Provider>
  )  
}

export default App;
