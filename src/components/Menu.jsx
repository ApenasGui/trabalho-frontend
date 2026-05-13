import { useAuth } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";

export default function Menu(){
    const { user } = useAuth();

    return <nav>
        <h1>Bem vindo, {user.nome} !</h1>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/list">List</NavLink>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
}