import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

function PeopleListPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { id: routeNationId } = useParams<{ id?: string }>();

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
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [pageError, setPageError] = useState('');

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState('');
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  useEffect(() => {
    void loadNations();
  }, []);

  useEffect(() => {
    if (!routeNationId || routeNationId === selectedNationId) return;
    setSelectedNationId(routeNationId);
  }, [routeNationId, selectedNationId]);

  useEffect(() => {
    if (!selectedNationId) return;
    void loadNationProfile(selectedNationId);
  }, [selectedNationId]);

  async function loadNations() {
    setIsLoadingNations(true);
    try {
      const items = await getNations();
      setNations(items);
      if (items.length > 0 && !selectedNationId) {
        const routeNationExists = routeNationId && items.some((item) => item.id === routeNationId);
        setSelectedNationId(routeNationExists ? routeNationId : items[0].id);
      }
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Ошибка загрузки');
    } finally {
      setIsLoadingNations(false);
    }
  }

  async function loadNationProfile(nationId: string) {
    setIsLoadingProfile(true);
    setIsLoadingComments(true);
    setPageError('');
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
      setPageError('Не удалось загрузить профиль');
    } finally {
      setIsLoadingProfile(false);
      setIsLoadingComments(false);
    }
  }

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedComment = commentText.trim();

    if (!selectedNationId || !trimmedComment) return;

    setIsCommentSubmitting(true);
    setCommentError('');
    setCommentSuccess('');

    try {
      const token = authStorage.getAccessToken() || undefined;

      await createNationComment(selectedNationId, trimmedComment, token);

      setCommentText('');
      setCommentSuccess('Отправлено');

      setIsLoadingComments(true);
      const refreshed = await getNationComments(selectedNationId);
      setComments(refreshed);
    } catch (error) {
      setCommentError(error instanceof Error ? error.message : 'Не удалось отправить комментарий');
    } finally {
      setIsCommentSubmitting(false);
      setIsLoadingComments(false);
    }
  }

  function handleSelectNation(nationId: string) {
    setSelectedNationId(nationId);
    navigate(`/peoples/${nationId}`);
  }

  function normalizeGender(gender: string) {
    const n = gender.toLowerCase();
    if (['male', 'м'].includes(n)) return 'male';
    if (['female', 'ж'].includes(n)) return 'female';
    return null;
  }

  const maleCostume = useMemo(
    () => costumes.find((c) => normalizeGender(c.gender) === 'male'),
    [costumes]
  );
  const femaleCostume = useMemo(
    () => costumes.find((c) => normalizeGender(c.gender) === 'female'),
    [costumes]
  );
  const filteredNations = useMemo(
    () => nations.filter((n) => n.name.toLowerCase().includes(search.toLowerCase())),
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
          onSelectNation={handleSelectNation}
        />

        <main className="nation-profile">
          {pageError && <div className="page-error">{pageError}</div>}

          {isLoadingProfile ? (
            <div className="page-loading">Загрузка...</div>
          ) : (
            selectedNation &&
            nationInfo && (
              <>
                <NationHero nation={selectedNation} nationInfo={nationInfo} />

                <NationInfoSection
                  nation={selectedNation}
                  nationInfo={nationInfo}
                  settlementZones={settlementZones}
                  maleCostume={maleCostume}
                  femaleCostume={femaleCostume}
                />

                <NationGamesSection games={games} />
                <CommentsSection
                  isAuth={isAuth}
                  canWriteComment={isAuth}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  onSubmit={handleCommentSubmit}
                  commentText={commentText}
                  onCommentTextChange={setCommentText}
                  commentError={commentError}
                  commentSuccess={commentSuccess}
                  isCommentSubmitting={isCommentSubmitting}
                />
              </>
            )
          )}
        </main>
      </div>
    </div>
  );
}

export default PeopleListPage;
