import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { autenticar } from "../services/api-usuarios";

function validarCampo(name, value) {
  if (!value.trim()) {
    return name === "email" ? "E-mail é obrigatório" : "Senha é obrigatória";
  }
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "E-mail inválido";
  }
  return "";
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", senha: "", lembrarMe: false });
  const [touched, setTouched] = useState({});
  const [erros, setErros] = useState({});
  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const novoValor = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: novoValor });

    if (touched[name] && name !== "lembrarMe") {
      setErros((prev) => ({ ...prev, [name]: validarCampo(name, novoValor) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name !== "lembrarMe") {
      setErros((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
    }
  };

  function validarTodos() {
    const campos = ["email", "senha"];
    const novosErros = {};
    const todosTocados = {};

    campos.forEach((name) => {
      todosTocados[name] = true;
      novosErros[name] = validarCampo(name, formData[name]);
    });

    setTouched(todosTocados);
    setErros(novosErros);
    return Object.values(novosErros).every((e) => e === "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroApi("");
    if (!validarTodos()) return;

    setCarregando(true);
    try {
      const usuario = await autenticar(formData.email, formData.senha);
      login(usuario, formData.lembrarMe);
      navigate("/");
    } catch (err) {
      setErroApi(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} noValidate>
        <section>
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="seuemail@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && erros.email && <span>{erros.email}</span>}
        </section>

        <section>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="••••••••"
            value={formData.senha}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.senha && erros.senha && <span>{erros.senha}</span>}
        </section>

        <label>
          <input
            type="checkbox"
            name="lembrarMe"
            checked={formData.lembrarMe}
            onChange={handleChange}
          />
          Lembrar-me
        </label>

        {erroApi && <p>{erroApi}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <button type="button" onClick={() => navigate("/registrar")}>
          Criar conta
        </button>
      </form>
    </>
  );
}