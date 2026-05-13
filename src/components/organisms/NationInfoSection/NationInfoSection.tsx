import { Costume, NationDetails, NationInfo, SettlementZone } from '@/client/api/nations';
import TatarstanMap from '@/components/organisms/TatarstanMap/TatarstanMap';
import NationInfoCard from '@/components/moleculs/NationInfoCard/NationInfoCard';
import CostumeCard from '@/components/moleculs/CostumeCard/CostumeCard';
import './NationInfoSection.css';

interface NationInfoSectionProps {
  nation: NationDetails;
  nationInfo: NationInfo;
  settlementZones: SettlementZone[];
  maleCostume?: Costume;
  femaleCostume?: Costume;
}

const COSTUME_IMAGES_MAP: Record<string, { photo1: string; photo2: string }> = {
  russian: { photo1: '/russ-costume1.webp', photo2: '/russ-costume2.webp' },
  bashkir: { photo1: '/bashkir-costume1.webp', photo2: '/bashkir-costume2.webp' },
  tatar: { photo1: '/tatar-costume1.webp', photo2: '/tatar-costume2.webp' },
  chuvash: { photo1: '/chuvash-costume1.webp', photo2: '/chuvash-costume2.webp' },
  udmurt: { photo1: '/udmurt-costume1.webp', photo2: '/udmurt-costume2.webp' },
  mordva: { photo1: '/mordva-costume1.webp', photo2: '/mordva-costume2.webp' },
  mari: { photo1: '/mari-costume1.webp', photo2: '/mari-costume2.webp' },
};

function findCostumeImages(slug: string): { photo1: string; photo2: string } {
  const images = COSTUME_IMAGES_MAP[slug];

  if (!images) {
    return { photo1: '', photo2: '' };
  }

  return images;
}

const SETTLEMENT_REGION_ALIASES: Record<string, string[]> = {
  tatar_zone: ['kazan-agglomeration', 'central-tatarstan', 'zakamye'],
  east_zone: ['prikamye', 'zakamye'],
  west_zone: ['predvolzhye', 'kazan-agglomeration'],
};

function getSettlementRegionIds(zones: SettlementZone[]) {
  return Array.from(
    new Set(
      zones.flatMap((zone) => {
        const regionId = zone.polygon_data?.regionId;

        if (typeof regionId !== 'string') {
          return [];
        }

        return SETTLEMENT_REGION_ALIASES[regionId] || [regionId];
      })
    )
  );
}

function NationInfoSection({
  nation,
  nationInfo,
  settlementZones,
  maleCostume,
  femaleCostume,
}: NationInfoSectionProps) {
  const staticImages = findCostumeImages(nation.slug);

  const firstImgSrc = maleCostume?.image_url || staticImages.photo1;
  const secondImgSrc = femaleCostume?.image_url || staticImages.photo2;
  const highlightedRegionIds = getSettlementRegionIds(settlementZones);
  const highlightColor = settlementZones[0]?.color || undefined;

  return (
    <div className="nation-info-section">
      <section className="nation-section">
        <div className="nation-section__header">
          <h2 className="nation-section__title">Карта расселения</h2>
          <p className="nation-section__subtitle">
            Зоны компактного проживания народа в Татарстане
          </p>
        </div>

        <div className="nation-section__content">
          <TatarstanMap
            highlightedRegions={highlightedRegionIds}
            highlightColor={highlightColor}
            title={`Карта расселения: ${nation.name}`}
          />
        </div>
      </section>

      <section className="nation-section">
        <div className="nation-section__header">
          <h2 className="nation-section__title">Краткая справка</h2>
        </div>

        <div className="nation-section__content">
          <div className="nation-info">
            <div className="nation-info__grid">
              <NationInfoCard label="Происхождение" value={nationInfo.origin} />
              <NationInfoCard label="Самоназвание" value={nationInfo.self_name} />
              <NationInfoCard label="Язык" value={nationInfo.language} />
              <NationInfoCard label="Религия" value={nationInfo.religion} />
              <NationInfoCard
                label="Интересные факты"
                value={nationInfo.facts || 'Нет данных'}
                isWide
              />
            </div>
          </div>
        </div>
      </section>

      <section className="nation-section">
        <div className="nation-section__header">
          <h2 className="nation-section__title">Национальные костюмы</h2>
        </div>

        <div className="nation-section__content">
          <div className="costumes-unified-card">
            <div className="costumes-unified-card__display">
              <CostumeCard
                imageSrc={firstImgSrc}
                alt={`Костюм 1 — ${nationInfo.self_name}`}
                placeholder="Нет фото 1"
              />

              <CostumeCard
                imageSrc={secondImgSrc}
                alt={`Костюм 2 — ${nationInfo.self_name}`}
                placeholder="Нет фото 2"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NationInfoSection;
