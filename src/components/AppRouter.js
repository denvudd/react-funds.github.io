import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context";


import { publicRoutes, privateRoutes } from '../router';
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth);

  if (isLoading) {
    return <Loader/>
  }

  return (
    isAuth 
        ? <Routes>
            {privateRoutes.map(route => {
              return <Route path={route.path} 
                    element={route.component}
                    key={route.path} />
            })}
            <Route path="*" element={<Navigate to="/posts"/>} />
          </Routes>
        : <Routes>
          {publicRoutes.map(route => {
            return <Route path={route.path} 
                  element={route.component}
                  key={route.path} />
          })}
          <Route path="*" element={<Navigate to="/login"/>} />
          </Routes>
  );
};

export default AppRouter;