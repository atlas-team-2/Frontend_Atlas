import { safeFetch } from '@/client/api/http';
import { authStorage } from '@/client/api/auth-storage';
import { MOCK_NATIONS, MOCK_NATION_DETAILS, MOCK_COMMENTS } from './nations.mock';

const API_URL = process.env.REACT_APP_API_URL || '';
const USE_NATIONS_MOCKS = process.env.REACT_APP_USE_NATIONS_MOCKS === 'true';

function getAuthHeaders(): HeadersInit {
  const authHeader = authStorage.getAuthHeader();

  return authHeader
    ? {
        Authorization: authHeader,
      }
    : {};
}

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
  user_id?: string;
  author_name?: string;
  text: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  moderation_note?: string | null;
}

interface ListResponse<T> {
  items: T[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}
type ApiErrorDetail = {
  msg?: string;
  message?: string;
};

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data?.detail === 'string') {
      return data.detail;
    }

    if (typeof data?.message === 'string') {
      return data.message;
    }

    if (Array.isArray(data?.detail)) {
      return data.detail
        .map((item: ApiErrorDetail) => item.msg || item.message || 'Ошибка')
        .join(', ');
    }

    return 'Произошла ошибка';
  } catch {
    return 'Произошла ошибка';
  }
}

function parseListResponse<T>(data: ListResponse<T> | T[]): T[] {
  if (Array.isArray(data)) {
    return data;
  }

  return data.items || [];
}

export async function getNations(search = ''): Promise<Nation[]> {
  if (USE_NATIONS_MOCKS) {
    const filtered = MOCK_NATIONS.filter((n) =>
      n.name.toLowerCase().includes(search.toLowerCase())
    );

    return Promise.resolve(filtered);
  }

  const query = new URLSearchParams({
    page: '1',
    page_size: '100',
    sort_by: 'name',
    sort_order: 'asc',
  });

  if (search.trim()) {
    query.set('search', search.trim());
  }

  const response = await safeFetch(`${API_URL}/api/v1/nations/?${query.toString()}`, {
    headers: {
      ...getAuthHeaders(),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Nation> | Nation[] = await response.json();
  return parseListResponse<Nation>(data);
}

export async function getNationById(nationId: string): Promise<NationDetails> {
  if (USE_NATIONS_MOCKS) {
    const data = MOCK_NATION_DETAILS[nationId] || MOCK_NATION_DETAILS.tatar;
    return Promise.resolve(data);
  }

  const response = await safeFetch(`${API_URL}/api/v1/nations/${nationId}`, {
    headers: {
      ...getAuthHeaders(),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function getNationInfo(nationId: string): Promise<NationInfo> {
  if (USE_NATIONS_MOCKS) {
    const data = MOCK_NATION_DETAILS[nationId]?.info || MOCK_NATION_DETAILS.tatar.info!;

    return Promise.resolve(data);
  }

  const response = await safeFetch(`${API_URL}/api/v1/nations/${nationId}/info`, {
    headers: {
      ...getAuthHeaders(),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function getSettlementZones(nationId: string): Promise<SettlementZone[]> {
  if (USE_NATIONS_MOCKS) {
    const data = MOCK_NATION_DETAILS[nationId]?.settlement_zones || [];
    return Promise.resolve(data);
  }

  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/settlement-zones?page=1&page_size=100`,
    {
      headers: {
        ...getAuthHeaders(),
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<SettlementZone> | SettlementZone[] = await response.json();
  return parseListResponse<SettlementZone>(data);
}

export async function getNationCostumes(nationId: string): Promise<Costume[]> {
  if (USE_NATIONS_MOCKS) {
    const data = MOCK_NATION_DETAILS[nationId]?.costumes || [];
    return Promise.resolve(data);
  }

  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/costumes?page=1&page_size=20`,
    {
      headers: {
        ...getAuthHeaders(),
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Costume> | Costume[] = await response.json();
  return parseListResponse<Costume>(data);
}

export async function getNationGames(nationId: string): Promise<Game[]> {
  if (USE_NATIONS_MOCKS) {
    const data = MOCK_NATION_DETAILS[nationId]?.games || [];
    return Promise.resolve(data);
  }

  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/games?page=1&page_size=20`,
    {
      headers: {
        ...getAuthHeaders(),
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Game> | Game[] = await response.json();
  return parseListResponse<Game>(data);
}

export async function getNationComments(nationId: string): Promise<Comment[]> {
  if (USE_NATIONS_MOCKS) {
    const data = MOCK_COMMENTS[nationId] || [];
    return Promise.resolve(data);
  }

  const response = await safeFetch(
    `${API_URL}/api/v1/nations/${nationId}/comments?page=1&page_size=20&sort_by=created_at&sort_order=desc`,
    {
      headers: {
        ...getAuthHeaders(),
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data: ListResponse<Comment> | Comment[] = await response.json();
  return parseListResponse<Comment>(data);
}

export async function createNationComment(
  nationId: string,
  text: string,
  authorName: string
): Promise<Comment> {
  if (USE_NATIONS_MOCKS) {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      nation_id: nationId,
      author_name: authorName,
      text,
      created_at: new Date().toISOString(),
      status: 'approved',
    };

    MOCK_COMMENTS[nationId] = [newComment, ...(MOCK_COMMENTS[nationId] || [])];

    return Promise.resolve(newComment);
  }

  const response = await safeFetch(`${API_URL}/api/v1/nations/${nationId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    credentials: 'include',
    body: JSON.stringify({
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}
