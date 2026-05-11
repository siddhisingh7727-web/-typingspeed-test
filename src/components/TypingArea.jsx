import { useRef, useEffect } from 'react';

export default function TypingArea({
  paragraph,
  userInput,
  onInputChange,
  elapsed,
  isActive,
  isFinished,
  onQuit,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && !isFinished) {
      textareaRef.current.focus();
    }
  }, [isFinished]);

  const handleContainerClick = () => {
    if (textareaRef.current && !isFinished) {
      textareaRef.current.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderParagraph = () => {
    return paragraph.split('').map((char, index) => {
      let charClass = 'text-[#8a6a5a]';

      if (index < userInput.length) {
        if (userInput[index] === char) {
          charClass = 'text-[#1a4d3a]';
        } else {
          charClass = 'text-[#8b0000] underline decoration-wavy';
        }
      } else if (index === userInput.length) {
        charClass = 'text-[#2d1f1a] bg-accent-dim';
      }

      return (
        <span key={index} className={charClass}>
          {char === ' ' ? ' ' : char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Timer + Quit */}
        <div className="flex items-center justify-between mb-8">
          <div />
          <div className="text-5xl font-mono font-bold text-white drop-shadow-lg">
            {formatTime(elapsed)}
          </div>
          <button
            onClick={onQuit}
            disabled={isFinished}
            className="bg-white text-[#2d1f1a] hover:bg-[#c0392b] hover:text-white border-2 border-white/80 hover:border-[#c0392b] font-bold text-base rounded-2xl px-7 py-3.5 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_30px_rgba(192,57,43,0.5)] hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-[#2d1f1a]"
          >
            I Quit
          </button>
        </div>

        {/* Typing Area */}
        <div
          onClick={handleContainerClick}
          className="relative bg-bg-card backdrop-blur-md border border-border-subtle rounded-2xl p-6 md:p-8 mb-6 shadow-xl min-h-[200px]"
        >
          {/* Rendered text underneath */}
          <div className="font-mono text-lg md:text-xl leading-relaxed break-words select-none">
            {renderParagraph()}
          </div>

          {/* Transparent textarea overlay */}
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            disabled={isFinished}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent resize-none border-0 p-6 md:p-8 font-mono text-lg md:text-xl leading-relaxed focus:outline-none cursor-text"
          />
        </div>

        {/* Progress */}
        <div className="w-full bg-bg-input rounded-full h-2 overflow-hidden">
          <div
            className="bg-accent h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min((userInput.length / paragraph.length) * 100, 100)}%`,
            }}
          />
        </div>

        <p className="text-white/70 text-sm text-center mt-3 drop-shadow-md">
          {userInput.length} / {paragraph.length} characters
          {!isActive && !isFinished && (
            <span className="ml-2">- Click and start typing</span>
          )}
        </p>
      </div>
    </div>
  );
}
