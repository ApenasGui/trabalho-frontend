import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {addJogo} from "../services/api-jogos";
import { useItem } from "../contexts/ItemContext";

export default function Cadastro() {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const { adicionarItem } = useItem();

    const [formData, setFormData] = useState({
        titulo: "",
        genero: "",
        quantidade: "",
        plataforma: "",
        disponivel: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    const salvar = async (data) => {
        try {
            await addJogo(data);
            adicionarItem(data);
            navigate("/cadastro");
        } catch (err) {
            setError(err.response.data);
        }
    }

    function validarCampos(){
        if(!formData.titulo || !formData.genero || !formData.quantidade || !formData.plataforma){
            setError("Todos os campos são obrigatórios");
            return false;
        }
        return true;
    }

    return (
        <>
        <h1>Cadastro de itens</h1>
        <form onSubmit={(e) => {
            e.preventDefault();
            if (validarCampos()) {
                salvar(formData);
            }
        }}>
            <input type="text" name="titulo" placeholder="Titulo" value={formData.titulo} onChange={handleChange} />
            <input type="text" name="genero" placeholder="Gênero" value={formData.genero} onChange={handleChange} />
            <input type="number" name="quantidade" placeholder="Quantidade" value={formData.quantidade} onChange={handleChange} />
            <input type="text" name="plataforma" placeholder="Plataforma" value={formData.plataforma} onChange={handleChange} />
            <input type="checkbox" name="disponivel" placeholder="Disponível" checked={formData.disponivel} onChange={handleChange} />
            <button type="submit">Salvar</button>
        </form>
        </>
    );
}