import { useEffect, useRef, useState } from 'react'
import { BookOpen, Pause, Volume2 } from 'lucide-react'

const dailyReflection = {
  reference: 'Quran 2:45',
  arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
  translation: 'Seek help through patience and prayer.',
  audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/52.mp3',
}

function DailyReflection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(dailyReflection.audio)
    audio.preload = 'none'
    audioRef.current = audio

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)
    audio.addEventListener('error', onPause)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
      audio.removeEventListener('error', onPause)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [])

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      return
    }

    try {
      await audio.play()
    } catch (error) {
      if (audioRef.current === audio && error.name !== 'AbortError') {
        setIsPlaying(false)
        console.warn('Unable to play Quran recitation:', error)
      }
    }
  }

  return (
    <section className="surface-panel reflection-panel" aria-labelledby="reflection-title">
      <div className="panel-header">
        <div>
          <span className="section-eyebrow">Reflection</span>
          <h2 id="reflection-title">A verse for today</h2>
        </div>
        <BookOpen size={20} aria-hidden="true" />
      </div>

      <p className="arabic-verse" lang="ar" dir="rtl">
        {dailyReflection.arabic}
      </p>
      <p className="verse-translation">{dailyReflection.translation}</p>

      <div className="reflection-footer">
        <span>{dailyReflection.reference}</span>
        <button className="icon-button" onClick={toggleAudio} type="button" aria-label={isPlaying ? 'Pause verse audio' : 'Play verse audio'} aria-pressed={isPlaying}>
          {isPlaying ? <Pause size={17} /> : <Volume2 size={17} />}
        </button>
      </div>
    </section>
  )
}

export default DailyReflection
