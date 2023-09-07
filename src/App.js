import './App.css';

import { useRoutes } from "react-router-dom";
import Home from './home';
import User from './user';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    { path: "user", element: <User /> },
  ]);

  return element;
}

export default App;