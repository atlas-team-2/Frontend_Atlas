import { Costume, NationInfo, SettlementZone } from '@/client/api/nations';

interface NationInfoSectionProps {
  nationInfo: NationInfo;
  settlementZones: SettlementZone[];
  maleCostume?: Costume;
  femaleCostume?: Costume;
}

function NationInfoSection({
  nationInfo,
  settlementZones,
  maleCostume,
  femaleCostume,
}: NationInfoSectionProps) {
  return (
    <>
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
    </>
  );
}

export default NationInfoSection;
