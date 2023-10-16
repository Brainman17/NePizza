import Cart from "../containers/Cart";
import FullPizza from "../containers/FullPizza";
import HomePage from "../containers/HomePage";
import NotFound from "../containers/NotFound";

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
