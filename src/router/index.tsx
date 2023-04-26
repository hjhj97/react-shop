import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default router;
