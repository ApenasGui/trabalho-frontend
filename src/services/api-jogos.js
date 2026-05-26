const API_URL = "http://localhost:3001/jogos";

export async function mostrarIdPeloTitulo(titulo) {
    try {
        const jogos = await getJogos();
        const tituloJogoMinusculo = titulo.toLowerCase();
        const jogoEncontrado = jogos.find(jogo => jogo.titulo.toLowerCase() === tituloJogoMinusculo);
        if (jogoEncontrado) {
            return jogoEncontrado.id;
        } else {
            throw new Error(`Jogo com título "${titulo}" não encontrado.`);
        }
    } catch (error) {
        console.error("Erro ao buscar jogo pelo título:", error);
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

export async function getJogos(){
    try {
        const response = await fetch(API_URL);
        return await response.json();

    } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        throw error;
    }
}

export async function getJogoById(id){
    try {
        const response = fetch(`${API_URL}/${id}`).then((response) => response.json());
        return await response;
    } catch (error) {
        console.error(`Erro ao buscar jogo com id ${id}:`, error);
        throw error;
    }
}

export async function addJogo(jogo){
    try {
        if(procurarJogoPorTitulo(jogo.titulo, await getJogos())){
            return new Error(`Já existe um jogo com o título "${jogo.titulo}".`);
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jogo)
        });


        const data = await response.json();
        console.log("Resposta da api:", data);
        return data;
    } catch (error) {
        console.error("Erro ao adicionar jogo:", error);
        throw error;
    }
}

export async function deleteJogo(titulo) {
    try {
        const id = await mostrarIdPeloTitulo(titulo);
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error(`Erro ao deletar jogo com título ${titulo}:`, error);
        throw error;
    }
}