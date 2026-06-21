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
    const novoForm = { ...formData, [name]: novoValor };

    // atualiza disponivel automaticamente pela quantidade
    if (name === "quantidade") {
      novoForm.disponivel = Number(value) > 0;
    }

    setFormData(novoForm);

    if (touched[name] && camposObrigatorios.includes(name)) {
      setErros((prev) => ({ ...prev, [name]: validarCampo(name, novoValor) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (camposObrigatorios.includes(name)) {
      setErros((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
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
      navigate("/listagem");
    } catch (err) {
      setApiError(err.response?.data ?? "Erro ao salvar");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError("");
    if (validarTodos()) salvar(formData);
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
    <div className="max-w-md mx-auto mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastro de jogo</h1>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input type="text" name="titulo" placeholder="Ex: God of War"
            value={formData.titulo} onChange={handleChange} onBlur={handleBlur}
            className={inputClass("titulo")} />
          {touched.titulo && erros.titulo && <span className="text-red-500 text-xs mt-1">{erros.titulo}</span>}
        </>

        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
          <input type="text" name="genero" placeholder="Ex: Ação"
            value={formData.genero} onChange={handleChange} onBlur={handleBlur}
            className={inputClass("genero")} />
          {touched.genero && erros.genero && <span className="text-red-500 text-xs mt-1">{erros.genero}</span>}
        </>

        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
          <input type="number" name="quantidade" placeholder="Ex: 3"
            value={formData.quantidade} onChange={handleChange} onBlur={handleBlur}
            className={inputClass("quantidade")} />
          {touched.quantidade && erros.quantidade && <span className="text-red-500 text-xs mt-1">{erros.quantidade}</span>}
        </>

        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma</label>
          <input type="text" name="plataforma" placeholder="Ex: PS5"
            value={formData.plataforma} onChange={handleChange} onBlur={handleBlur}
            className={inputClass("plataforma")} />
          {touched.plataforma && erros.plataforma && <span className="text-red-500 text-xs mt-1">{erros.plataforma}</span>}
        </>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="disponivel" id="disponivel"
            checked={formData.disponivel} onChange={handleChange}
            className="w-4 h-4" />
          <label htmlFor="disponivel">Disponível</label>
        </div>

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <button type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium mt-2">
          Salvar
        </button>

      </form>
    </div>
  );
}