import { authStorage } from '@/client/api/auth-storage';

export interface User {
  id: string;
  email: string;
  display_name?: string | null;
  created_at: string;
  scopes?: string[];
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

async function safeFetch(input: RequestInfo | URL, init?: RequestInit) {
  try {
    return await fetch(input, init);
  } catch {
    if (!navigator.onLine) {
      throw new Error('Нет подключения к интернету.');
    }

    throw new Error('Не удалось подключиться к серверу. Попробуйте позже.');
  }
}

async function parseErrors(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data?.message || 'Произошла ошибка';
  } catch {
    return 'Произошла ошибка';
  }
}

export async function registerRequest(payload: {
  email: string;
  password: string;
  display_name?: string | null;
}): Promise<User> {
  const response = await safeFetch(`${API_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrors(response));
  }

  return response.json();
}

export async function loginRequest(payload: {
  email: string;
  password: string;
}): Promise<TokenPair> {
  const response = await safeFetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrors(response));
  }

  return response.json();
}

export async function getMeRequest(): Promise<User> {
  const token = authStorage.getAccessToken();
  const tokenType = authStorage.getTokenType();

  const response = await safeFetch(`${API_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseErrors(response));
  }

  return response.json();
}

export async function logoutRequest(): Promise<void> {
  const token = authStorage.getAccessToken();
  const tokenType = authStorage.getTokenType();

  const response = await safeFetch(`${API_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    throw new Error(await parseErrors(response));
  }
}
