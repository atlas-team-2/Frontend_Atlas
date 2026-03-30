import React, {KeyboardEventHandler, MouseEvent, useState} from 'react';
import './RussiaMap.css';
import mapImage from '../../../../../Atlas/src/assets/russia-map-photo.jpg';

type RussiaMapProps = {
    onTatarstanClick: () => {};
    isActive: boolean;


}
const RussiaMap = ({ onTatarstanClick, isActive = false }: RussiaMapProps) => {
    const [hovered, setHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const tatarstanCenter = { x: 192, y: 500 };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * 4;
        const rotateX = (0.5 - py) * 4;

        setTilt({ x: rotateX, y: rotateY });
    };

    const resetTilt = () => {
        setTilt({ x: 0, y: 0 });
    };

    const handleClick = () => {
        if (onTatarstanClick) {
            onTatarstanClick();
        }
    };

    const handleKeyDown:KeyboardEventHandler<SVGElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div className="russia-map-scene">
            <div
                className={`russia-map-card ${isActive ? 'active' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTilt}
                style={{
                    transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
            >
                <div className="russia-map-glow" />

                <div className="russia-map-frame">
                    <img
                        src={mapImage}
                        alt="Карта России с выделенным Татарстаном"
                        className="russia-map-image"
                        draggable="false"
                    />

                    <svg
                        viewBox="0 0 1050 645"
                        className="russia-map-overlay"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
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
                            aria-label="Открыть Татарстан"
                        >
                            <circle
                                cx={tatarstanCenter.x}
                                cy={tatarstanCenter.y}
                                r="34"
                                fill="transparent"
                            />

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

                            {(hovered || isActive) && (
                                <g className="tatarstan-tooltip">
                                    <rect
                                        x={tatarstanCenter.x + 18}
                                        y={tatarstanCenter.y - 46}
                                        width="116"
                                        height="34"
                                        rx="10"
                                    />
                                    <text
                                        x={tatarstanCenter.x + 76}
                                        y={tatarstanCenter.y - 24}
                                        textAnchor="middle"
                                    >
                                        Татарстан
                                    </text>
                                </g>
                            )}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default RussiaMap;