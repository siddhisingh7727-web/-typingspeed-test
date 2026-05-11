import { useState, useRef, useCallback } from 'react';

export const useCountdown = (initialSeconds) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const start = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isRunning]);

  const reset = useCallback((newSeconds = initialSeconds) => {
    clearInterval(timerRef.current);
    setTimeLeft(newSeconds);
    setIsRunning(false);
  }, [initialSeconds]);

  const getElapsed = useCallback(() => {
    if (!startTimeRef.current) return 0;
    return Math.floor((Date.now() - startTimeRef.current) / 1000);
  }, []);

  return { timeLeft, isRunning, start, reset, getElapsed };
};
