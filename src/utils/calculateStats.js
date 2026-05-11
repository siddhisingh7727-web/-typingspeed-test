export const calculateWPM = (correctChars, timeInSeconds) => {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  const words = correctChars / 5;
  return Math.round(words / minutes);
};

export const calculateAccuracy = (correctChars, totalTyped) => {
  if (totalTyped === 0) return 0;
  return Math.round((correctChars / totalTyped) * 100);
};
