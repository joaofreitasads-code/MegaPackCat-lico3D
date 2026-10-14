import React, { useRef, useState } from 'react';

export const HeroVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      setIsBuffering(true);
      // Guarantee audio is unmuted and at full volume upon user click
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
          })
          .catch((err) => {
            console.warn('Playback with audio attempt:', err);
            // Fallback retry ensuring audio is enabled
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
              videoRef.current.play().finally(() => {
                setIsPlaying(true);
                setIsBuffering(false);
              });
            }
          });
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      className="hero-video"
      style={{ margin: '22px auto 20px', maxWidth: '310px', width: '100%' }}
    >
      <div
        id="vslWrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '9 / 16',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--line)',
          boxShadow: '0 0 26px var(--glow)',
          background: 'rgb(0, 0, 0)',
        }}
      >
        <video
          ref={videoRef}
          id="vsl"
          src="/videos/vsl.mp4"
          poster="/images/vsl-poster.webp"
          playsInline
          preload="metadata"
          controls={isPlaying}
          onClick={handlePause}
          onPlaying={() => {
            setIsPlaying(true);
            setIsBuffering(false);
          }}
          onEnded={() => setIsPlaying(false)}
          style={{
            position: 'absolute',
            inset: '0px',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#000',
          }}
        >
          <source src="/videos/vsl.mp4" type="video/mp4" />
          Seu navegador não suporta reprodução de vídeo.
        </video>

        {!isPlaying && (
          <button
            type="button"
            id="vslPlay"
            aria-label="Assistir ao vídeo com som"
            onClick={handlePlay}
            style={{
              position: 'absolute',
              inset: '0px',
              width: '100%',
              height: '100%',
              border: '0px',
              cursor: 'pointer',
              background:
                'radial-gradient(420px 300px at 50% 40%, rgba(231, 183, 101, 0.16), rgba(0, 0, 0, 0.65))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              zIndex: 10,
              padding: '16px',
            }}
          >
            {/* Animated Pulse Play Button */}
            <div className="relative flex items-center justify-center">
              {/* Pulsing ring 1 */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-40"
                style={{
                  background: 'var(--gold-lt, #e6b55a)',
                  transform: 'scale(1.25)',
                }}
              />
              {/* Outer glowing circle */}
              <span
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f5d485 0%, #d4a359 50%, #9c7332 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 32px rgba(230, 181, 90, 0.6), 0 8px 24px rgba(0,0,0,0.6)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
                className="hover:scale-110 active:scale-95"
              >
                {/* Triangular Play Icon */}
                <span
                  style={{
                    borderLeft: '22px solid #1a140d',
                    borderTop: '13px solid transparent',
                    borderBottom: '13px solid transparent',
                    marginLeft: '5px',
                  }}
                />
              </span>
            </div>

            {/* Sound Notice Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: 'rgba(18, 14, 10, 0.85)',
                border: '1px solid rgba(230, 181, 90, 0.45)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>🔊</span>
              <span
                style={{
                  color: 'var(--gold-lt, #f3ddb3)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {isBuffering ? 'Carregando...' : 'Clique para ouvir'}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
