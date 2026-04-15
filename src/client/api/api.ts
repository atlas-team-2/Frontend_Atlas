import { authStorage } from '@/client/api/auth-storage';
require('dotenv').config();

export interface User {
  id: string;
  email: string;
  password: string;
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
const API_URL = process.env.API_URL || 'http://localhost:8000/';

async function parseErrors(error: Error): Promise<string> {
  try {
    const data = await error.json();
    return data?.message || 'Unable to parse the response';
  } catch {
    return 'Sorry, it Some mistake';
  }
}
export async function registerRequest(payload: {
  email: string;
  password: string;
  display_name?: string | null;
}): Promise<User> {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      contentType: 'application/json',
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
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(await parseErrors(response));
  }
  return response.json();
}
//TODO: getMeRequesr, logoutRequest, AuthProvider, useAuth, ProtectedRoute,  ScopeGuard,
