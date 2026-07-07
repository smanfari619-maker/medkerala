'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  end: number;
  duration?: number;
}

export default function AnimatedCounter({ end, duration = 2000 }: Props) {
  const start = Math.floor(end * 0.95);
  const [count, setCount] = useState(start);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const range = end - start;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + range * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [end, start, duration]);

  return <>{count.toLocaleString()}</>;
}
