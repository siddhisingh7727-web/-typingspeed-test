export default function TimerSelector({ userName, onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-10">
        <p className="text-white/70 text-sm uppercase tracking-wider mb-2 drop-shadow-md">Ready to type</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{userName}</h2>
      </div>

      <div className="bg-bg-card backdrop-blur-md border border-border-subtle rounded-2xl p-8 shadow-xl w-full max-w-md">
        <p className="text-text-secondary text-center mb-6 leading-relaxed">
          A random paragraph will appear. Start typing and the timer will begin automatically.
          Finish the paragraph or press "I Quit" to see your results.
        </p>

        <button
          onClick={onStart}
          className="w-full bg-accent text-white font-semibold rounded-xl px-4 py-3 hover:opacity-90 transition-opacity"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
