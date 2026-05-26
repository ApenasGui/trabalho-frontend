import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login({
            nome: "Guilherme Silva",
            email: "gui@email.test"
        });
        navigate("/");
    }


    return <>
    <h1>Login</h1>
    <button onClick={handleLogin}>Entrar</button>
    </>
}