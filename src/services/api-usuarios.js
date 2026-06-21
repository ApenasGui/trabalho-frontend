const BASE_URL = "http://localhost:3001";

export async function autenticar(email, senha) {
  const response = await fetch(
    `${BASE_URL}/usuarios?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) throw new Error("Erro ao conectar com o servidor");

  const usuarios = await response.json();

  const usuario = usuarios.find((u) => u.senha === senha);
  if (!usuario) throw new Error("E-mail ou senha incorretos");

  return usuario;
}

export async function cadastrarUsuario(dados) {
  const response = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...dados, alugueis: [] }),
  });
  if (!response.ok) throw new Error("Erro ao cadastrar usuário");
  return response.json();
}