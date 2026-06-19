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

const camposObrigatorios = ["nome", "email", "senha", "confirmarSenha"];

export default function RegistroUsuario() {
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

    // revalida confirmação se o usuário editar a senha depois
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

    camposObrigatorios.forEach((name) => {
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

  return (
    <>
      <h1>Criar conta</h1>

      <form onSubmit={handleSubmit} noValidate>
        <>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Seu nome completo"
            value={formData.nome}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.nome && erros.nome && <span>{erros.nome}</span>}
        </>

        <>
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
        </>

        <>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="Mínimo 6 caracteres"
            value={formData.senha}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.senha && erros.senha && <span>{erros.senha}</span>}
        </>

        <>
          <label>Confirmar senha</label>
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Repita a senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmarSenha && erros.confirmarSenha && (
            <span>{erros.confirmarSenha}</span>
          )}
        </>

        {erroApi && <p>{erroApi}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>

        <button type="button" onClick={() => navigate("/login")}>
          Já tenho conta
        </button>
      </form>
    </>
  );
}