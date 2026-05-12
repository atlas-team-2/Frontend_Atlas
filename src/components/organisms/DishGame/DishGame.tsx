import { useState } from 'react';
import { DISH_GAME_QUESTIONS } from '@/client/api/dishGame.mock';
import './DishGame.css';

function DishGame() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = DISH_GAME_QUESTIONS[questionIndex];

  if (!question) {
    return (
      <section className="dish-game">
        <div className="dish-game__card">
          <h2 className="dish-game__title">Вопросы не найдены</h2>
          <p className="dish-game__text">Для игры «Угадай блюдо» пока не добавлены вопросы.</p>
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
    const isLastQuestion = questionIndex + 1 >= DISH_GAME_QUESTIONS.length;

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
      <section className="dish-game">
        <div className="dish-game__card dish-game__card--finish">
          <p className="dish-game__label">Игра завершена</p>

          <h2 className="dish-game__title">
            Ваш результат: {score} из {DISH_GAME_QUESTIONS.length}
          </h2>

          <p className="dish-game__text">
            Вы познакомились с традиционными блюдами народов Татарстана.
          </p>

          <button className="dish-game__button" type="button" onClick={handleRestart}>
            Пройти ещё раз
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="dish-game">
      <div className="dish-game__card">
        <div className="dish-game__top">
          <p className="dish-game__label">Угадай блюдо</p>

          <span className="dish-game__counter">
            {questionIndex + 1}/{DISH_GAME_QUESTIONS.length}
          </span>
        </div>

        <h2 className="dish-game__title">{question.question}</h2>

        {question.imageUrl && (
          <div className="dish-game__image-wrap">
            <img
              className="dish-game__image"
              src={question.imageUrl}
              alt="Изображение блюда"
              width={420}
              height={280}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <div className="dish-game__options">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const shouldShowCorrect = Boolean(selectedOptionId) && option.isCorrect;
            const shouldShowWrong = isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                type="button"
                className={[
                  'dish-game__option',
                  shouldShowCorrect ? 'dish-game__option--correct' : '',
                  shouldShowWrong ? 'dish-game__option--wrong' : '',
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
          <div className="dish-game__result">
            <strong>{selectedOption.isCorrect ? 'Правильно!' : 'Неправильно'}</strong>

            <p>{question.explanation}</p>

            <button className="dish-game__button" type="button" onClick={handleNextQuestion}>
              {questionIndex + 1 >= DISH_GAME_QUESTIONS.length
                ? 'Завершить игру'
                : 'Следующий вопрос'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DishGame;
