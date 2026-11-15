import { useEffect, useRef, useState } from 'react';

// "99%" / "1+" / "35%" jaisi value ko 0 se count-up karta hai (jab screen par aaye)
const Counter = ({ value, duration = 1600 }) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(target === null ? 0 : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === null) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setN(target);
      return undefined;
    }
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  if (target === null) return <span>{value}</span>;
  return <span ref={ref}>{n}{suffix}</span>;
};

export default Counter;
