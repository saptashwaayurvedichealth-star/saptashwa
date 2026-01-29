'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  end,
  duration = 2.5,
  decimals = 0,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setCount(0); // Reset to 0 when animation starts
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      setCount(end);
      return;
    }

    const steps = 60;
    const stepDuration = (duration * 1000) / steps;
    const increment = end / steps;
    let current = 0;
    let stepCount = 0;

    animationRef.current = setInterval(() => {
      stepCount++;
      current += increment;
      
      if (stepCount >= steps) {
        setCount(end);
        if (animationRef.current) {
          clearInterval(animationRef.current);
        }
      } else {
        setCount(parseFloat(current.toFixed(decimals)));
      }
    }, stepDuration);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [hasStarted, end, duration, decimals]);

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
