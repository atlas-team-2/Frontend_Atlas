const ACCESS_TOKEN_KEY = 'atlas_access_token';
const REFRESH_TOKEN_KEY = 'atlas_refresh_token';
const TOKEN_TYPE_KEY = 'atlas_token_type';
const SCOPES_KEY = 'atlas_scopes';

export const authStorage = {
  setToken(data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    scope: string;
  }) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
    localStorage.setItem(TOKEN_TYPE_KEY, data.token_type);
    localStorage.setItem(SCOPES_KEY, data.scope);
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getTokenType() {
    return localStorage.getItem(TOKEN_TYPE_KEY) || 'Bearer';
  },

  getScope() {
    const scope = localStorage.getItem(SCOPES_KEY);
    return scope ? scope.split(' ').filter(Boolean) : [];
  },

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_TYPE_KEY);
    localStorage.removeItem(SCOPES_KEY);
  },
};
