import Cart from "../pages/Cart";
import FullPizza from "../pages/FullPizza";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

const routesConfig = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "pizza/:id",
    element: <FullPizza />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routesConfig;
