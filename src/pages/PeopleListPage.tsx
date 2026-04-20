import { FormEvent, useEffect, useMemo, useState } from 'react';
import './PeopleListPage.css';
import {
  Comment,
  Costume,
  Game,
  getNationById,
  getNationComments,
  getNationCostumes,
  getNationGames,
  getNationInfo,
  getNations,
  getSettlementZones,
  Nation,
  NationInfo,
  SettlementZone,
  createNationComment,
} from '@/client/api/nations';
import { useAuth } from '@/hooks/useAuth';
import { authStorage } from '@/client/api/auth-storage';

function PeopleListPage() {
  const { isAuth, hasScope } = useAuth();

  const [search, setSearch] = useState('');
  const [nations, setNations] = useState<Nation[]>([]);
  const [selectedNationId, setSelectedNationId] = useState<string | null>(null);

  const [selectedNation, setSelectedNation] = useState<any>(null);
  const [nationInfo, setNationInfo] = useState<NationInfo | null>(null);
  const [settlementZones, setSettlementZones] = useState<SettlementZone[]>([]);
  const [costumes, setCostumes] = useState<Costume[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoadingNations, setIsLoadingNations] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [pageError, setPageError] = useState('');

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState('');
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  useEffect(() => {
    loadNations();
  }, []);

  useEffect(() => {
    if (!selectedNationId) return;
    loadNationProfile(selectedNationId);
  }, [selectedNationId]);

  async function loadNations() {
    setIsLoadingNations(true);
    setPageError('');

    try {
      const items = await getNations();
      setNations(items);

      if (items.length > 0) {
        setSelectedNationId(items[0].id);
      }
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Не удалось загрузить народы');
    } finally {
      setIsLoadingNations(false);
    }
  }

  async function loadNationProfile(nationId: string) {
    setIsLoadingProfile(true);
    setPageError('');
    setCommentSuccess('');
    setCommentError('');

    try {
      const [nation, info, zones, nationCostumes, nationGames, nationComments] = await Promise.all([
        getNationById(nationId),
        getNationInfo(nationId),
        getSettlementZones(nationId),
        getNationCostumes(nationId),
        getNationGames(nationId),
        getNationComments(nationId),
      ]);

      setSelectedNation(nation);
      setNationInfo(info);
      setSettlementZones(zones);
      setCostumes(nationCostumes);
      setGames(nationGames);
      setComments(nationComments);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Не удалось загрузить профиль народа');
    } finally {
      setIsLoadingProfile(false);
    }
  }

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedNationId) return;

    setCommentError('');
    setCommentSuccess('');

    if (!commentText.trim()) {
      setCommentError('Введите текст комментария');
      return;
    }

    setIsCommentSubmitting(true);

    try {
      const token = authStorage.getAccessToken() || undefined;

      await createNationComment(selectedNationId, commentText.trim(), token);

      setCommentText('');
      setCommentSuccess('Комментарий отправлен на модерацию');
      const refreshedComments = await getNationComments(selectedNationId);
      setComments(refreshedComments);
    } catch (error) {
      setCommentError(error instanceof Error ? error.message : 'Не удалось отправить комментарий');
    } finally {
      setIsCommentSubmitting(false);
    }
  }

  const maleCostume = useMemo(
    () =>
      costumes.find(
        (item) =>
          item.gender.toLowerCase().includes('male') || item.gender.toLowerCase().includes('м')
      ),
    [costumes]
  );

  const femaleCostume = useMemo(
    () =>
      costumes.find(
        (item) =>
          item.gender.toLowerCase().includes('female') || item.gender.toLowerCase().includes('ж')
      ),
    [costumes]
  );

  const filteredNations = useMemo(() => {
    return nations.filter((nation) => nation.name.toLowerCase().includes(search.toLowerCase()));
  }, [nations, search]);

  return (
    <div className="nations-page">
      <div className="nations-page__inner">
        <aside className="nations-sidebar">
          <div className="nations-sidebar__header">
            <h2 className="nations-sidebar__title">Народы Татарстана</h2>
            <p className="nations-sidebar__subtitle">
              Выберите народ, чтобы изучить его визуальный профиль
            </p>
          </div>

          <div className="nations-sidebar__search">
            <input
              className="nations-sidebar__search-input"
              type="text"
              placeholder="Поиск народа..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {isLoadingNations ? (
            <div className="page-loading">Загрузка списка народов...</div>
          ) : (
            <div className="nations-sidebar__list">
              {filteredNations.map((nation) => (
                <button
                  key={nation.id}
                  className={
                    selectedNationId === nation.id
                      ? 'nations-sidebar__item nations-sidebar__item--active'
                      : 'nations-sidebar__item'
                  }
                  onClick={() => setSelectedNationId(nation.id)}
                >
                  <span className="nations-sidebar__item-name">{nation.name}</span>
                  <span className="nations-sidebar__item-meta">{nation.slug}</span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <main className="nation-profile">
          {pageError && <div className="page-error">{pageError}</div>}

          {!pageError && isLoadingProfile && (
            <div className="page-loading">Загрузка профиля народа...</div>
          )}

          {!pageError && !isLoadingProfile && selectedNation && nationInfo && (
            <>
              <section className="nation-profile__hero">
                <h1 className="nation-profile__title">{selectedNation.name}</h1>
                <p className="nation-profile__subtitle">
                  Самоназвание: {nationInfo.self_name || '—'}
                </p>

                <div className="nation-profile__badges">
                  <div className="nation-badge">
                    <span className="nation-badge__label">Язык</span>
                    <span className="nation-badge__value">{nationInfo.language || '—'}</span>
                  </div>

                  <div className="nation-badge">
                    <span className="nation-badge__label">Религия</span>
                    <span className="nation-badge__value">{nationInfo.religion || '—'}</span>
                  </div>

                  <div className="nation-badge">
                    <span className="nation-badge__label">Происхождение</span>
                    <span className="nation-badge__value">{nationInfo.origin || '—'}</span>
                  </div>
                </div>
              </section>

              <section className="nation-section">
                <div className="nation-section__header">
                  <h2 className="nation-section__title">Карта расселения</h2>
                  <p className="nation-section__subtitle">
                    Зоны компактного проживания народа в Татарстане
                  </p>
                </div>

                <div className="nation-section__content">
                  <div className="settlement-map">
                    <div className="settlement-map__card">
                      <div className="settlement-map__canvas">
                        {settlementZones.length > 0 ? (
                          <div className="settlement-zones-list">
                            {settlementZones.map((zone) => (
                              <div key={zone.id} className="settlement-zone-item">
                                <span
                                  className="settlement-zone-item__dot"
                                  style={{ backgroundColor: zone.color || '#2e8b57' }}
                                />
                                <span>{zone.region_name}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span>Нет данных по зонам расселения</span>
                        )}
                      </div>

                      <div className="settlement-map__legend">
                        <div className="settlement-map__legend-item">
                          <span className="settlement-map__legend-dot" />
                          <span>Основные зоны расселения</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="nation-section">
                <div className="nation-section__header">
                  <h2 className="nation-section__title">Краткая справка</h2>
                </div>

                <div className="nation-section__content">
                  <div className="nation-info">
                    <div className="nation-info__grid">
                      <div className="nation-info__card">
                        <div className="nation-info__label">Происхождение</div>
                        <div className="nation-info__value">{nationInfo.origin || '—'}</div>
                      </div>

                      <div className="nation-info__card">
                        <div className="nation-info__label">Самоназвание</div>
                        <div className="nation-info__value">{nationInfo.self_name || '—'}</div>
                      </div>

                      <div className="nation-info__card">
                        <div className="nation-info__label">Язык</div>
                        <div className="nation-info__value">{nationInfo.language || '—'}</div>
                      </div>

                      <div className="nation-info__card">
                        <div className="nation-info__label">Религия</div>
                        <div className="nation-info__value">{nationInfo.religion || '—'}</div>
                      </div>

                      <div className="nation-info__card nation-info__card--wide">
                        <div className="nation-info__label">Интересные факты</div>
                        <div className="nation-info__value">{nationInfo.facts || 'Нет данных'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="nation-section">
                <div className="nation-section__header">
                  <h2 className="nation-section__title">Национальные костюмы</h2>
                </div>

                <div className="nation-section__content">
                  <div className="costumes-block">
                    <div className="costumes-block__grid">
                      <div className="costume-card">
                        {maleCostume ? (
                          <>
                            <img
                              src={maleCostume.image_url}
                              alt="Мужской костюм"
                              className="costume-card__real-image"
                            />
                            <div className="costume-card__body">
                              <h3 className="costume-card__title">Мужской</h3>
                              <p className="costume-card__text">
                                {maleCostume.description || 'Традиционный костюм'}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="costume-card__image">Нет мужского костюма</div>
                            <div className="costume-card__body">
                              <h3 className="costume-card__title">Мужской</h3>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="costume-card">
                        {femaleCostume ? (
                          <>
                            <img
                              src={femaleCostume.image_url}
                              alt="Женский костюм"
                              className="costume-card__real-image"
                            />
                            <div className="costume-card__body">
                              <h3 className="costume-card__title">Женский</h3>
                              <p className="costume-card__text">
                                {femaleCostume.description || 'Традиционный костюм'}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="costume-card__image">Нет женского костюма</div>
                            <div className="costume-card__body">
                              <h3 className="costume-card__title">Женский</h3>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="nation-section">
                <div className="nation-section__header">
                  <h2 className="nation-section__title">Мини-игры</h2>
                </div>

                <div className="nation-section__content">
                  <div className="games-block">
                    <div className="games-block__grid">
                      {games.length > 0 ? (
                        games.map((game) => (
                          <div key={game.id} className="game-card">
                            <div className="game-card__icon">🎮</div>
                            <h3 className="game-card__title">{game.title}</h3>
                            <p className="game-card__text">
                              {game.description || 'Интерактивная игра по культуре народа'}
                            </p>
                            <button className="game-card__button">Играть</button>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="game-card">
                            <div className="game-card__icon">🍲</div>
                            <h3 className="game-card__title">Угадай блюдо</h3>
                            <p className="game-card__text">Скоро будет доступно</p>
                            <button className="game-card__button" disabled>
                              Скоро
                            </button>
                          </div>

                          <div className="game-card">
                            <div className="game-card__icon">🎉</div>
                            <h3 className="game-card__title">Угадай праздник</h3>
                            <p className="game-card__text">Скоро будет доступно</p>
                            <button className="game-card__button" disabled>
                              Скоро
                            </button>
                          </div>

                          <div className="game-card">
                            <div className="game-card__icon">✳️</div>
                            <h3 className="game-card__title">Угадай орнамент</h3>
                            <p className="game-card__text">Скоро будет доступно</p>
                            <button className="game-card__button" disabled>
                              Скоро
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="nation-section">
                <div className="nation-section__header">
                  <h2 className="nation-section__title">Комментарии</h2>
                </div>

                <div className="nation-section__content">
                  <div className="comments-block">
                    {isAuth && hasScope('comment:write') ? (
                      <form className="comments-block__form" onSubmit={handleCommentSubmit}>
                        <textarea
                          className="comments-block__textarea"
                          placeholder="Поделитесь впечатлениями или историей..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />

                        {commentError && <p className="comments-block__error">{commentError}</p>}
                        {commentSuccess && (
                          <p className="comments-block__success">{commentSuccess}</p>
                        )}

                        <div className="comments-block__actions">
                          <p className="comments-block__hint">
                            Комментарий будет опубликован после модерации
                          </p>
                          <button
                            className="comments-block__submit"
                            type="submit"
                            disabled={isCommentSubmitting}
                          >
                            {isCommentSubmitting ? 'Отправка...' : 'Отправить'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="comments-block__login-note">
                        Войдите в аккаунт, чтобы оставить комментарий.
                      </div>
                    )}

                    <div className="comments-list">
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id} className="comment-card">
                            <div className="comment-card__header">
                              <span className="comment-card__author">Пользователь</span>
                              <span className="comment-card__date">
                                {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            <p className="comment-card__text">{comment.text}</p>
                            <span className="comment-card__status">
                              {comment.status === 'approved'
                                ? 'Опубликовано'
                                : comment.status === 'pending'
                                  ? 'На модерации'
                                  : comment.status}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="page-empty">
                          <h3 className="page-empty__title">Комментариев пока нет</h3>
                          <p className="page-empty__text">
                            Станьте первым, кто поделится впечатлениями.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default PeopleListPage;
