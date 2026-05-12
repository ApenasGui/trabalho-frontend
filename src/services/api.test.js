import {getJogos, getJogoById, addJogo, mostrarIdPeloTitulo, deleteJogo} from "./api";
import { test, expect, describe, afterEach } from "vitest";

describe('getJogos', () => {

    afterEach(async () => {
        const jogos = await getJogos();
        const jogoCriado = jogos.find(jogo => jogo.titulo === "Novo Jogo");
        if (jogoCriado) {
            await deleteJogo(jogoCriado.titulo);
        }
    });

    test('deve retornar um array de jogos', async () => {
        const jogos = await getJogos();
        expect(Array.isArray(jogos)).toBe(true);
    });

    test('cada jogo deve ter as propriedades id, nome, genero, plataforma e disponibilidade', async () => {
        const jogos = await getJogos();
        jogos.forEach(jogo => {
            expect(jogo).toHaveProperty('id');
            expect(jogo).toHaveProperty('titulo');
            expect(jogo).toHaveProperty('genero');
            expect(jogo).toHaveProperty('plataforma');
            expect(jogo).toHaveProperty('disponivel');
        });
    });

    test('deve buscar jogo pelo id', async () => {
        const jogo = await getJogoById(1);
        expect(jogo.titulo).toBe("The Last of Us Part I");
    });

    test('deve retornar erro para id inexistente', async () => {
        try {
            await getJogoById(999);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test('deve criar um novo jogo se titulo ainda não existir', async () => {

        const newJogo = {
            titulo: "Novo Jogo",
            plataforma: "PC",
            genero: "Ação",
            disponivel: true
        };
        const createdJogo = await addJogo(newJogo);

        expect(createdJogo.titulo).toBe(newJogo.titulo);
        expect(createdJogo.plataforma).toBe(newJogo.plataforma);
        expect(createdJogo.genero).toBe(newJogo.genero);
        expect(createdJogo.disponivel).toBe(newJogo.disponivel);
    });

    test('deve retornar o id pelo título do jogo', async () => {
        const id = await mostrarIdPeloTitulo("The Last of Us Part I");
        expect(id).toBe("1");
    });

});