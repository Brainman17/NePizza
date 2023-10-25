import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="ne-pizza" element={<HomePage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
