import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  getJogos,
  getJogoById,
  addJogo,
  atualizarJogo,
  registrarAluguel,
  procurarJogoPorTitulo,
  deleteJogo,
  mostrarIdPeloTitulo
} from '../services/api-jogos';

const jogosMock = [
  { id: '1', titulo: 'God of War', genero: 'Ação', plataforma: 'PS5', quantidade: 2, disponivel: true },
  { id: '2', titulo: 'Minecraft', genero: 'Sandbox', plataforma: 'PC', quantidade: 5, disponivel: true },
];

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

describe('getJogos', () => {
  test('deve retornar lista de jogos', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock });
    const jogos = await getJogos();
    expect(Array.isArray(jogos)).toBe(true);
    expect(jogos).toHaveLength(2);
  });

  test('cada jogo deve ter as propriedades esperadas', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock });
    const jogos = await getJogos();
    jogos.forEach(jogo => {
      expect(jogo).toHaveProperty('id');
      expect(jogo).toHaveProperty('titulo');
      expect(jogo).toHaveProperty('genero');
      expect(jogo).toHaveProperty('plataforma');
      expect(jogo).toHaveProperty('disponivel');
    });
  });
});

describe('getJogoById', () => {
  test('deve retornar jogo pelo id', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock[0] });
    const jogo = await getJogoById('1');
    expect(jogo.titulo).toBe('God of War');
  });
});

describe('addJogo', () => {
  test('deve adicionar novo jogo se título não existir', async () => {
    const novoJogo = { titulo: 'Novo Jogo', genero: 'RPG', plataforma: 'PS5', quantidade: 1, disponivel: true };
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => [] }) // getJogos interno
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: '3', ...novoJogo }) });
    const resultado = await addJogo(novoJogo);
    expect(resultado.titulo).toBe('Novo Jogo');
  });

  test('não deve adicionar jogo com título duplicado', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock });
    const resultado = await addJogo({ titulo: 'God of War' });
    expect(resultado).toBeInstanceOf(Error);
  });
});

describe('atualizarJogo', () => {
  test('deve atualizar jogo com sucesso', async () => {
    const atualizado = { ...jogosMock[0], quantidade: 1 };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => atualizado });
    const resultado = await atualizarJogo('1', { quantidade: 1 });
    expect(resultado.quantidade).toBe(1);
  });

  test('deve lançar erro se resposta não for ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(atualizarJogo('1', {})).rejects.toThrow('Erro ao atualizar jogo');
  });
});

describe('registrarAluguel', () => {
  test('deve registrar aluguel no usuário', async () => {
    const alugueis = [{ jogoId: '1', titulo: 'God of War', dataAluguel: new Date().toISOString() }];
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1, alugueis }) });
    const resultado = await registrarAluguel(1, alugueis);
    expect(resultado.alugueis).toHaveLength(1);
  });

  test('deve lançar erro se resposta não for ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(registrarAluguel(1, [])).rejects.toThrow('Erro ao registrar aluguel');
  });
});

describe('procurarJogoPorTitulo', () => {
  test('deve retornar true se jogo existir', () => {
    expect(procurarJogoPorTitulo('God of War', jogosMock)).toBe(true);
  });

  test('deve ser case-insensitive', () => {
    expect(procurarJogoPorTitulo('god of war', jogosMock)).toBe(true);
  });

  test('deve retornar false se jogo não existir', () => {
    expect(procurarJogoPorTitulo('Jogo Inexistente', jogosMock)).toBe(false);
  });

  
});

describe('mostrarIdPeloTitulo', () => {
  test('deve retornar o id pelo título', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock });
    const id = await mostrarIdPeloTitulo('God of War');
    expect(id).toBe('1');
  });

  test('deve ser case-insensitive', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock });
    const id = await mostrarIdPeloTitulo('god of war');
    expect(id).toBe('1');
  });

  test('deve lançar erro se título não existir', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock });
    await expect(mostrarIdPeloTitulo('Jogo Inexistente')).rejects.toThrow('Jogo com título "Jogo Inexistente" não encontrado.');
  });
});

describe('deleteJogo', () => {
  test('deve deletar jogo pelo título', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => jogosMock }) // getJogos interno
      .mockResolvedValueOnce({ ok: true }); // DELETE
    await expect(deleteJogo('God of War')).resolves.not.toThrow();
  });

  test('deve lançar erro se título não existir', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => jogosMock });
    await expect(deleteJogo('Inexistente')).rejects.toThrow();
  });
});

describe('getJogos - erro de rede', () => {
  test('deve lançar erro se fetch falhar', async () => {
    fetch.mockRejectedValueOnce(new Error('Falha de rede'));
    await expect(getJogos()).rejects.toThrow('Falha de rede');
  });
});

describe('getJogoById - erro de rede', () => {
  test('deve lançar erro se fetch falhar', async () => {
    fetch.mockRejectedValueOnce(new Error('Falha de rede'));
    await expect(getJogoById('999')).rejects.toThrow('Falha de rede');
  });
});