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

  const inputClass = (name) =>
    `w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
      touched[name] && erros[name]
        ? "border-red-400 focus:ring-red-200"
        : touched[name]
        ? "border-green-400 focus:ring-green-200"
        : "border-gray-300 focus:ring-blue-200"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" name="email" placeholder="seuemail@exemplo.com"
              value={formData.email} onChange={handleChange} onBlur={handleBlur}
              className={inputClass("email")} />
            {touched.email && erros.email && (
              <span className="text-red-500 text-xs mt-1 block">{erros.email}</span>
            )}
          </>

          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" name="senha" placeholder="••••••••"
              value={formData.senha} onChange={handleChange} onBlur={handleBlur}
              className={inputClass("senha")} />
            {touched.senha && erros.senha && (
              <span className="text-red-500 text-xs mt-1 block">{erros.senha}</span>
            )}
          </>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" name="lembrarMe" checked={formData.lembrarMe}
              onChange={handleChange} className="w-4 h-4" />
            Lembrar-me
          </label>

          {erroApi && <p className="text-red-500 text-sm">{erroApi}</p>}

          <button type="submit" disabled={carregando}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60 transition-colors font-medium mt-2">
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <button type="button" onClick={() => navigate("/cadastro-usuario")}
            className="border border-gray-300 text-gray-600 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}