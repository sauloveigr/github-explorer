import { configureStore } from '@reduxjs/toolkit';
import historyReducer, { addToHistory } from './historySlice';

const STORAGE_KEY = 'gh_search_history';

function makeStore(preloadedItems?: string[]) {
  if (preloadedItems) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preloadedItems));
  }
  return configureStore({ reducer: { history: historyReducer } });
}

describe('historySlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('estado inicial', () => {
    it('inicia com lista vazia quando localStorage está vazio', () => {
      const store = makeStore();
      expect(store.getState().history.items).toEqual([]);
    });

    it('carrega itens do localStorage ao inicializar a store', () => {
      const store = makeStore(['torvalds', 'gaearon']);
      expect(store.getState().history.items).toEqual(['torvalds', 'gaearon']);
    });

    it('inicia com lista vazia quando localStorage contém JSON inválido', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid-json');
      const store = configureStore({ reducer: { history: historyReducer } });
      expect(store.getState().history.items).toEqual([]);
    });
  });

  describe('addToHistory', () => {
    it('adiciona um usuário ao início da lista', () => {
      const store = makeStore();
      store.dispatch(addToHistory('torvalds'));
      expect(store.getState().history.items).toEqual(['torvalds']);
    });

    it('insere novo item no topo do histórico existente', () => {
      const store = makeStore(['gaearon']);
      store.dispatch(addToHistory('torvalds'));
      expect(store.getState().history.items).toEqual(['torvalds', 'gaearon']);
    });

    it('move item duplicado para o topo em vez de inserir novamente', () => {
      const store = makeStore(['torvalds', 'gaearon', 'tj']);
      store.dispatch(addToHistory('gaearon'));
      expect(store.getState().history.items).toEqual(['gaearon', 'torvalds', 'tj']);
    });

    it('limita o histórico a 5 itens', () => {
      const store = makeStore(['a', 'b', 'c', 'd', 'e']);
      store.dispatch(addToHistory('f'));
      expect(store.getState().history.items).toHaveLength(5);
      expect(store.getState().history.items[0]).toBe('f');
      expect(store.getState().history.items).not.toContain('e');
    });

    it('persiste o histórico atualizado no localStorage', () => {
      const store = makeStore(['gaearon']);
      store.dispatch(addToHistory('torvalds'));
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(stored).toEqual(['torvalds', 'gaearon']);
    });
  });


});
