const ACCESS_TOKEN_KEY = 'atlas_access_token';
const TOKEN_TYPE_KEY = 'atlas_token_type';
const SCOPES_KEY = 'atlas_scopes';

export interface AuthTokenData {
  access_token: string;
  token_type: string;
  scope: string;
}

export const authStorage = {
  setToken(data: AuthTokenData): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    localStorage.setItem(TOKEN_TYPE_KEY, data.token_type);
    localStorage.setItem(SCOPES_KEY, data.scope);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getTokenType(): string {
    return localStorage.getItem(TOKEN_TYPE_KEY) || 'Bearer';
  },

  getAuthHeader(): string | null {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const tokenType = localStorage.getItem(TOKEN_TYPE_KEY) || 'Bearer';

    if (!accessToken) {
      return null;
    }

    return `${tokenType} ${accessToken}`;
  },

  getScope(): string[] {
    const scope = localStorage.getItem(SCOPES_KEY);
    return scope ? scope.split(' ').filter(Boolean) : [];
  },

  hasScope(requiredScope: string): boolean {
    return this.getScope().includes(requiredScope);
  },

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_TYPE_KEY);
    localStorage.removeItem(SCOPES_KEY);
  },
};
