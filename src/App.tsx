import { Routes, Route } from "react-router-dom";
import routesConfig from "./utils/routesConfig";
import "./scss/app.scss";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {routesConfig.map((route, i) => {
          return <Route key={i} path={route.path} element={route.element} />;
        })}
      </Routes>
    </Layout>
  );
};

export default App;
