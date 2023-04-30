import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import About from "../pages/About";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "product_list", element: <ProductList /> },
      { path: "product/:product_id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

export default router;
