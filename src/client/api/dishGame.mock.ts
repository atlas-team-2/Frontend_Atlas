export interface GameOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface GameQuestion {
  id: string;
  question: string;
  imageUrl?: string;
  options: GameOption[];
  explanation: string;
}

export const DISH_GAME_QUESTIONS: GameQuestion[] = [
  {
    id: 'dish-1',
    question: 'Как называется татарское блюдо треугольной формы с мясом, картофелем и луком?',
    imageUrl: '/games/echpochmak.jpg',
    options: [
      { id: 'b', text: 'Чак-чак', isCorrect: false },
      { id: 'c', text: 'Кыстыбый', isCorrect: false },
      { id: 'a', text: 'Эчпочмак', isCorrect: true },
      { id: 'd', text: 'Токмач', isCorrect: false },
    ],
    explanation:
      'Эчпочмак — одно из самых известных татарских блюд. Его легко узнать по треугольной форме и начинке из мяса, картофеля и лука.',
  },
  {
    id: 'dish-2',
    question: 'Какое сладкое блюдо из кусочков теста с мёдом часто готовят на праздники и свадьбы?',
    imageUrl: '/games/chak-chak.jpg',
    options: [
      { id: 'a', text: 'Губадия', isCorrect: false },
      { id: 'b', text: 'Чак-чак', isCorrect: true },
      { id: 'c', text: 'Бэлеш', isCorrect: false },
      { id: 'd', text: 'Перемяч', isCorrect: false },
    ],
    explanation:
      'Чак-чак — сладкое блюдо из обжаренных кусочков теста, соединённых мёдом. Его часто подают на праздниках, свадьбах и семейных торжествах.',
  },
  {
    id: 'dish-3',
    question: 'Как называется тонкая лепёшка с картофельной начинкой или кашей?',
    imageUrl: '/games/kystyby.jpg',
    options: [
      { id: 'b', text: 'Казылык', isCorrect: false },
      { id: 'c', text: 'Баурсак', isCorrect: false },
      { id: 'd', text: 'Кош теле', isCorrect: false },
      { id: 'a', text: 'Кыстыбый', isCorrect: true },
    ],
    explanation:
      'Кыстыбый — это лепёшка, которую обычно складывают пополам и наполняют картофельным пюре или кашей.',
  },
  {
    id: 'dish-4',
    question: 'Как называется большой пирог с мясом, картофелем и бульоном внутри?',
    imageUrl: '/games/belesh.jpg',
    options: [
      { id: 'a', text: 'Чак-чак', isCorrect: false },
      { id: 'b', text: 'Бэлеш', isCorrect: true },
      { id: 'c', text: 'Катык', isCorrect: false },
      { id: 'd', text: 'Талкыш калеве', isCorrect: false },
    ],
    explanation:
      'Бэлеш — сытный пирог с мясной начинкой. Большой бэлеш часто готовят для семьи или гостей.',
  },
  {
    id: 'dish-5',
    question: 'Как называется многослойный татарский пирог с рисом, яйцом, изюмом и кортом?',
    imageUrl: '/games/gubadia.jpg',
    options: [
      { id: 'a', text: 'Губадия', isCorrect: true },
      { id: 'b', text: 'Эчпочмак', isCorrect: false },
      { id: 'c', text: 'Токмач', isCorrect: false },
      { id: 'd', text: 'Перемяч', isCorrect: false },
    ],
    explanation:
      'Губадия — праздничный многослойный пирог. В нём могут быть рис, яйца, изюм и корт — особый творожный продукт.',
  },
  {
    id: 'dish-6',
    question: 'Как называется домашняя лапша или суп с тонкой лапшой?',
    imageUrl: '/games/tokmach.jpg',
    options: [
      { id: 'a', text: 'Токмач', isCorrect: true },
      { id: 'b', text: 'Баурсак', isCorrect: false },
      { id: 'c', text: 'Кош теле', isCorrect: false },
      { id: 'd', text: 'Чак-чак', isCorrect: false },
    ],
    explanation:
      'Токмач — это домашняя лапша. Часто так называют суп с тонкой лапшой, который готовят в семейной кухне.',
  },
  {
    id: 'dish-7',
    question:
      'Какой продукт часто используют в губадии и делают из творога, высушенного или уваренного до коричневатого оттенка?',
    imageUrl: '/games/kort.jpg',
    options: [
      { id: 'b', text: 'Катык', isCorrect: false },
      { id: 'c', text: 'Айран', isCorrect: false },
      { id: 'a', text: 'Корт', isCorrect: true },
      { id: 'd', text: 'Мёд', isCorrect: false },
    ],
    explanation:
      'Корт — традиционный творожный продукт. Его часто используют в татарской выпечке, особенно в губадии.',
  },
  {
    id: 'dish-8',
    question: 'Как называется небольшой жареный пирожок с мясной начинкой, часто круглой формы?',
    imageUrl: '/games/peremyach.jpg',
    options: [
      { id: 'a', text: 'Перемяч', isCorrect: true },
      { id: 'b', text: 'Кыстыбый', isCorrect: false },
      { id: 'c', text: 'Губадия', isCorrect: false },
      { id: 'd', text: 'Талкыш калеве', isCorrect: false },
    ],
    explanation:
      'Перемяч — жареный пирожок с мясной начинкой. Он похож на небольшой открытый или полуоткрытый мясной пирожок.',
  },
  {
    id: 'dish-9',
    question:
      'Как называется хрустящее сладкое изделие из тонко раскатанного теста, которое переводят как «птичий язык»?',
    imageUrl: '/games/koshtele.jpg',
    options: [
      { id: 'b', text: 'Баурсак', isCorrect: false },
      { id: 'a', text: 'Кош теле', isCorrect: true },
      { id: 'c', text: 'Бэлеш', isCorrect: false },
      { id: 'd', text: 'Токмач', isCorrect: false },
    ],
    explanation:
      'Кош теле — тонкое хрустящее сладкое изделие из теста. Название часто переводят как «птичий язык».',
  },
  {
    id: 'dish-10',
    question: 'Как называется традиционная колбаса или мясной деликатес из конины?',
    imageUrl: '/games/kazylyk.jpg',
    options: [
      { id: 'b', text: 'Чак-чак', isCorrect: false },
      { id: 'c', text: 'Кош теле', isCorrect: false },
      { id: 'd', text: 'Катык', isCorrect: false },
      { id: 'a', text: 'Казылык', isCorrect: true },
    ],
    explanation:
      'Казылык — мясной деликатес, который обычно связывают с традиционной кухней тюркских народов.',
  },
];
