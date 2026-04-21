import { safeFetch } from '@/client/api/http';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export interface Nation {
  id: string;
  name: string;
  slug: string;
  population?: number | null;
  image_url?: string | null;
  status?: 'draft' | 'published' | 'archived';
}

export interface NationInfo {
  nation_id: string;
  origin: string;
  self_name: string;
  language: string;
  religion: string;
  facts?: string | null;
  status?: 'draft' | 'published' | 'rejected';
}

export interface NationDetails extends Nation {
  info?: NationInfo;
  settlement_zones?: SettlementZone[];
  costumes?: Costume[];
  games?: Game[];
  comments_count?: number;
}

export interface SettlementZone {
  id: string;
  nation_id: string;
  region_name: string;
  polygon_data: Record<string, unknown>;
  color?: string | null;
  status?: 'draft' | 'published' | 'rejected';
}

export interface Costume {
  id: string;
  nation_id: string;
  gender: string;
  image_url: string;
  description?: string | null;
  status?: 'draft' | 'published' | 'rejected';
}

export interface Game {
  id: string;
  nation_id: string;
  type: string;
  title: string;
  description?: string | null;
  is_active: boolean;
  status?: 'draft' | 'published' | 'archived';
}

export interface Comment {
  id: string;
  nation_id: string;
  user_id: string;
  text: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  moderation_note?: string | null;
}

interface ListResponse<T> {
  items: T[];
  meta: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data?.message || 'Произошла ошибка';
  } catch {
    return 'Произошла ошибка';
  }
}
export async function getNations(search = ''): Promise<Nation[]> {
  const query = new URLSearchParams({
    page: '1',
    page_size: '100',
    sort_by: 'name',
    sort_order: 'asc',
  });

  if (search.trim()) {
    query.set('search', search.trim());
  }

  const response = await safeFetch(`${API_URL}/api/v1/nations?${query.toString()}`);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Nation> = await response.json();
  return data.items;
}

export async function getNationById(nationId: string) {
  const response = await safeFetch(`${API_URL}/api/v1/nations/${nationId}`);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function getNationInfo(nationId: string): Promise<NationInfo> {
  const response = await safeFetch(`${API_URL}/api/v1/nations/${nationId}/info`);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function getSettlementZones(nationId: string): Promise<SettlementZone[]> {
  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/settlement-zones?page=1&page_size=100`
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<SettlementZone> = await response.json();
  return data.items;
}

export async function getNationCostumes(nationId: string): Promise<Costume[]> {
  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/costumes?page=1&page_size=20`
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Costume> = await response.json();
  return data.items;
}

export async function getNationGames(nationId: string): Promise<Game[]> {
  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/games?page=1&page_size=20`
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Game> = await response.json();
  return data.items;
}

export async function getNationComments(nationId: string): Promise<Comment[]> {
  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/comments?page=1&page_size=20&sort_by=created_at&sort_order=desc`
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Comment> = await response.json();
  return data.items;
}

export async function createNationComment(
  nationId: string,
  text: string,
  token?: string
): Promise<Comment> {
  const response = await safeFetch(`${API_URL}/api/v1/nations/${nationId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}
