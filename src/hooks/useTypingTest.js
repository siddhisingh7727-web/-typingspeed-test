import { useState, useCallback, useRef, useEffect } from 'react';
import { getRandomParagraph } from '../data/paragraphs';
import { calculateWPM, calculateAccuracy } from '../utils/calculateStats';

export const useTypingTest = () => {
  const [paragraph, setParagraph] = useState(() => getRandomParagraph());
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    timeTaken: 0,
  });

  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const isFinishedRef = useRef(false);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const finishTest = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(true);

    const now = Date.now();
    const timeTaken = startTimeRef.current
      ? Math.max(1, Math.floor((now - startTimeRef.current) / 1000))
      : 1;

    const totalTyped = userInput.length;
    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < totalTyped; i++) {
      if (i < paragraph.length && userInput[i] === paragraph[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    setElapsed(timeTaken);
    setStats({
      wpm: calculateWPM(correct, timeTaken),
      accuracy: calculateAccuracy(correct, totalTyped),
      correctChars: correct,
      incorrectChars: incorrect,
      totalChars: totalTyped,
      timeTaken,
    });
  }, [userInput, paragraph]);

  const startTimer = useCallback(() => {
    if (isFinishedRef.current) return;
    setIsActive(true);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsed(seconds);
      }
    }, 1000);
  }, []);

  const handleInput = useCallback(
    (value) => {
      if (isFinishedRef.current) return;

      // Start timer on first character
      if (!isActive && value.length > 0) {
        startTimer();
      }

      // Finish if paragraph is fully typed
      if (value.length >= paragraph.length && !isFinishedRef.current) {
        setUserInput(value);
        finishTest();
        return;
      }

      setUserInput(value);
    },
    [isActive, paragraph, startTimer, finishTest]
  );

  const quit = useCallback(() => {
    if (isFinishedRef.current) return;
    finishTest();
  }, [finishTest]);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    isFinishedRef.current = false;
    setParagraph(getRandomParagraph());
    setUserInput('');
    setIsActive(false);
    setIsFinished(false);
    setElapsed(0);
    setStats({
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      timeTaken: 0,
    });
    startTimeRef.current = null;
  }, []);

  return {
    paragraph,
    userInput,
    isActive,
    isFinished,
    elapsed,
    stats,
    handleInput,
    quit,
    reset,
  };
};
