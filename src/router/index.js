
import About from "../pages/About/About";
import Posts from "../pages/Posts/Posts";
import PostPage from "../pages/PostPage/PostPage";
import Page404 from "../pages/Page404/Page404";
import Login from "../pages/Login/Login";

export const privateRoutes = [
  {path: '/about', component: <About/>},
  {path: '/posts/*', component: <Posts/>},
  {path: '/posts/:id', component: <PostPage/>},
  {path: '/page404', component: <Page404/>},
];

export const publicRoutes = [
  {path: '/login', component: <Login/>},
];