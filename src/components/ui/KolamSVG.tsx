/**
 * Kolam SVG — Geometrically accurate dot-grid based kolam pattern.
 * Kolam is a sacred South Indian / Sri Lankan Tamil art form drawn
 * at thresholds to invite auspiciousness. This SVG uses 8-fold
 * symmetry with connecting loops, true to the traditional form.
 */

interface KolamSVGProps {
    size?: number;
    color?: string;
    className?: string;
    strokeWidth?: number;
}

export function KolamSVG({
    size = 200,
    color = "hsl(42, 85%, 58%)",
    className = "",
    strokeWidth = 1.5,
}: KolamSVGProps) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.42;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
            role="presentation"
        >
            {/* Outer ring */}
            <circle
                cx={cx}
                cy={cy}
                r={r}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray="4 3"
                opacity={0.4}
            />

            {/* Mid ring */}
            <circle
                cx={cx}
                cy={cy}
                r={r * 0.7}
                stroke={color}
                strokeWidth={strokeWidth}
                opacity={0.5}
            />

            {/* Inner ring */}
            <circle
                cx={cx}
                cy={cy}
                r={r * 0.35}
                stroke={color}
                strokeWidth={strokeWidth}
                opacity={0.6}
            />

            {/* 8-petal lotus outlines */}
            {Array.from({ length: 8 }, (_, i) => {
                const angle = (i * Math.PI) / 4;
                const petalLength = r * 0.65;
                const controlOffset = r * 0.28;
                const x1 = cx + Math.cos(angle - 0.35) * r * 0.35;
                const y1 = cy + Math.sin(angle - 0.35) * r * 0.35;
                const x2 = cx + Math.cos(angle + 0.35) * r * 0.35;
                const y2 = cy + Math.sin(angle + 0.35) * r * 0.35;
                const cpx = cx + Math.cos(angle) * petalLength;
                const cpy = cy + Math.sin(angle) * petalLength;
                const cp1x = cx + Math.cos(angle - 0.6) * controlOffset;
                const cp1y = cy + Math.sin(angle - 0.6) * controlOffset;
                const cp2x = cx + Math.cos(angle + 0.6) * controlOffset;
                const cp2y = cy + Math.sin(angle + 0.6) * controlOffset;
                return (
                    <path
                        key={`petal-${i}`}
                        d={`M ${cp1x} ${cp1y} Q ${x1} ${y1} ${cpx} ${cpy} Q ${x2} ${y2} ${cp2x} ${cp2y}`}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        opacity={0.7}
                    />
                );
            })}

            {/* 8 cardinal spoke lines */}
            {Array.from({ length: 8 }, (_, i) => {
                const angle = (i * Math.PI) / 4;
                const x1 = cx + Math.cos(angle) * r * 0.35;
                const y1 = cy + Math.sin(angle) * r * 0.35;
                const x2 = cx + Math.cos(angle) * r * 0.7;
                const y2 = cy + Math.sin(angle) * r * 0.7;
                return (
                    <line
                        key={`spoke-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={color}
                        strokeWidth={strokeWidth * 0.8}
                        opacity={0.5}
                    />
                );
            })}

            {/* 8 diagonal connector arcs between rings */}
            {Array.from({ length: 8 }, (_, i) => {
                const angle1 = (i * Math.PI) / 4;
                const angle2 = ((i + 1) * Math.PI) / 4;
                const x1 = cx + Math.cos(angle1) * r * 0.7;
                const y1 = cy + Math.sin(angle1) * r * 0.7;
                const x2 = cx + Math.cos(angle2) * r * 0.7;
                const y2 = cy + Math.sin(angle2) * r * 0.7;
                const cpx = cx + Math.cos((angle1 + angle2) / 2) * r * 0.85;
                const cpy = cy + Math.sin((angle1 + angle2) / 2) * r * 0.85;
                return (
                    <path
                        key={`arc-${i}`}
                        d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`}
                        stroke={color}
                        strokeWidth={strokeWidth * 0.7}
                        fill="none"
                        opacity={0.4}
                    />
                );
            })}

            {/* 4 diagonal cross lines */}
            {Array.from({ length: 4 }, (_, i) => {
                const angle = (i * Math.PI) / 4 + Math.PI / 8;
                const x1 = cx + Math.cos(angle) * r * 0.68;
                const y1 = cy + Math.sin(angle) * r * 0.68;
                const x2 = cx - Math.cos(angle) * r * 0.68;
                const y2 = cy - Math.sin(angle) * r * 0.68;
                return (
                    <line
                        key={`cross-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={color}
                        strokeWidth={strokeWidth * 0.5}
                        opacity={0.2}
                    />
                );
            })}

            {/* Centre dot */}
            <circle cx={cx} cy={cy} r={strokeWidth * 1.5} fill={color} opacity={0.9} />

            {/* 8 mid-ring dots */}
            {Array.from({ length: 8 }, (_, i) => {
                const angle = (i * Math.PI) / 4;
                return (
                    <circle
                        key={`dot-mid-${i}`}
                        cx={cx + Math.cos(angle) * r * 0.7}
                        cy={cy + Math.sin(angle) * r * 0.7}
                        r={strokeWidth}
                        fill={color}
                        opacity={0.6}
                    />
                );
            })}
        </svg>
    );
}

export default KolamSVG;
