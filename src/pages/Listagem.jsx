import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJogos, atualizarJogo, registrarAluguel } from "../services/api-jogos";
import { useAuth } from "../contexts/AuthContext";

export default function Listagem() {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useAuth();
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [alugandoId, setAlugandoId] = useState(null);

  useEffect(() => {
    async function buscarJogos() {
      try {
        const dados = await getJogos();
        setJogos(dados);
      } catch {
        setErro("Não foi possível carregar os jogos.");
      } finally {
        setCarregando(false);
      }
    }
    buscarJogos();
  }, []);

  async function handleAlugar(jogo) {
    if (!jogo.disponivel || alugandoId === jogo.id) return;

    setAlugandoId(jogo.id);
    try {
      const novaQuantidade = jogo.quantidade - 1;
      const novaDisponibilidade = novaQuantidade === 0 ? false : true;

      const jogoAtualizado = await atualizarJogo(jogo.id, {
        quantidade: novaQuantidade,
        disponivel: novaDisponibilidade,
      });

      const alugueisAtuais = usuario.alugueis ?? [];
      const novoAluguel = {
        jogoId: jogo.id,
        titulo: jogo.titulo,
        dataAluguel: new Date().toISOString(),
      };
      const novosAlugueis = [...alugueisAtuais, novoAluguel];

      const usuarioAtualizado = await registrarAluguel(usuario.id, novosAlugueis);

      setJogos((prev) =>
        prev.map((j) => (j.id === jogo.id ? jogoAtualizado : j))
      );
      setUsuario(usuarioAtualizado);
    } catch {
      setErro("Erro ao alugar o jogo. Tente novamente.");
    } finally {
      setAlugandoId(null);
    }
  }

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <>
      <p className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Jogos cadastrados</h1>
        <button
          onClick={() => navigate("/cadastro")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Novo jogo
        </button>
      </p>

      {jogos.length === 0 ? (
        <p className="text-gray-500">Nenhum jogo cadastrado ainda.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2">Título</th>
              <th className="border px-4 py-2">Gênero</th>
              <th className="border px-4 py-2">Plataforma</th>
              <th className="border px-4 py-2">Quantidade</th>
              <th className="border px-4 py-2 text-center">Disponível</th>
              <th className="border px-4 py-2 text-center">Alugar</th>
            </tr>
          </thead>
          <tbody>
            {jogos.map((jogo, index) => (
              <tr key={jogo.id ?? index} className="hover:bg-gray-50 even:bg-gray-50">
                <td className="border px-4 py-2">{jogo.titulo}</td>
                <td className="border px-4 py-2">{jogo.genero}</td>
                <td className="border px-4 py-2">{jogo.plataforma}</td>
                <td className="border px-4 py-2">{jogo.quantidade}</td>
                <td className="border px-4 py-2 text-center">
                  {jogo.disponivel ? (
                    <span className="text-green-600 font-medium">Sim</span>
                  ) : (
                    <span className="text-red-500 font-medium">Não</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleAlugar(jogo)}
                    disabled={!jogo.disponivel || alugandoId === jogo.id}
                    title={jogo.disponivel ? "Alugar jogo" : "Jogo indisponível"}
                    className={`w-8 h-8 rounded-full transition-all duration-200 
                      ${jogo.disponivel
                        ? "bg-green-500 hover:bg-green-600 shadow-md shadow-green-300 cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed opacity-50"
                      }
                      ${alugandoId === jogo.id ? "animate-pulse" : ""}
                    `}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}