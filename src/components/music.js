import { useEffect, useRef } from 'react';

function Music() {
  const audioRef = useRef();

  const handleFirstInteraction = () => {
    audioRef.current.play();
    document.removeEventListener('click', handleFirstInteraction);
  };

  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  return <audio ref={audioRef} src="music.mp3" />;
}

export default Music;
