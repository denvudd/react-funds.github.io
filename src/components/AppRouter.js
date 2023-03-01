import { Routes, Route, Navigate } from "react-router-dom";

import About from "../pages/About";
import Posts from "../pages/Posts";
import Page404 from "../pages/Page404";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/about" element={<About/>}/>
      <Route path="/posts" element={<Posts/>}/>
      <Route path="/page404" element={<Page404/>}/>
      <Route path="*" element={<Navigate to="/page404"/>} />
    </Routes>
  );
};

export default AppRouter;