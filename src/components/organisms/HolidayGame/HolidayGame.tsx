import { useState } from 'react';
import { HOLIDAY_GAME_QUESTIONS } from '@/client/api/holidayGame.mock';
import './HolidayGame.css';

function HolidayGame() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = HOLIDAY_GAME_QUESTIONS[questionIndex];

  if (!question) {
    return (
      <section className="holiday-game">
        <div className="holiday-game__card">
          <h2 className="holiday-game__title">Вопросы не найдены</h2>
          <p className="holiday-game__text">
            Для игры «Угадай праздник» пока не добавлены вопросы.
          </p>
        </div>
      </section>
    );
  }

  const selectedOption = question.options.find((option) => option.id === selectedOptionId);

  function handleSelectOption(optionId: string) {
    if (selectedOptionId !== null) return;

    const currentOption = question.options.find((option) => option.id === optionId);

    if (currentOption?.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOptionId(optionId);
  }

  function handleNextQuestion() {
    const isLastQuestion = questionIndex + 1 >= HOLIDAY_GAME_QUESTIONS.length;

    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }

    setQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOptionId(null);
  }

  function handleRestart() {
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setScore(0);
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <section className="holiday-game">
        <div className="holiday-game__card holiday-game__card--finish">
          <p className="holiday-game__label">Игра завершена</p>

          <h2 className="holiday-game__title">
            Ваш результат: {score} из {HOLIDAY_GAME_QUESTIONS.length}
          </h2>

          <p className="holiday-game__text">
            Вы познакомились с праздниками и традициями народов Татарстана.
          </p>

          <button className="holiday-game__button" type="button" onClick={handleRestart}>
            Пройти ещё раз
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="holiday-game">
      <div className="holiday-game__card">
        <div className="holiday-game__top">
          <p className="holiday-game__label">Угадай праздник</p>

          <span className="holiday-game__counter">
            {questionIndex + 1}/{HOLIDAY_GAME_QUESTIONS.length}
          </span>
        </div>

        <h2 className="holiday-game__title">{question.question}</h2>

        {question.imageUrl && (
          <div className="holiday-game__image-wrap">
            <img
              className="holiday-game__image"
              src={question.imageUrl}
              alt="Изображение праздника"
              width={420}
              height={280}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <div className="holiday-game__options">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const shouldShowCorrect = Boolean(selectedOptionId) && option.isCorrect;
            const shouldShowWrong = isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                type="button"
                className={[
                  'holiday-game__option',
                  shouldShowCorrect ? 'holiday-game__option--correct' : '',
                  shouldShowWrong ? 'holiday-game__option--wrong' : '',
                ].join(' ')}
                onClick={() => handleSelectOption(option.id)}
                disabled={Boolean(selectedOptionId)}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        {selectedOption && (
          <div className="holiday-game__result">
            <strong>{selectedOption.isCorrect ? 'Правильно!' : 'Неправильно'}</strong>

            <p>{question.explanation}</p>

            <button className="holiday-game__button" type="button" onClick={handleNextQuestion}>
              {questionIndex + 1 >= HOLIDAY_GAME_QUESTIONS.length
                ? 'Завершить игру'
                : 'Следующий вопрос'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HolidayGame;
