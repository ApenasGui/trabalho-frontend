import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../services/api-usuarios";

function validarCampo(name, value, formData) {
  if (!value.trim()) {
    const labels = { nome: "Nome", email: "E-mail", senha: "Senha", confirmarSenha: "Confirmação de senha" };
    return `${labels[name]} é obrigatório`;
  }
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "E-mail inválido";
  }
  if (name === "senha" && value.length < 6) {
    return "Senha deve ter no mínimo 6 caracteres";
  }
  if (name === "confirmarSenha" && value !== formData.senha) {
    return "As senhas não coincidem";
  }
  return "";
}

const campos = ["nome", "email", "senha", "confirmarSenha"];

export default function CadastroUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" });
  const [touched, setTouched] = useState({});
  const [erros, setErros] = useState({});
  const [erroApi, setErroApi] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const novoForm = { ...formData, [name]: value };
    setFormData(novoForm);

    if (touched[name]) {
      setErros((prev) => ({ ...prev, [name]: validarCampo(name, value, novoForm) }));
    }

    if (name === "senha" && touched.confirmarSenha) {
      setErros((prev) => ({
        ...prev,
        confirmarSenha: validarCampo("confirmarSenha", novoForm.confirmarSenha, novoForm),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const formAtual = { ...formData, [name]: value };
    setErros((prev) => ({ ...prev, [name]: validarCampo(name, value, formAtual) }));
  };

  function validarTodos() {
    const novosErros = {};
    const todosTocados = {};
    campos.forEach((name) => {
      todosTocados[name] = true;
      novosErros[name] = validarCampo(name, formData[name], formData);
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
      // eslint-disable-next-line no-unused-vars
      const { confirmarSenha, ...dadosParaSalvar } = formData;
      await cadastrarUsuario(dadosParaSalvar);
      navigate("/login");
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Criar conta</h1>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" name="nome" placeholder="Seu nome completo"
              value={formData.nome} onChange={handleChange} onBlur={handleBlur}
              className={inputClass("nome")} />
            {touched.nome && erros.nome && <span className="text-red-500 text-xs mt-1 block">{erros.nome}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" name="email" placeholder="seuemail@exemplo.com"
              value={formData.email} onChange={handleChange} onBlur={handleBlur}
              className={inputClass("email")} />
            {touched.email && erros.email && <span className="text-red-500 text-xs mt-1 block">{erros.email}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" name="senha" placeholder="Mínimo 6 caracteres"
              value={formData.senha} onChange={handleChange} onBlur={handleBlur}
              className={inputClass("senha")} />
            {touched.senha && erros.senha && <span className="text-red-500 text-xs mt-1 block">{erros.senha}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar senha</label>
            <input type="password" name="confirmarSenha" placeholder="Repita a senha"
              value={formData.confirmarSenha} onChange={handleChange} onBlur={handleBlur}
              className={inputClass("confirmarSenha")} />
            {touched.confirmarSenha && erros.confirmarSenha && (
              <span className="text-red-500 text-xs mt-1 block">{erros.confirmarSenha}</span>
            )}
          </div>

          {erroApi && <p className="text-red-500 text-sm">{erroApi}</p>}

          <button type="submit" disabled={carregando}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60 transition-colors font-medium mt-2">
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>

          <button type="button" onClick={() => navigate("/login")}
            className="border border-gray-300 text-gray-600 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Já tenho conta
          </button>
        </form>
      </div>
    </div>
  );
}