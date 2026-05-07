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
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const toggleAudio = async () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
      return
    }

    const audio = new Audio(dailyReflection.audio)
    audioRef.current = audio
    audio.onended = () => setIsPlaying(false)

    try {
      await audio.play()
      setIsPlaying(true)
    } catch (error) {
      console.warn('Unable to play Quran recitation:', error)
      setIsPlaying(false)
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
        <button className="icon-button" onClick={toggleAudio} type="button" aria-label="Play verse audio">
          {isPlaying ? <Pause size={17} /> : <Volume2 size={17} />}
        </button>
      </div>
    </section>
  )
}

export default DailyReflection
