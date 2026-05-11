export default function ResultsCard({ stats, userName, onRestart }) {
  const { wpm, accuracy, correctChars, incorrectChars, totalChars, timeTaken } = stats;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <p className="text-white/70 text-sm uppercase tracking-wider mb-2 drop-shadow-md">Test Complete</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{userName}</h2>
        </div>

        <div className="bg-bg-card backdrop-blur-md border border-border-subtle rounded-2xl p-8 shadow-xl">
          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-accent mb-1">{wpm}</p>
              <p className="text-text-secondary text-sm uppercase tracking-wider">WPM</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-success mb-1">{accuracy}%</p>
              <p className="text-text-secondary text-sm uppercase tracking-wider">Accuracy</p>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-border-subtle pt-6 grid grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <p className="text-xl font-semibold text-text-primary">{correctChars}</p>
              <p className="text-text-muted text-xs mt-1">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-error">{incorrectChars}</p>
              <p className="text-text-muted text-xs mt-1">Incorrect</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-text-primary">{totalChars}</p>
              <p className="text-text-muted text-xs mt-1">Typed</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-text-primary">{formatTime(timeTaken)}</p>
              <p className="text-text-muted text-xs mt-1">Time</p>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="w-full bg-accent text-white font-semibold rounded-xl px-4 py-3 hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
