import {getJogos, getJogoById} from "./api";
import { test, expect, describe } from "vitest";

describe('getJogos', () => {
    test('deve retornar um array de jogos', async () => {
        const jogos = await getJogos();
        expect(Array.isArray(jogos)).toBe(true);
    });

    test('cada jogo deve ter as propriedades id, nome, genero e plataforma', async () => {
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

});