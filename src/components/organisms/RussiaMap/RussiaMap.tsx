import { KeyboardEventHandler, useCallback, useRef, useState } from 'react';
import './RussiaMap.css';

type RussiaMapProps = {
  onTatarstanClick?: () => void;
  isActive?: boolean;
};

type Phase = 'idle' | 'zooming' | 'detail';

const RussiaMap = ({ onTatarstanClick, isActive = false }: RussiaMapProps) => {
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const tatarstanCenter = { x: 192, y: 500 };
  const zoomed = phase === 'zooming' || phase === 'detail';

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const handleMouseLeave = () => {
    clearTimer();
    setHovered(false);
    setPhase('idle');
  };

  const handleClick = () => {
    if (phase !== 'idle') return;
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
        className={`russia-map-card ${isActive ? 'active' : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="russia-map-glow" />

        <div
          className="russia-map-frame"
          style={{
            transform: zoomed ? 'scale(4)' : 'scale(1)',
            opacity: zoomed ? 0 : 1,
          }}
        >
          <div className="russia-map-decor russia-map-decor--blue" />
          <div className="russia-map-decor russia-map-decor--gold" />
          <div className="russia-map-decor russia-map-decor--green" />
          <img
            src="/russia-map-photo.png"
            alt="Карта России с выделенным Татарстаном"
            className="russia-map-image"
            draggable={false}
          />

          <svg
            viewBox="0 0 1050 645"
            className="russia-map-overlay"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2E8B57" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#2E8B57" stopOpacity="0" />
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
              aria-label="Открыть Татарстан"
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

              {hovered && phase === 'idle' && (
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
            opacity: phase === 'detail' ? 1 : 0,
          }}
        >
          <img
            src="/tatarstan-map.png"
            alt="Карта Татарстана"
            className="tatarstan-detail-image"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default RussiaMap;
