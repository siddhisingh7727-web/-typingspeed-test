export const paragraphs = [
  "The journey of a thousand miles begins with a single step. Taking that first step requires courage, determination, and a clear vision of where you want to go. Every great achievement in history started with someone deciding to begin.",
  "Technology is best when it brings people together. In a world that often feels divided, the digital connections we forge can bridge gaps and create communities that span continents. The internet has made the world both larger and smaller.",
  "Creativity is intelligence having fun. When we allow ourselves to play with ideas and explore without fear of judgment, we unlock parts of our minds that remain dormant during routine tasks. Innovation thrives in spaces where curiosity is celebrated.",
  "Success is not final, failure is not fatal. It is the courage to continue that counts. Every setback carries a lesson, and every victory provides momentum. The path to achievement is rarely straight.",
  "In the middle of difficulty lies opportunity. Challenges force us to think differently, to adapt, and to grow. The most innovative solutions often emerge from the constraints that seem most limiting at first glance.",
  "The only way to do great work is to love what you do. Passion fuels persistence, and persistence overcomes obstacles that would stop someone merely going through the motions. Find what excites you and dive deep.",
  "Knowledge speaks, but wisdom listens. In our rush to share opinions and make ourselves heard, we often miss the insights that come from truly understanding others. The best communicators are those who hear what remains unsaid.",
  "Simplicity is the ultimate sophistication. Removing unnecessary complexity reveals the elegant core of any problem. The best designs are those that feel inevitable, as if no other solution could possibly exist.",
  "Your time is limited, so don't waste it living someone else's life. The courage to follow your heart and intuition requires tuning out the noise of external expectations. Trust yourself to know what truly matters.",
  "The future belongs to those who believe in the beauty of their dreams. Imagination is the workshop where tomorrow is built. Hold fast to your visions, even when others cannot yet see what you see.",
  "Change is the law of life. Those who look only to the past or present are certain to miss the future. Adaptability is not just a survival skill but the key to thriving in a world of constant evolution.",
  "It does not matter how slowly you go as long as you do not stop. Consistency compounds over time. Small daily improvements create remarkable results when maintained with patience and discipline.",
  "Everything you've ever wanted is on the other side of fear. The moments that scare us most often precede the greatest growth. Courage is not the absence of fear but the decision to act despite it.",
  "The best time to plant a tree was twenty years ago. The second best time is now. Waiting for perfect conditions means waiting forever. Start where you are, use what you have, and do what you can.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail. Innovation requires venturing beyond the familiar. The pioneers who shape history are those willing to explore uncharted territory.",
];

export const getRandomParagraph = () =>
  paragraphs[Math.floor(Math.random() * paragraphs.length)];
