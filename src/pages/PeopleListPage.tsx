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
  NationDetails,
} from '@/client/api/nations';
import { useAuth } from '@/hooks/useAuth';
import { authStorage } from '@/client/api/auth-storage';
import NationsSidebar from '@/components/organisms/NationSideBar/NationsSidebar';
import NationHero from '@/components/organisms/NationHero/NationHero';
import NationGamesSection from '@/components/organisms/NationGameSection/NationGameSection';
import CommentsSection from '@/components/organisms/CommentsSection/CommentsSection';
import NationInfoSection from '@/components/organisms/NationInfoSection/NationInfoSection';

type SelectedNation = Awaited<ReturnType<typeof getNationById>>;

function PeopleListPage() {
  const { isAuth, hasScope } = useAuth();

  const [search, setSearch] = useState('');
  const [nations, setNations] = useState<Nation[]>([]);
  const [selectedNationId, setSelectedNationId] = useState<string | null>(null);

  const [selectedNation, setSelectedNation] = useState<NationDetails | null>(null);
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
    void loadNations();
  }, []);

  useEffect(() => {
    if (!selectedNationId) return;
    void loadNationProfile(selectedNationId);
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

  function normalizeGender(gender: string): 'male' | 'female' | null {
    const normalized = gender.trim().toLowerCase();

    if (['male', 'man', 'm', 'м', 'муж', 'мужской'].includes(normalized)) {
      return 'male';
    }

    if (['female', 'woman', 'f', 'ж', 'жен', 'женский'].includes(normalized)) {
      return 'female';
    }

    return null;
  }

  const maleCostume = useMemo(
    () => costumes.find((item) => normalizeGender(item.gender) === 'male'),
    [costumes]
  );

  const femaleCostume = useMemo(
    () => costumes.find((item) => normalizeGender(item.gender) === 'female'),
    [costumes]
  );

  const filteredNations = useMemo(
    () => nations.filter((nation) => nation.name.toLowerCase().includes(search.toLowerCase())),
    [nations, search]
  );

  return (
    <div className="nations-page">
      <div className="nations-page__inner">
        <NationsSidebar
          search={search}
          onSearchChange={setSearch}
          nations={filteredNations}
          isLoading={isLoadingNations}
          selectedNationId={selectedNationId}
          onSelectNation={setSelectedNationId}
        />

        <main className="nation-profile">
          {pageError && <div className="page-error">{pageError}</div>}

          {!pageError && isLoadingProfile && (
            <div className="page-loading">Загрузка профиля народа...</div>
          )}

          {!pageError && !isLoadingProfile && selectedNation && nationInfo && (
            <>
              <NationHero nation={selectedNation} nationInfo={nationInfo} />

              <NationInfoSection
                nationInfo={nationInfo}
                settlementZones={settlementZones}
                maleCostume={maleCostume}
                femaleCostume={femaleCostume}
              />

              <NationGamesSection games={games} />

              <CommentsSection
                isAuth={isAuth}
                canWriteComment={hasScope('comment:write')}
                comments={comments}
                commentText={commentText}
                onCommentTextChange={setCommentText}
                onSubmit={handleCommentSubmit}
                commentError={commentError}
                commentSuccess={commentSuccess}
                isCommentSubmitting={isCommentSubmitting}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default PeopleListPage;
