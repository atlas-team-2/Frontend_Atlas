export interface OrnamentGameOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface OrnamentGameQuestion {
  id: string;
  imageUrl: string;
  question: string;
  explanation: string;
  options: OrnamentGameOption[];
}

export const ORNAMENT_GAME_QUESTIONS: OrnamentGameQuestion[] = [
  {
    id: 'ornament-q1',
    imageUrl: '/tatar-flower1.png',
    question: 'Какой мотив чаще всего используется в татарском орнаменте?',
    explanation:
      'В татарском орнаменте часто встречаются растительные мотивы: цветы, листья, бутоны и завитки.',
    options: [
      {
        id: 'q1-o1',
        text: 'Растительный мотив',
        isCorrect: true,
      },
      {
        id: 'q1-o2',
        text: 'Готический мотив',
        isCorrect: false,
      },
      {
        id: 'q1-o3',
        text: 'Скандинавские руны',
        isCorrect: false,
      },
      {
        id: 'q1-o4',
        text: 'Египетские символы',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'ornament-q2',
    imageUrl: '/tatar-tulip1.png',
    question: 'Какой цветок часто встречается в татарских узорах?',
    explanation:
      'Тюльпан — один из узнаваемых растительных образов в татарском декоративном искусстве.',
    options: [
      {
        id: 'q2-o1',
        text: 'Тюльпан',
        isCorrect: true,
      },
      {
        id: 'q2-o2',
        text: 'Кактус',
        isCorrect: false,
      },
      {
        id: 'q2-o3',
        text: 'Лаванда',
        isCorrect: false,
      },
      {
        id: 'q2-o4',
        text: 'Бамбук',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'ornament-q3',
    imageUrl: '/tatar-symmetry1.png',
    question: 'Что характерно для национального орнамента?',
    explanation: 'Для орнамента часто характерны повторяемость, ритм, симметрия и декоративность.',
    options: [
      {
        id: 'q3-o1',
        text: 'Повторяемость элементов',
        isCorrect: true,
      },
      {
        id: 'q3-o2',
        text: 'Случайное расположение деталей',
        isCorrect: false,
      },
      {
        id: 'q3-o3',
        text: 'Только чёрно-белые цвета',
        isCorrect: false,
      },
      {
        id: 'q3-o4',
        text: 'Отсутствие узоров',
        isCorrect: false,
      },
    ],
  },
];
