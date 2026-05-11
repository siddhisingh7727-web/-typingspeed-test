import { useState, useEffect } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import UserNameForm from './components/UserNameForm';
import TimerSelector from './components/TimerSelector';
import TypingArea from './components/TypingArea';
import ResultsCard from './components/ResultsCard';
import { useTypingTest } from './hooks/useTypingTest';

export default function App() {
  const [screen, setScreen] = useState('name'); // 'name' | 'config' | 'test' | 'results'
  const [userName, setUserName] = useState('');

  const {
    paragraph,
    userInput,
    isActive,
    isFinished,
    elapsed,
    stats,
    handleInput,
    quit,
    reset,
  } = useTypingTest();

  const handleNameSubmit = (name) => {
    setUserName(name);
    setScreen('config');
  };

  const handleStartTest = () => {
    setScreen('test');
  };

  const handleRestart = () => {
    reset();
    setScreen('config');
  };

  // Transition to results when test finishes
  useEffect(() => {
    if (screen === 'test' && isFinished) {
      setScreen('results');
    }
  }, [screen, isFinished]);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        {screen === 'name' && (
          <UserNameForm onSubmit={handleNameSubmit} />
        )}

        {screen === 'config' && (
          <TimerSelector
            userName={userName}
            onStart={handleStartTest}
          />
        )}

        {screen === 'test' && (
          <TypingArea
            paragraph={paragraph}
            userInput={userInput}
            onInputChange={handleInput}
            elapsed={elapsed}
            isActive={isActive}
            isFinished={isFinished}
            onQuit={quit}
          />
        )}

        {screen === 'results' && (
          <ResultsCard
            stats={stats}
            userName={userName}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
