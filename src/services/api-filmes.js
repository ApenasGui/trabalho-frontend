const API_URL = "http://localhost:3001/filmes";

export async function mostrarIdPeloTitulo(titulo) {
    try {
        const filmes = await getFilmes();
        const tituloJogoMinusculo = titulo.toLowerCase();
        const filmeEncontrado = filmes.find(filme => filme.titulo.toLowerCase() === tituloJogoMinusculo);
        if (filmeEncontrado) {
            return filmeEncontrado.id;
        } else {
            throw new Error(`Filme com título "${titulo}" não encontrado.`);
        }
    } catch (error) {
        console.error("Erro ao buscar filme pelo título:", error);
        throw error;
    }
}

export function procurarJogoPorTitulo(titulo, jogos) {

    const tituloJogoMinusculo = titulo.toLowerCase();
    for(const jogo of jogos) {
        if(jogo.titulo.toLowerCase() === tituloJogoMinusculo){
            return true;
        }
    }
    return false;
}

export async function getFilmes(){
    try {
        const response = await fetch(API_URL);
        return await response.json();

    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        throw error;
    }
}

export async function getFilmeById(id){
    try {
        const response = fetch(`${API_URL}/${id}`).then((response) => response.json());
        return await response;
    } catch (error) {
        console.error(`Erro ao buscar filme pelo id ${id}:`, error);
        throw error;
    }
}

export async function addFilme(filme){
    try {
        if(procurarJogoPorTitulo(filme.titulo, await getFilmes())){
            return new Error(`Já existe um filme com o título "${filme.titulo}".`);
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filme)
        });


        const data = await response.json();
        console.log("Resposta da api:", data);
        return data;
    } catch (error) {
        console.error("Erro ao adicionar filme:", error);
        throw error;
    }
}

export async function deleteFilme(titulo) {
    try {
        const id = await mostrarIdPeloTitulo(titulo);
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error(`Erro ao deletar filme com título ${titulo}:`, error);
        throw error;
    }
}