import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addJogo } from "../services/api-jogos";
import { useItem } from "../contexts/ItemContext";

const camposObrigatorios = ["titulo", "genero", "quantidade", "plataforma"];

const labels = {
  titulo: "Título",
  genero: "Gênero",
  quantidade: "Quantidade",
  plataforma: "Plataforma",
};

function validarCampo(name, value) {
  if (!value || value.toString().trim() === "") {
    return `${labels[name]} é obrigatório`;
  }
  if (name === "quantidade" && Number(value) <= 0) {
    return "Quantidade deve ser maior que zero";
  }
  return "";
}

export default function Cadastro() {
  const navigate = useNavigate();
  const { adicionarItem } = useItem();
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    quantidade: "",
    plataforma: "",
    disponivel: false,
  });

  const [touched, setTouched] = useState({});

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const novoValor = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: novoValor });

    if (touched[name] && camposObrigatorios.includes(name)) {
      setErros((prev) => ({
        ...prev,
        [name]: validarCampo(name, novoValor),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    if (camposObrigatorios.includes(name)) {
      setErros((prev) => ({
        ...prev,
        [name]: validarCampo(name, value),
      }));
    }
  };

  function validarTodos() {
    const novosErros = {};
    const todosTocados = {};

    camposObrigatorios.forEach((name) => {
      todosTocados[name] = true;
      novosErros[name] = validarCampo(name, formData[name]);
    });

    setTouched(todosTocados);
    setErros(novosErros);

    return Object.values(novosErros).every((e) => e === "");
  }

  const salvar = async (data) => {
    try {
      await addJogo(data);
      adicionarItem(data);
      navigate("/cadastro");
    } catch (err) {
      setApiError(err.response?.data ?? "Erro ao salvar");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError("");
    if (validarTodos()) {
      salvar(formData);
    }
  };

  const inputClass = (name) =>
    `border p-2 rounded w-full ${
      touched[name] && erros[name]
        ? "border-red-500 focus:outline-red-500"
        : touched[name]
        ? "border-green-500 focus:outline-green-500"
        : "border-gray-300"
    }`;

  return (
    <>
      <h1>Cadastro de itens</h1>
      <form onSubmit={handleSubmit} noValidate>

        <>
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("titulo")}
          />
          {touched.titulo && erros.titulo && (
            <span className="text-red-500 text-sm">{erros.titulo}</span>
          )}
        </>

        <>
          <input
            type="text"
            name="genero"
            placeholder="Gênero"
            value={formData.genero}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("genero")}
          />
          {touched.genero && erros.genero && (
            <span className="text-red-500 text-sm">{erros.genero}</span>
          )}
        </>

        <>
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("quantidade")}
          />
          {touched.quantidade && erros.quantidade && (
            <span className="text-red-500 text-sm">{erros.quantidade}</span>
          )}
        </>

        <>
          <input
            type="text"
            name="plataforma"
            placeholder="Plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("plataforma")}
          />
          {touched.plataforma && erros.plataforma && (
            <span className="text-red-500 text-sm">{erros.plataforma}</span>
          )}
        </>

        <>
          <label>
            <input
              type="checkbox"
              name="disponivel"
              checked={formData.disponivel}
              onChange={handleChange}
            />
            {" "}Disponível
          </label>
        </>

        {apiError && <p className="text-red-600">{apiError}</p>}

        <button type="submit">Salvar</button>
      </form>
    </>
  );
}