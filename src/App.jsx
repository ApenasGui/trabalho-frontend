import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Listagem from "./pages/Listagem";
import AluguelUsuario from "./pages/AluguelUsuario";
import CadastroUsuario from "./pages/CadastroUsuario";

export default function App() {

  const { logged } = useAuth();

  return (
      <Routes>
        {logged ? (
        <Route path="/" element={<Layout />}> {}
          <Route index element={<Home />} />
          <Route path="listagem" element={<Listagem />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="meus-alugueis" element={<AluguelUsuario />} />
        </Route>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="cadastro-usuario" element={<CadastroUsuario />} />
          </>
        )}
      </Routes>
  );
};