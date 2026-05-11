import { useScreenSize } from '../hooks/useScreenSize';
import PixelTrail from './PixelTrail';
import GooeyFilter from './GooeyFilter';

export default function AnimatedBackground() {
  const screenSize = useScreenSize();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sunset sky image background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/sky.jpg)' }}
      />

      {/* Warm overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-purple-900/20" />

      {/* Gooey warm pixel trail overlay */}
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        className="absolute inset-0 z-0"
        style={{ filter: 'url(#gooey-filter-pixel-trail)' }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 20 : 28}
          fadeDuration={1200}
          delay={100}
          pixelClassName="bg-orange-300 rounded-sm"
        />
      </div>
    </div>
  );
}
