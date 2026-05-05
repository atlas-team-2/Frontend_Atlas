import { useNavigate, useParams } from 'react-router-dom';
import './PeopleListPage.css';
import { useAuth } from '@/hooks/useAuth';
import { useNationProfile } from '@/hooks/useNationProfile';
import { useNationComments } from '@/hooks/useNationComments';
import NationsSidebar from '@/components/organisms/NationSideBar/NationsSidebar';
import NationHero from '@/components/organisms/NationHero/NationHero';
import NationGamesSection from '@/components/organisms/NationGameSection/NationGameSection';
import CommentsSection from '@/components/organisms/CommentsSection/CommentsSection';
import NationInfoSection from '@/components/organisms/NationInfoSection/NationInfoSection';

function PeopleListPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { id: routeNationId } = useParams<{ id?: string }>();

  const {
    search,
    setSearch,
    nations,
    selectedNationId,
    setSelectedNationId,
    selectedNation,
    nationInfo,
    settlementZones,
    games,
    maleCostume,
    femaleCostume,
    isLoadingNations,
    isLoadingProfile,
    pageError,
  } = useNationProfile(routeNationId);

  const {
    comments,
    commentText,
    setCommentText,
    commentError,
    commentSuccess,
    isLoadingComments,
    isCommentSubmitting,
    handleCommentSubmit,
  } = useNationComments(selectedNationId);

  function handleSelectNation(nationId: string) {
    setSelectedNationId(nationId);
    navigate(`/peoples/${nationId}`);
  }

  return (
    <div className="nations-page">
      <div className="nations-page__inner">
        <NationsSidebar
          search={search}
          onSearchChange={setSearch}
          nations={nations}
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
