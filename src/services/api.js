export async function getJogos(){
    try {
        const response = fetch("http://localhost:3001/jogos").then((response) => response.json());
        return await response;
    } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        throw error;
    }
}

export async function getJogoById(id){
    try {
        const response = fetch(`http://localhost:3001/jogos/${id}`).then((response) => response.json());
        return await response;
    } catch (error) {
        console.error(`Erro ao buscar jogo com id ${id}:`, error);
        throw error;
    }
}