import { useState } from 'react';
import { ORNAMENT_GAME_QUESTIONS } from '@/client/api/ornamentGame.mock';
import './OrnamentGame.css';

function OrnamentGame() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = ORNAMENT_GAME_QUESTIONS[questionIndex];

  if (!question) {
    return (
      <section className="ornament-game">
        <div className="ornament-game__card">
          <h2 className="ornament-game__title">Вопросы не найдены</h2>
          <p className="ornament-game__text">
            Для игры «Угадай орнамент» пока не добавлены вопросы.
          </p>
        </div>
      </section>
    );
  }

  const selectedOption = question.options.find((option) => option.id === selectedOptionId);

  function handleSelectOption(optionId: string) {
    if (selectedOptionId) return;

    const currentOption = question.options.find((option) => option.id === optionId);

    if (currentOption?.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setSelectedOptionId(optionId);
  }

  function handleNextQuestion() {
    const isLastQuestion = questionIndex + 1 >= ORNAMENT_GAME_QUESTIONS.length;

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
      <section className="ornament-game">
        <div className="ornament-game__card ornament-game__card--finish">
          <p className="ornament-game__label">Игра завершена</p>

          <h2 className="ornament-game__title">
            Ваш результат: {score} из {ORNAMENT_GAME_QUESTIONS.length}
          </h2>

          <p className="ornament-game__text">
            Вы познакомились с элементами национального орнамента.
          </p>

          <button className="ornament-game__button" type="button" onClick={handleRestart}>
            Пройти ещё раз
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="ornament-game">
      <div className="ornament-game__card">
        <div className="ornament-game__top">
          <p className="ornament-game__label">Угадай орнамент</p>

          <span className="ornament-game__counter">
            {questionIndex + 1}/{ORNAMENT_GAME_QUESTIONS.length}
          </span>
        </div>

        <h2 className="ornament-game__title">{question.question}</h2>

        {question.imageUrl && (
          <div className="ornament-game__image-wrap">
            <img
              className="ornament-game__image"
              src={question.imageUrl}
              alt="Изображение орнамента"
            />
          </div>
        )}

        <div className="ornament-game__options">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const shouldShowCorrect = Boolean(selectedOptionId) && option.isCorrect;
            const shouldShowWrong = isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                type="button"
                className={[
                  'ornament-game__option',
                  shouldShowCorrect ? 'ornament-game__option--correct' : '',
                  shouldShowWrong ? 'ornament-game__option--wrong' : '',
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
          <div className="ornament-game__result">
            <strong>{selectedOption.isCorrect ? 'Правильно!' : 'Неправильно'}</strong>

            <p>{question.explanation}</p>

            <button className="ornament-game__button" type="button" onClick={handleNextQuestion}>
              {questionIndex + 1 >= ORNAMENT_GAME_QUESTIONS.length
                ? 'Завершить игру'
                : 'Следующий вопрос'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrnamentGame;
