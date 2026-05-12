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

export const HOLIDAY_GAME_QUESTIONS: GameQuestion[] = [
  {
    id: 'holiday-1',
    question: 'Как называется праздник плуга, который связан с окончанием весенних полевых работ?',
    imageUrl: '/games/sabantuy.webp',
    options: [
      { id: 'b', text: 'Навруз', isCorrect: false },
      { id: 'a', text: 'Сабантуй', isCorrect: true },
      { id: 'c', text: 'Масленица', isCorrect: false },
      { id: 'd', text: 'Каравон', isCorrect: false },
    ],
    explanation:
      'Сабантуй — один из самых известных праздников Татарстана. Он связан с землёй, трудом, народными играми и состязаниями.',
  },
  {
    id: 'holiday-2',
    question:
      'Какой праздник связан с приходом весны, обновлением природы и началом нового жизненного цикла?',
    imageUrl: '/games/navruz.jpg',
    options: [
      { id: 'a', text: 'Навруз', isCorrect: true },
      { id: 'b', text: 'Курбан-байрам', isCorrect: false },
      { id: 'c', text: 'Питрау', isCorrect: false },
      { id: 'd', text: 'Рождество', isCorrect: false },
    ],
    explanation:
      'Навруз — праздник весны и обновления. Его отмечают многие народы, связывая с пробуждением природы.',
  },
  {
    id: 'holiday-3',
    question: 'Какой праздник отмечают после завершения месяца Рамадан?',
    imageUrl: '/games/uraza.webp',
    options: [
      { id: 'b', text: 'Сабантуй', isCorrect: false },
      { id: 'c', text: 'Масленица', isCorrect: false },
      { id: 'a', text: 'Ураза-байрам', isCorrect: true },
      { id: 'd', text: 'Гербер', isCorrect: false },
    ],
    explanation:
      'Ураза-байрам отмечают после окончания поста в месяц Рамадан. Это праздник благодарности, семьи и добрых дел.',
  },
  {
    id: 'holiday-4',
    question: 'Какой праздник связан с традицией жертвоприношения и помощью нуждающимся?',
    imageUrl: '/games/kurban.webp',
    options: [
      { id: 'b', text: 'Навруз', isCorrect: false },
      { id: 'c', text: 'Каравон', isCorrect: false },
      { id: 'a', text: 'Курбан-байрам', isCorrect: true },
      { id: 'd', text: 'Семык', isCorrect: false },
    ],
    explanation:
      'Курбан-байрам — важный мусульманский праздник, связанный с милосердием, жертвенностью и поддержкой других людей.',
  },
  {
    id: 'holiday-5',
    question: 'Какой праздник обычно связан с проводами зимы, блинами и народными гуляниями?',
    imageUrl: '/games/maslenitsa.webp',
    options: [
      { id: 'a', text: 'Масленица', isCorrect: true },
      { id: 'b', text: 'Сабантуй', isCorrect: false },
      { id: 'c', text: 'Питрау', isCorrect: false },
      { id: 'd', text: 'Акатьуй', isCorrect: false },
    ],
    explanation:
      'Масленица — праздник проводов зимы. Один из самых узнаваемых символов Масленицы — блины.',
  },
  {
    id: 'holiday-6',
    question:
      'Как называется чувашский весенний праздник, связанный с земледелием и началом полевых работ?',
    imageUrl: '/games/akatuy.webp',
    options: [
      { id: 'a', text: 'Акатьуй', isCorrect: true },
      { id: 'b', text: 'Каравон', isCorrect: false },
      { id: 'c', text: 'Ураза-байрам', isCorrect: false },
      { id: 'd', text: 'Нардуган', isCorrect: false },
    ],
    explanation:
      'Акатьуй — традиционный чувашский праздник, связанный с земледельческим календарём, весной и началом работ в поле.',
  },
  {
    id: 'holiday-7',
    question: 'Какой марийский праздник связан с летним циклом, природой и памятью предков?',
    imageUrl: '/games/semyk.jpg',
    options: [
      { id: 'b', text: 'Сабантуй', isCorrect: false },
      { id: 'a', text: 'Семык', isCorrect: true },
      { id: 'c', text: 'Масленица', isCorrect: false },
      { id: 'd', text: 'Курбан-байрам', isCorrect: false },
    ],
    explanation:
      'Семык — один из важных праздников у марийцев. Он связан с природой, семейной памятью и традиционными обрядами.',
  },
  {
    id: 'holiday-8',
    question:
      'Как называется удмуртский праздник, который тоже связан с земледельческими традициями?',
    imageUrl: '/games/gerber.webp',
    options: [
      { id: 'b', text: 'Навруз', isCorrect: false },
      { id: 'c', text: 'Каравон', isCorrect: false },
      { id: 'd', text: 'Рождество', isCorrect: false },
      { id: 'a', text: 'Гербер', isCorrect: true },
    ],
    explanation:
      'Гербер — традиционный праздник удмуртов, связанный с землёй, трудом и календарными обрядами.',
  },
  {
    id: 'holiday-9',
    question:
      'Какой праздник часто связывают с кряшенской культурой, песнями, играми и летними гуляниями?',
    imageUrl: '/games/pitrau.jpg',
    options: [
      { id: 'a', text: 'Питрау', isCorrect: true },
      { id: 'b', text: 'Ураза-байрам', isCorrect: false },
      { id: 'c', text: 'Акатьуй', isCorrect: false },
      { id: 'd', text: 'Масленица', isCorrect: false },
    ],
    explanation:
      'Питрау — традиционный праздник кряшен, который обычно связан с летними гуляниями, песнями, играми и встречами.',
  },
  {
    id: 'holiday-10',
    question:
      'Как называется русский фольклорный праздник в Татарстане, связанный с хороводами и народными песнями?',
    imageUrl: '/games/karavon.webp',
    options: [
      { id: 'b', text: 'Семык', isCorrect: false },
      { id: 'c', text: 'Гербер', isCorrect: false },
      { id: 'a', text: 'Каравон', isCorrect: true },
      { id: 'd', text: 'Навруз', isCorrect: false },
    ],
    explanation:
      'Каравон — известный русский фольклорный праздник в Татарстане. Его связывают с народными песнями, хороводами и традиционной культурой.',
  },
];
