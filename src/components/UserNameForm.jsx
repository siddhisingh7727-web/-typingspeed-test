import { useState } from 'react';

export default function UserNameForm({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">
          Typing Speed Test
        </h1>
        <p className="text-white/80 text-lg drop-shadow-md">Measure your words per minute</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="bg-bg-card backdrop-blur-md border border-border-subtle rounded-2xl p-8 shadow-xl">
          <label htmlFor="username" className="block text-text-primary text-sm font-medium mb-3">
            Enter your name to begin
          </label>
          <input
            id="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
            className="w-full bg-bg-input border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors mb-4"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-accent text-white font-semibold rounded-xl px-4 py-3 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
