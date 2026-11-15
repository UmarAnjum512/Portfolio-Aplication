import { useEffect, useState } from 'react';

// Roles ko type aur delete karta rehta hai
const Typewriter = ({ words }) => {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [text, setText] = useState(reduce ? words[0] : '');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return undefined;
    const word = words[i % words.length];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === '') delay = 350;

    const t = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === '') {
        setDeleting(false);
        return setI((v) => v + 1);
      }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      return undefined;
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, reduce]);

  return (
    <span className="typewriter">
      {text}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
};

export default Typewriter;
