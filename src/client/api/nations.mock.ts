import { Nation, NationDetails, Comment, Game } from './nations';

const createMockGames = (nationId: string): Game[] => [
  {
    id: `${nationId}-dish-game`,
    nation_id: nationId,
    type: 'dish',
    title: 'Угадай блюдо',
    description: 'Игра по национальной кухне народа',
    is_active: false,
    status: 'published',
  },
  {
    id: `${nationId}-holiday-game`,
    nation_id: nationId,
    type: 'holiday',
    title: 'Угадай праздник',
    description: 'Игра по народным праздникам и традициям',
    is_active: false,
    status: 'published',
  },
  {
    id: `${nationId}-ornament-game`,
    nation_id: nationId,
    type: 'ornament',
    title: 'Угадай орнамент',
    description: 'Игра на распознавание национального орнамента',
    is_active: true,
    status: 'published',
  },
];

export const MOCK_NATIONS: Nation[] = [
  {
    id: 'tatar',
    name: 'Татары',
    slug: 'tatar',
    population: 5310649,
    image_url: '/tatarstan-map.png',
    status: 'published',
  },
  {
    id: 'russian',
    name: 'Русские',
    slug: 'russian',
    population: 111016896,
    image_url: '/tatarstan-map.png',
    status: 'published',
  },
  {
    id: 'bashkir',
    name: 'Башкиры',
    slug: 'bashkir',
    population: 1584554,
    image_url: '/tatarstan-map.png',
    status: 'published',
  },
  {
    id: 'chuvash',
    name: 'Чуваши',
    slug: 'chuvash',
    population: 1435872,
    image_url: '/tatarstan-map.png',
    status: 'published',
  },
];

export const MOCK_NATION_DETAILS: Record<string, NationDetails> = {
  tatar: {
    id: 'tatar',
    name: 'Татары',
    slug: 'tatar',
    population: 5310649,
    image_url: '/tatarstan-map.png',
    status: 'published',
    info: {
      nation_id: 'tatar',
      origin: 'Тюркское происхождение, ведут историю от Волжской Булгарии.',
      self_name: 'Татарлар',
      language: 'Татарский (кыпчакская группа)',
      religion: 'Ислам суннитского толка',
      facts: 'Второй по численности народ в РФ. Центр культуры — Казань.',
      status: 'published',
    },
    settlement_zones: [
      {
        id: 'z1',
        nation_id: 'tatar',
        region_name: 'Казань, центральные районы и Закамье',
        polygon_data: { regionId: 'tatar_zone' },
        color: '#2e7d32',
        status: 'published',
      },
    ],
    costumes: [],
    games: createMockGames('tatar'),
    comments_count: 1,
  },

  russian: {
    id: 'russian',
    name: 'Русские',
    slug: 'russian',
    population: 111016896,
    image_url: '/tatarstan-map.png',
    status: 'published',
    info: {
      nation_id: 'russian',
      origin: 'Восточнославянские племена.',
      self_name: 'Русские',
      language: 'Русский (славянская группа)',
      religion: 'Православие',
      facts: 'Самый многочисленный народ страны.',
      status: 'published',
    },
    settlement_zones: [
      {
        id: 'z2',
        nation_id: 'russian',
        region_name: 'Казанская агломерация и Предволжье',
        polygon_data: { regionId: 'west_zone' },
        color: '#1565c0',
        status: 'published',
      },
    ],
    costumes: [],
    games: createMockGames('russian'),
    comments_count: 0,
  },

  bashkir: {
    id: 'bashkir',
    name: 'Башкиры',
    slug: 'bashkir',
    population: 1584554,
    image_url: '/tatarstan-map.png',
    status: 'published',
    info: {
      nation_id: 'bashkir',
      origin: 'Тюркский народ, коренное население Южного Урала.',
      self_name: 'Башҡорттар',
      language: 'Башкирский язык',
      religion: 'Ислам суннитского толка',
      facts: 'Славятся своим бортевым медом и искусством игры на курае.',
      status: 'published',
    },
    settlement_zones: [
      {
        id: 'z3',
        nation_id: 'bashkir',
        region_name: 'Восточные и юго-восточные районы Татарстана',
        polygon_data: { regionId: 'east_zone' },
        color: '#d87d2d',
        status: 'published',
      },
    ],
    costumes: [],
    games: createMockGames('bashkir'),
    comments_count: 0,
  },

  chuvash: {
    id: 'chuvash',
    name: 'Чуваши',
    slug: 'chuvash',
    population: 1435872,
    image_url: '/tatarstan-map.png',
    status: 'published',
    info: {
      nation_id: 'chuvash',
      origin: 'Потомки волжских булгар.',
      self_name: 'Чăвашсем',
      language: 'Чувашский язык',
      religion: 'Православие',
      facts: 'Край ста тысяч вышивок.',
      status: 'published',
    },
    settlement_zones: [
      {
        id: 'z4',
        nation_id: 'chuvash',
        region_name: 'Предволжье',
        polygon_data: { regionId: 'predvolzhye' },
        color: '#c62828',
        status: 'published',
      },
    ],
    costumes: [],
    games: createMockGames('chuvash'),
    comments_count: 0,
  },
};

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  tatar: [
    {
      id: 'c1',
      nation_id: 'tatar',
      user_id: 'u1',
      text: 'Классно!',
      created_at: new Date().toISOString(),
      status: 'approved',
    },
  ],
  russian: [],
  bashkir: [],
  chuvash: [],
};
