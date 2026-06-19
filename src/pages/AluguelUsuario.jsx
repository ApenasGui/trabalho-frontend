import { useAuth } from "../contexts/AuthContext";

export default function AluguelUsuario() {
  const { usuario } = useAuth();
  const alugueis = usuario?.alugueis ?? [];

  return (
    <>
      <h1>Meus aluguéis</h1>

      {alugueis.length === 0 ? (
        <p>Você ainda não alugou nenhum jogo.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Data do aluguel</th>
            </tr>
          </thead>
          <tbody>
            {alugueis.map((aluguel, index) => (
              <tr key={index}>
                <td>{aluguel.titulo}</td>
                <td>{new Date(aluguel.dataAluguel).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}