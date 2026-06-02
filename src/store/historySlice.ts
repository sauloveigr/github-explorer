import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'gh_search_history';
const MAX_HISTORY = 5;

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function persist(items: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export interface HistoryState {
  items: string[];
}

const historySlice = createSlice({
  name: 'history',
  initialState: (): HistoryState => ({ items: load() }),
  reducers: {
    addToHistory(state, action: PayloadAction<string>) {
      state.items = [
        action.payload,
        ...state.items.filter((item) => item !== action.payload),
      ].slice(0, MAX_HISTORY);
      persist(state.items);
    },
  },
});

export const { addToHistory } = historySlice.actions;
export default historySlice.reducer;
