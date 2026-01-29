'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RING_LABELS, PHASE_CONFIG, type Phase } from '@/lib/types';
import { useProgressStore } from '@/lib/progress-store';

interface SpiderWebProps {
  size?: number;
  interactive?: boolean;
  onSegmentClick?: (ring: number, phase: Phase) => void;
}

export function SpiderWeb({ 
  size = 400, 
  interactive = true,
  onSegmentClick 
}: SpiderWebProps) {
  const [hoveredSegment, setHoveredSegment] = useState<{ ring: number; phase: Phase } | null>(null);
  const { currentRing, currentPhase, completedLessons } = useProgressStore();

  const center = size / 2;
  const maxRadius = (size / 2) - 20;
  const ringCount = 6;
  const ringWidth = maxRadius / ringCount;

  const phases = Object.entries(PHASE_CONFIG) as [Phase, typeof PHASE_CONFIG[Phase]][];

  const createArcPath = (
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = center + innerRadius * Math.cos(startRad);
    const y1 = center + innerRadius * Math.sin(startRad);
    const x2 = center + outerRadius * Math.cos(startRad);
    const y2 = center + outerRadius * Math.sin(startRad);
    const x3 = center + outerRadius * Math.cos(endRad);
    const y3 = center + outerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(endRad);
    const y4 = center + innerRadius * Math.sin(endRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}
      Z
    `;
  };

  const segments = useMemo(() => {
    const result: Array<{
      ring: number;
      phase: Phase;
      path: string;
      color: string;
      isCompleted: boolean;
      isCurrent: boolean;
    }> = [];

    for (let ring = 1; ring <= 5; ring++) {
      const innerRadius = ring * ringWidth;
      const outerRadius = (ring + 1) * ringWidth;

      for (const [phase, config] of phases) {
        const path = createArcPath(
          innerRadius,
          outerRadius,
          config.angle.start,
          config.angle.end
        );

        const isCompleted = completedLessons.some(id => 
          id.includes(`ring-${ring}`) && id.includes(phase)
        );

        const isCurrent = ring === currentRing && phase === currentPhase;

        result.push({
          ring,
          phase,
          path,
          color: config.color,
          isCompleted,
          isCurrent,
        });
      }
    }

    return result;
  }, [completedLessons, currentRing, currentPhase, phases, ringWidth, center]);

  const getPhaseColor = (phase: Phase, opacity: number = 1) => {
    const colors = {
      functional: `rgba(34, 197, 94, ${opacity})`,
      navigational: `rgba(59, 130, 246, ${opacity})`,
      maintainer: `rgba(249, 115, 22, ${opacity})`,
      builder: `rgba(168, 85, 247, ${opacity})`,
    };
    return colors[phase];
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {/* Background rings */}
        {Array.from({ length: 6 }, (_, i) => (
          <circle
            key={`ring-bg-${i}`}
            cx={center}
            cy={center}
            r={(i + 1) * ringWidth}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        ))}

        {/* Phase dividers */}
        {phases.map(([, config]) => {
          const angle = ((config.angle.start - 90) * Math.PI) / 180;
          const x = center + maxRadius * Math.cos(angle);
          const y = center + maxRadius * Math.sin(angle);
          return (
            <line
              key={`divider-${config.angle.start}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeWidth={1}
            />
          );
        })}

        {/* Segments */}
        {segments.map(({ ring, phase, path, isCurrent }) => {
          const isHovered = hoveredSegment?.ring === ring && hoveredSegment?.phase === phase;
          const baseOpacity = isCurrent ? 0.7 : 0.3;
          const hoverOpacity = 0.8;

          return (
            <motion.path
              key={`segment-${ring}-${phase}`}
              d={path}
              fill={getPhaseColor(phase, isHovered ? hoverOpacity : baseOpacity)}
              stroke={getPhaseColor(phase, 1)}
              strokeWidth={isCurrent ? 2 : 1}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                fillOpacity: isHovered ? hoverOpacity : baseOpacity,
              }}
              transition={{ 
                delay: ring * 0.05 + phases.findIndex(([p]) => p === phase) * 0.02,
                duration: 0.3,
              }}
              className={cn(
                'origin-center',
                interactive && 'cursor-pointer'
              )}
              onMouseEnter={() => interactive && setHoveredSegment({ ring, phase })}
              onMouseLeave={() => setHoveredSegment(null)}
              onClick={() => interactive && onSegmentClick?.(ring, phase)}
            />
          );
        })}

        {/* Center circle (Markdown) */}
        <motion.circle
          cx={center}
          cy={center}
          r={ringWidth}
          fill="currentColor"
          fillOpacity={0.05}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={1}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        />
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-xs font-medium"
        >
          Start
        </text>

        {/* Current position marker */}
        {currentRing > 0 && (
          <motion.circle
            cx={center + ((currentRing + 0.5) * ringWidth) * Math.cos(((PHASE_CONFIG[currentPhase].angle.start + 45 - 90) * Math.PI) / 180)}
            cy={center + ((currentRing + 0.5) * ringWidth) * Math.sin(((PHASE_CONFIG[currentPhase].angle.start + 45 - 90) * Math.PI) / 180)}
            r={8}
            fill="white"
            stroke={getPhaseColor(currentPhase, 1)}
            strokeWidth={3}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: 'easeInOut'
            }}
          />
        )}
      </svg>

      {/* Hover tooltip */}
      {hoveredSegment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-card border border-border rounded-lg px-4 py-2 shadow-lg"
        >
          <p className="font-semibold text-sm text-card-foreground">
            Ring {hoveredSegment.ring}: {RING_LABELS[hoveredSegment.ring]}
          </p>
          <p className="text-xs text-muted-foreground">
            {PHASE_CONFIG[hoveredSegment.phase].label} Phase
          </p>
        </motion.div>
      )}

      {/* Phase labels */}
      <div className="absolute top-2 right-2 text-xs font-medium text-phase-functional">
        Functional
      </div>
      <div className="absolute bottom-2 right-2 text-xs font-medium text-phase-navigational">
        Navigational
      </div>
      <div className="absolute bottom-2 left-2 text-xs font-medium text-phase-maintainer">
        Maintainer
      </div>
      <div className="absolute top-2 left-2 text-xs font-medium text-phase-builder">
        Builder
      </div>
    </div>
  );
}
