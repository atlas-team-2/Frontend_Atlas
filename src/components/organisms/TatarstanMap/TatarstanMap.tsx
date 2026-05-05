import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import './TatarstanMap.css';

type ThemeMode = 'light' | 'dark';

interface EthnicityData {
  tatars: number;
  russians: number;
  chuvash?: number;
  udmurt?: number;
  mordva?: number;
  mari?: number;
}

interface RegionInfo {
  id: string;
  name: string;
  population: number;
  ethnicity: EthnicityData;
  cities: string[];
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CityInfo {
  id: string;
  name: string;
  population: number;
  regionId: string;
  x: number;
  y: number;
  labelDx?: number;
  labelDy?: number;
}

interface Props {
  className?: string;
  onRegionClick?: (regionId: string) => void;
  highlightedRegions?: string[];
  highlightColor?: string;
  initialTheme?: ThemeMode;
  showControls?: boolean;
  title?: string;
}

const mapImage = '/tatarstan-map.webp';

const REGIONS: RegionInfo[] = [
  {
    id: 'kazan-agglomeration',
    name: 'Казанская агломерация',
    population: 1800000,
    ethnicity: {
      tatars: 52.8,
      russians: 42.1,
      chuvash: 1.8,
      udmurt: 0.5,
      mordva: 0.4,
      mari: 0.4,
    },
    cities: ['Казань', 'Зеленодольск'],
    x: 24,
    y: 34,
    width: 22,
    height: 18,
  },
  {
    id: 'predvolzhye',
    name: 'Предволжье',
    population: 620000,
    ethnicity: {
      tatars: 55.1,
      russians: 37.2,
      chuvash: 2.4,
      mari: 2.0,
    },
    cities: ['Зеленодольск', 'Буинск'],
    x: 8,
    y: 22,
    width: 25,
    height: 24,
  },
  {
    id: 'prikamye',
    name: 'Прикамье',
    population: 1450000,
    ethnicity: {
      tatars: 50.4,
      russians: 43.7,
      chuvash: 2.1,
      udmurt: 1.1,
    },
    cities: ['Набережные Челны', 'Нижнекамск', 'Елабуга', 'Актаныш'],
    x: 54,
    y: 16,
    width: 34,
    height: 26,
  },
  {
    id: 'zakamye',
    name: 'Закамье',
    population: 980000,
    ethnicity: {
      tatars: 58.5,
      russians: 35.2,
      chuvash: 2.8,
      udmurt: 1.2,
    },
    cities: ['Альметьевск', 'Бугульма', 'Нурлат'],
    x: 52,
    y: 42,
    width: 28,
    height: 28,
  },
  {
    id: 'central-tatarstan',
    name: 'Центральный регион',
    population: 840000,
    ethnicity: {
      tatars: 61.2,
      russians: 34.5,
      mari: 2.1,
    },
    cities: ['Арск', 'Чистополь'],
    x: 35,
    y: 20,
    width: 22,
    height: 24,
  },
];

const CITIES: CityInfo[] = [
  {
    id: 'kazan',
    name: 'Казань',
    population: 1257000,
    regionId: 'kazan-agglomeration',
    x: 33.8,
    y: 39.8,
    labelDx: -8,
    labelDy: -14,
  },
  {
    id: 'zelenodolsk',
    name: 'Зеленодольск',
    population: 99900,
    regionId: 'predvolzhye',
    x: 16.8,
    y: 46.2,
    labelDx: -70,
    labelDy: -8,
  },
  {
    id: 'arsk',
    name: 'Арск',
    population: 18500,
    regionId: 'central-tatarstan',
    x: 44.0,
    y: 28.8,
    labelDx: 6,
    labelDy: -10,
  },
  {
    id: 'chistopol',
    name: 'Чистополь',
    population: 59500,
    regionId: 'central-tatarstan',
    x: 48.8,
    y: 43.2,
    labelDx: 8,
    labelDy: -8,
  },
  {
    id: 'naberezhnye-chelny',
    name: 'Набережные Челны',
    population: 534000,
    regionId: 'prikamye',
    x: 71.6,
    y: 40.4,
    labelDx: 8,
    labelDy: -10,
  },
  {
    id: 'nizhnekamsk',
    name: 'Нижнекамск',
    population: 238000,
    regionId: 'prikamye',
    x: 69.6,
    y: 43.8,
    labelDx: 8,
    labelDy: -2,
  },
  {
    id: 'elabuga',
    name: 'Елабуга',
    population: 73300,
    regionId: 'prikamye',
    x: 66.2,
    y: 34.8,
    labelDx: 8,
    labelDy: -10,
  },
  {
    id: 'aktanysh',
    name: 'Актаныш',
    population: 13500,
    regionId: 'prikamye',
    x: 81.2,
    y: 29.0,
    labelDx: 8,
    labelDy: -10,
  },
  {
    id: 'almetyevsk',
    name: 'Альметьевск',
    population: 163000,
    regionId: 'zakamye',
    x: 69.0,
    y: 53.2,
    labelDx: 8,
    labelDy: -10,
  },
  {
    id: 'bugulma',
    name: 'Бугульма',
    population: 82000,
    regionId: 'zakamye',
    x: 72.4,
    y: 59.4,
    labelDx: 8,
    labelDy: -8,
  },
  {
    id: 'nurlat',
    name: 'Нурлат',
    population: 32600,
    regionId: 'zakamye',
    x: 58.2,
    y: 57.8,
    labelDx: 8,
    labelDy: -8,
  },
  {
    id: 'buinsk',
    name: 'Буинск',
    population: 22200,
    regionId: 'predvolzhye',
    x: 30.2,
    y: 51.0,
    labelDx: 8,
    labelDy: -8,
  },
];

const REGION_DETAILS: Record<string, RegionInfo> = Object.fromEntries(
  REGIONS.map((region) => [region.id, region])
);
const CITY_DETAILS: Record<string, CityInfo> = Object.fromEntries(
  CITIES.map((city) => [city.id, city])
);

const formatPopulation = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

const TatarstanMap: React.FC<Props> = ({
  className = '',
  onRegionClick,
  highlightedRegions = [],
  highlightColor,
  initialTheme = 'light',
  showControls = true,
  title = 'Карта Татарстана',
}) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('kazan-agglomeration');
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  const normalizedHighlightIds = useMemo(() => new Set(highlightedRegions), [highlightedRegions]);
  const mapStyle = highlightColor
    ? ({ '--highlight-color': highlightColor } as CSSProperties)
    : undefined;

  useEffect(() => {
    const firstHighlightedRegion = highlightedRegions.find((regionId) => REGION_DETAILS[regionId]);

    if (firstHighlightedRegion) {
      setSelectedRegionId(firstHighlightedRegion);
    }
  }, [highlightedRegions]);

  const activeRegionId = hoveredRegionId || selectedRegionId;
  const activeCityId = hoveredCityId || selectedCityId;

  const activeRegion = useMemo(
    () => (activeRegionId ? REGION_DETAILS[activeRegionId] : null),
    [activeRegionId]
  );
  const activeCity = useMemo(
    () => (activeCityId ? CITY_DETAILS[activeCityId] : null),
    [activeCityId]
  );

  const infoRegion = useMemo(() => {
    if (activeCity) return REGION_DETAILS[activeCity.regionId];
    return activeRegion;
  }, [activeCity, activeRegion]);

  const handleRegionClick = (regionId: string) => {
    setSelectedCityId(null);
    setSelectedRegionId(regionId);
    onRegionClick?.(regionId);
  };

  const handleCityClick = (cityId: string) => {
    const city = CITY_DETAILS[cityId];
    setSelectedCityId(cityId);
    setSelectedRegionId(city.regionId);
    onRegionClick?.(city.regionId);
  };

  return (
    <div className={`tatarstan-map-v2 tatarstan-map-v2--${theme} ${className}`} style={mapStyle}>
      <div className="tatarstan-map-v2__header">
        <h3 className="tatarstan-map-v2__title">{title}</h3>
        {showControls && (
          <div className="tatarstan-map-v2__theme-switcher">
            <button
              className={theme === 'light' ? 'is-active' : ''}
              onClick={() => setTheme('light')}
            >
              ☀
            </button>
            <button
              className={theme === 'dark' ? 'is-active' : ''}
              onClick={() => setTheme('dark')}
            >
              ☾
            </button>
          </div>
        )}
      </div>

      <div className="tatarstan-map-v2__layout">
        <div className="tatarstan-map-v2__map-card">
          <div className="tatarstan-map-v2__map-area">
            <img
              src={mapImage}
              alt="Карта Татарстана"
              className="tatarstan-map-v2__image"
              draggable={false}
            />

            <div className="tatarstan-map-v2__regions">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  className={`tatarstan-map-v2__region-hotspot ${selectedRegionId === region.id ? 'is-selected' : ''} ${normalizedHighlightIds.has(region.id) ? 'is-highlighted' : ''}`}
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    width: `${region.width}%`,
                    height: `${region.height}%`,
                  }}
                  onClick={() => handleRegionClick(region.id)}
                  onMouseEnter={() => setHoveredRegionId(region.id)}
                  onMouseLeave={() => setHoveredRegionId(null)}
                />
              ))}
            </div>

            <div className="tatarstan-map-v2__cities">
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  className={`tatarstan-map-v2__city ${selectedCityId === city.id ? 'is-active' : ''}`}
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  onClick={() => handleCityClick(city.id)}
                  onMouseEnter={() => setHoveredCityId(city.id)}
                  onMouseLeave={() => setHoveredCityId(null)}
                >
                  <span className="tatarstan-map-v2__city-dot" />
                  <span
                    className="tatarstan-map-v2__city-label"
                    style={{
                      transform: `translate(${city.labelDx || 0}px, ${city.labelDy || 0}px)`,
                    }}
                  >
                    {city.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="tatarstan-map-v2__sidebar">
          <div className="tatarstan-map-v2__panel">
            <h4>Информация</h4>
            {infoRegion ? (
              <>
                <div className="tatarstan-map-v2__section">
                  <div className="tatarstan-map-v2__region-name">{infoRegion.name}</div>
                  <div className="tatarstan-map-v2__row">
                    <span>Население:</span>
                    <strong>{formatPopulation(infoRegion.population)}</strong>
                  </div>
                </div>

                <div className="tatarstan-map-v2__section">
                  <div className="tatarstan-map-v2__subtitle">Этнический состав</div>
                  <ul className="tatarstan-map-v2__list">
                    <li>Татары: {infoRegion.ethnicity.tatars}%</li>
                    <li>Русские: {infoRegion.ethnicity.russians}%</li>
                    {infoRegion.ethnicity.chuvash && (
                      <li>Чуваши: {infoRegion.ethnicity.chuvash}%</li>
                    )}
                    {infoRegion.ethnicity.udmurt && (
                      <li>Удмурты: {infoRegion.ethnicity.udmurt}%</li>
                    )}
                  </ul>
                </div>

                <div className="tatarstan-map-v2__section">
                  <div className="tatarstan-map-v2__subtitle">Города</div>
                  <div className="tatarstan-map-v2__text">{infoRegion.cities.join(', ')}</div>
                </div>

                {activeCity && (
                  <div className="tatarstan-map-v2__section">
                    <div className="tatarstan-map-v2__subtitle">Выбранный город</div>
                    <div className="tatarstan-map-v2__row">
                      <span>{activeCity.name}</span>
                      <strong>{formatPopulation(activeCity.population)}</strong>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="tatarstan-map-v2__empty">Выберите регион или город на карте</div>
            )}
          </div>

          {highlightedRegions.length > 0 && (
            <div className="tatarstan-map-v2__panel tatarstan-map-v2__highlight-note">
              <div className="tatarstan-map-v2__subtitle">Зоны расселения выбранного народа</div>
              <div className="tatarstan-map-v2__text">
                {highlightedRegions
                  .map((regionId) => REGION_DETAILS[regionId]?.name)
                  .filter(Boolean)
                  .join(', ')}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default TatarstanMap;
