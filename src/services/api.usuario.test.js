import { describe, test, expect, vi, beforeEach } from 'vitest';
import { autenticar, cadastrarUsuario } from '../services/api-usuarios';

const usuarioMock = { id: 1, nome: 'Guilherme', email: 'gui@teste.com', senha: '123456', alugueis: [] };

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

describe('autenticar', () => {
  test('deve retornar usuário com credenciais corretas', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [usuarioMock] });
    const usuario = await autenticar('gui@teste.com', '123456');
    expect(usuario.email).toBe('gui@teste.com');
  });

  test('deve lançar erro se usuário não encontrado', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    await expect(autenticar('gui@teste.com', 'senhaerrada')).rejects.toThrow('E-mail ou senha incorretos');
  });

  test('deve lançar erro se resposta não for ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(autenticar('gui@teste.com', '123456')).rejects.toThrow('Erro ao conectar com o servidor');
  });
});

describe('cadastrarUsuario', () => {
  test('deve cadastrar novo usuário', async () => {
    const novoUsuario = { nome: 'Novo', email: 'novo@teste.com', senha: '123456' };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 2, ...novoUsuario, alugueis: [] }) });
    const resultado = await cadastrarUsuario(novoUsuario);
    expect(resultado.email).toBe('novo@teste.com');
    expect(resultado.alugueis).toEqual([]);
  });

  test('deve lançar erro se resposta não for ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(cadastrarUsuario({})).rejects.toThrow('Erro ao cadastrar usuário');
  });
});