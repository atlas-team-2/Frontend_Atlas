import { KeyboardEventHandler, useCallback, useRef, useState } from 'react';
import './RussiaMap.css';
import TatarstanMap from '../TatarstanMap/TatarstanMap';
import { SettlementZone } from '@/client/api/nations';

type RussiaMapProps = {
  onTatarstanClick?: () => void;
  isActive?: boolean;
  zones?: SettlementZone[];
};

type Phase = 'idle' | 'zooming' | 'detail';

const RussiaMap = ({ onTatarstanClick, isActive = false, zones = [] }: RussiaMapProps) => {
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState<Phase>(zones.length > 0 ? 'detail' : 'idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const tatarstanCenter = { x: 192, y: 500 };

  const isProfile = zones.length > 0;
  const zoomed = isProfile || phase === 'zooming' || phase === 'detail';

  const activeRegionIds = zones.map((z) => (z.polygon_data as any)?.regionId).filter(Boolean);
  const activeColor = zones.length > 0 ? zones[0].color || '#2e7d32' : '#E0E0E0';

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const handleMouseLeave = () => {
    if (isProfile) return;
    clearTimer();
    setHovered(false);
    setPhase('idle');
  };

  const handleClick = () => {
    if (isProfile || phase !== 'idle') return;
    setPhase('zooming');
    clearTimer();
    timerRef.current = setTimeout(() => setPhase('detail'), 800);
    if (onTatarstanClick) {
      onTatarstanClick();
    }
  };

  const handleKeyDown: KeyboardEventHandler<SVGGElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="russia-map-scene">
      <div
        className={`russia-map-card ${isProfile ? 'active' : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="russia-map-glow" />

        <div
          className="russia-map-frame"
          style={{
            transform: zoomed ? 'scale(4)' : 'scale(1)',
            opacity: zoomed ? 0 : 1,
            transition: 'transform 0.8s ease, opacity 0.6s ease',
            visibility: zoomed && phase === 'detail' ? 'hidden' : 'visible',
          }}
        >
          <img
            src="/russia-map-photo.webp"
            alt="Карта России"
            className="russia-map-image"
            draggable={false}
          />

          <svg viewBox="0 0 1050 645" className="russia-map-overlay" preserveAspectRatio="none">
            <defs>
              <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1bc75e" stopOpacity="0.50" />
                <stop offset="100%" stopColor="#1bc75e" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g
              className={`tatarstan-hit-group ${hovered ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <circle cx={tatarstanCenter.x} cy={tatarstanCenter.y} r="34" fill="transparent" />
              <circle
                className="tatarstan-pulse pulse-1"
                cx={tatarstanCenter.x}
                cy={tatarstanCenter.y}
                r="20"
                fill="url(#pulseGradient)"
              />
              <circle
                className="tatarstan-pulse pulse-2"
                cx={tatarstanCenter.x}
                cy={tatarstanCenter.y}
                r="14"
                fill="url(#pulseGradient)"
              />
              <circle
                cx={tatarstanCenter.x}
                cy={tatarstanCenter.y}
                r="6"
                className="tatarstan-center-dot"
              />

              {hovered && !zoomed && (
                <g className="tatarstan-tooltip">
                  <rect
                    x={tatarstanCenter.x + 18}
                    y={tatarstanCenter.y - 46}
                    width="116"
                    height="34"
                    rx="10"
                  />
                  <text x={tatarstanCenter.x + 76} y={tatarstanCenter.y - 24} textAnchor="middle">
                    Татарстан
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>

        <div
          className="tatarstan-detail-wrap"
          style={{
            opacity: zoomed ? 1 : 0,
            pointerEvents: zoomed ? 'all' : 'none',
            transition: 'opacity 0.5s ease',
            display: zoomed ? 'block' : 'none',
          }}
        >
          {isProfile ? (
            <div className="tatarstan-svg-container" style={{ width: '100%', height: '100%' }}>
              <TatarstanMap highlightedRegions={activeRegionIds} highlightColor={activeColor} />
            </div>
          ) : (
            <img
              src="/tatarstan-map.webp"
              alt="Карта Татарстана"
              className="tatarstan-detail-image"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RussiaMap;
