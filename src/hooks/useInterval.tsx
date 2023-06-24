import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(); // 최근에 들어온 callback을 저장할 ref

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current && savedCallback.current(); // tick이 실행되면 callback 함수를 실행
    };
    if (delay !== null) {
      // 만약 delay가 null이 아니라면
      const id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행
      return () => clearInterval(id); // unmount될 때 clearInterval
    }
  }, [delay]); // delay가 바뀔 때마다 새로 실행
};
