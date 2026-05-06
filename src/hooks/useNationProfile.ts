import { useEffect, useMemo, useState } from 'react';
import {
  Costume,
  Game,
  getNationById,
  getNationCostumes,
  getNationGames,
  getNationInfo,
  getNations,
  getSettlementZones,
  Nation,
  NationDetails,
  NationInfo,
  SettlementZone,
} from '@/client/api/nations';

function normalizeGender(gender: string) {
  const normalizedGender = gender.toLowerCase();

  if (['male', 'м'].includes(normalizedGender)) {
    return 'male';
  }

  if (['female', 'ж'].includes(normalizedGender)) {
    return 'female';
  }

  return null;
}

export function useNationProfile(routeNationId?: string) {
  const [search, setSearch] = useState('');
  const [nations, setNations] = useState<Nation[]>([]);
  const [selectedNationId, setSelectedNationId] = useState<string | null>(null);

  const [selectedNation, setSelectedNation] = useState<NationDetails | null>(null);
  const [nationInfo, setNationInfo] = useState<NationInfo | null>(null);
  const [settlementZones, setSettlementZones] = useState<SettlementZone[]>([]);
  const [costumes, setCostumes] = useState<Costume[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const [isLoadingNations, setIsLoadingNations] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    async function loadNations() {
      setIsLoadingNations(true);
      setPageError('');

      try {
        const items = await getNations();

        setNations(items);

        if (items.length > 0) {
          const routeNationExists = routeNationId
            ? items.some((item) => item.id === routeNationId)
            : false;

          const nextNationId = routeNationExists ? routeNationId! : items[0].id;

          setSelectedNationId((currentNationId) => currentNationId || nextNationId);
        }
      } catch (error) {
        setPageError(error instanceof Error ? error.message : 'Ошибка загрузки');
      } finally {
        setIsLoadingNations(false);
      }
    }

    void loadNations();
  }, [routeNationId]);

  useEffect(() => {
    if (!routeNationId || routeNationId === selectedNationId) {
      return;
    }

    const routeNationExists = nations.some((nation) => nation.id === routeNationId);

    if (routeNationExists) {
      setSelectedNationId(routeNationId);
    }
  }, [routeNationId, selectedNationId, nations]);

  useEffect(() => {
    if (!selectedNationId) {
      return;
    }

    async function loadNationProfile(nationId: string) {
      setIsLoadingProfile(true);
      setPageError('');

      try {
        const [nation, info, zones, nationCostumes, nationGames] = await Promise.all([
          getNationById(nationId),
          getNationInfo(nationId),
          getSettlementZones(nationId),
          getNationCostumes(nationId),
          getNationGames(nationId),
        ]);

        setSelectedNation(nation);
        setNationInfo(info);
        setSettlementZones(zones);
        setCostumes(nationCostumes);
        setGames(nationGames);
      } catch {
        setPageError('Не удалось загрузить профиль');
      } finally {
        setIsLoadingProfile(false);
      }
    }

    void loadNationProfile(selectedNationId);
  }, [selectedNationId]);

  const filteredNations = useMemo(
    () => nations.filter((nation) => nation.name.toLowerCase().includes(search.toLowerCase())),
    [nations, search]
  );

  const maleCostume = useMemo(
    () => costumes.find((costume) => normalizeGender(costume.gender) === 'male'),
    [costumes]
  );

  const femaleCostume = useMemo(
    () => costumes.find((costume) => normalizeGender(costume.gender) === 'female'),
    [costumes]
  );

  return {
    search,
    setSearch,
    nations: filteredNations,
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
  };
}
