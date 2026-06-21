import { useAuth } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";

export default function Menu(){
    const { usuario } = useAuth();

    return <nav>
        <h1>Bem vindo, {usuario.nome} !</h1>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/listagem">Listagem</NavLink>
            </li>
            <li>
                <NavLink to="/cadastro">Cadastro</NavLink>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/meus-alugueis">Meus aluguéis</Link>
            </li>
        </ul>
    </nav>
}