import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Layout from "./layout/Layout";
import { useAuth } from "./contexts/AuthContext";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default function App() {

  const { logged } = useAuth();

  return (
      <Routes>
        {logged ? (
        <Route path="/" element={<Layout />}> {}
          <Route index element={<Home />} />
          <Route path="listagem" element={<List />} />
          <Route path="cadastro" element={<Cadastro />} />
        </Route>
        ) : (
          <>
            <Route path="login" element={<Login />} />
          </>
        )}
      </Routes>
  );
};