import { authStorage } from '@/client/api/auth-storage';
import { safeFetch } from '@/client/api/http';

export interface User {
  id: string;
  email: string;
  display_name?: string | null;
  created_at: string;
  scopes?: string[];
}

export interface TokenPair {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrors(response));
  }

  return response.json();
}

export async function getMeRequest(): Promise<User> {
  const authHeader = authStorage.getAuthHeader();

  const response = await safeFetch(`${API_URL}/api/v1/auth/me`, {
    headers: authHeader
      ? {
          Authorization: authHeader,
        }
      : {},
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(await parseErrors(response));
  }

  return response.json();
}

export async function logoutRequest(): Promise<void> {
  const authHeader = authStorage.getAuthHeader();

  const response = await safeFetch(`${API_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: authHeader
      ? {
          Authorization: authHeader,
        }
      : {},
    credentials: 'include',
  });

  if (!response.ok && response.status !== 204) {
    throw new Error(await parseErrors(response));
  }
}
