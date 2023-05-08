import React from 'react';

function iAmSpeed() {
  // eslint-disable-next-line no-empty
  for (let i = 0; i < 100000000; i++) {}
}

function useSomeMemory() {
  React.useMemo(() => new Array(1e6).fill(123), []);
}

export default function useCount(initial: number): [number, () => void] {
  const [count, setCount] = React.useState(initial);

  iAmSpeed();

  const increment = React.useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  React.useEffect(() => {
    if (count === 7) {
      throw new Error('sorry my friend 7 is not supported :(');
    }
  }, [count]);

  useSomeMemory();

  React.useEffect(() => {
    if (count === 9) {
      // @ts-ignore trust me bro
      global.foo.bar();
    }
  }, [count]);

  return [count, increment];
}
