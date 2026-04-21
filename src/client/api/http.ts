export async function safeFetch(url: string, init?: RequestInit) {
  try {
    return await fetch(url, init);
  } catch {
    throw new Error('Не удалось подключиться к серверу. Попробуйте позже.');
  }
}
