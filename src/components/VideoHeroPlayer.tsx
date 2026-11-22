import { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

export function VideoHeroPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleStartPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > 0 && video.currentTime < 0.5) {
      video.currentTime = 0;
    }
    video.muted = false;
    setIsMuted(false);
    setHasStarted(true);
    video.play().catch(() => {
      // Fallback if autoplay with sound is blocked by browser policy
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="flex justify-center mb-10">
      <div className="relative flex items-center justify-center">
        {/* Subtle ambient gold-obsidian glow behind smartphone */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[64px] bg-gradient-to-b from-[#c9a84c]/20 via-[#c9a84c]/5 to-transparent blur-2xl pointer-events-none"
        />

        {/* Smartphone outer metallic chassis */}
        <div className="relative w-[275px] sm:w-[305px] md:w-[325px] rounded-[46px] p-[10px] sm:p-[11px] bg-gradient-to-b from-[#3a342a] via-[#1c1a17] to-[#11100e] ring-1 ring-[#c9a84c]/35 shadow-[0_28px_70px_rgba(0,0,0,0.92),0_0_40px_rgba(201,168,76,0.12)]">
          {/* Left side buttons (mute & volume) */}
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-[88px] w-[3px] h-7 rounded-l-sm bg-gradient-to-b from-[#5a5040] via-[#2c2720] to-[#1a1714]"
          />
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-[132px] w-[3px] h-12 rounded-l-sm bg-gradient-to-b from-[#5a5040] via-[#2c2720] to-[#1a1714]"
          />
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-[192px] w-[3px] h-12 rounded-l-sm bg-gradient-to-b from-[#5a5040] via-[#2c2720] to-[#1a1714]"
          />
          {/* Right side power button */}
          <span
            aria-hidden="true"
            className="absolute -right-[3px] top-[148px] w-[3px] h-16 rounded-r-sm bg-gradient-to-b from-[#5a5040] via-[#2c2720] to-[#1a1714]"
          />

          {/* Inner glossy bezel & 9:16 screen */}
          <div className="relative w-full aspect-[9/16] rounded-[36px] overflow-hidden bg-black ring-1 ring-white/10 group">
            {/* Dynamic Island */}
            <div
              aria-hidden="true"
              className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 w-[86px] h-[22px] rounded-full bg-black border border-white/10 shadow-md flex items-center justify-end pr-2.5 pointer-events-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#141926] ring-1 ring-white/15 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#3b5bdb]/50" />
              </span>
            </div>

            {!hasStarted && (
              <div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                role="button"
                tabIndex={0}
                aria-label="Assistir vídeo com som"
                onClick={handleStartPlayback}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStartPlayback();
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/65 group-hover:from-black/35 group-hover:via-black/15 group-hover:to-black/55 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col items-center px-4">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#c9a84c]/40 animate-ping opacity-75" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c9a84c] group-hover:bg-[#f0d78c] text-[#0d0d0d] flex items-center justify-center shadow-2xl shadow-black/90 border-2 border-white/40 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 sm:w-9 sm:h-9 text-[#0d0d0d] fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="mt-5 px-4 py-2 rounded-full bg-black/85 border border-[#c9a84c]/60 backdrop-blur-md flex items-center gap-2 shadow-xl shadow-black/80 group-hover:border-[#c9a84c] transition-all">
                    <Volume2 className="w-4 h-4 text-[#f0d78c] animate-pulse shrink-0" />
                    <span className="text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                      Clique para assistir com som
                    </span>
                  </div>
                </div>

                {/* Home indicator bar when idle */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/35 pointer-events-none"
                />
              </div>
            )}

            {hasStarted && (
              <button
                type="button"
                onClick={handleToggleMute}
                className="absolute top-11 right-3 z-20 bg-black/80 hover:bg-black text-white text-xs px-2.5 py-1.5 rounded-full border border-[#c9a84c]/40 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg"
                title={isMuted ? 'Ativar Som' : 'Silenciar'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#f0d78c]" />
                    <span className="text-[11px] text-[#f0d78c] font-medium">Ativar som</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-[11px] text-white font-medium">Som ativo</span>
                  </>
                )}
              </button>
            )}

            <video
              key="https://i.imgur.com/Uuzo5iP.mp4"
              ref={videoRef}
              controls={hasStarted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover bg-black"
              onPlay={() => setHasStarted(true)}
            >
              <source src="https://i.imgur.com/Uuzo5iP.mp4#t=0.1" type="video/mp4" />
              Seu navegador não suporta a reprodução deste vídeo.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
