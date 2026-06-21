import { useAuth } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Menu() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <h1>Bem vindo, {usuario?.nome}!</h1>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/listagem">Listagem</NavLink></li>
        <li><NavLink to="/cadastro">Cadastro</NavLink></li>
        <li><NavLink to="/meus-alugueis">Meus aluguéis</NavLink></li>
        <li>
          <button type="button" onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </nav>
  );
}