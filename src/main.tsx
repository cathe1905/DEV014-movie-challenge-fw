import App from './App.tsx'
import MovieDetail from './components/MovieDetail.tsx';
import './styles/card.css'
import './styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '/src/styles/navBar.css'
import '/src/styles/movieDetail.css'
import '/src/styles/select.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: App(),
  },
  {
    path:"/movie/:id",
    element: <MovieDetail></MovieDetail>,
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
