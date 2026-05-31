const HISTORY_KEY = 'gh_search_history';
const MAX_HISTORY = 5;

export function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

export function saveHistory(username: string): string[] {
  const updated = [username, ...getHistory().filter((entry) => entry !== username)].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}
