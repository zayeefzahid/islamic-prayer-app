import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, BookOpen, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('english')
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState(null)

  // Mock API data for development (replace with actual API call)
  const mockData = {
    lat: 40.7128,
    lon: -74.0060,
    city: "New York",
    country: "United States",
    timings: {
      Fajr: "05:30",
      Sunrise: "06:45",
      Dhuhr: "12:15",
      Asr: "15:30",
      Sunset: "18:00",
      Maghrib: "18:15",
      Isha: "19:45",
      Imsak: "05:20",
      Midnight: "00:15"
    },
    ayah: {
      english: "And it is He who sends down rain from the sky, and We produce thereby the vegetation of every kind; We produce from it greenery from which We produce grains arranged in layers.",
      arabic: "وَهُوَ الَّذِي أَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ فَأَخْرَجْنَا مِنْهُ خَضِرًا نُّخْرِجُ مِنْهُ حَبًّا مُّتَرَاكِبًا",
      bengali: "আর তিনিই আকাশ থেকে পানি বর্ষণ করেন, অতঃপর আমি তা দিয়ে সব ধরনের উদ্ভিদ উৎপন্ন করি, তারপর তা থেকে সবুজ পাতা বের করি, যা থেকে স্তরে স্তরে সাজানো দানা উৎপন্ন করি।",
      urdu: "اور وہی ہے جس نے آسمان سے پانی اتارا، پھر ہم نے اس سے ہر قسم کی نباتات اگائیں، پھر اس سے سبزہ نکالا، جس سے ہم تہ بہ تہ دانے نکالتے ہیں۔",
      audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6099.mp3"
    }
  }

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true)
        // In real implementation, replace with actual API call
        // const response = await axios.get('/api/prayer-times')
        // setData(response.data)
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        setData(mockData)
      } catch (err) {
        setError('Failed to fetch prayer times and verse')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const playAudio = () => {
    if (data?.ayah?.audio) {
      if (isPlaying && audio) {
        audio.pause()
        setIsPlaying(false)
      } else {
        const newAudio = new Audio(data.ayah.audio)
        newAudio.play()
        setAudio(newAudio)
        setIsPlaying(true)
        
        newAudio.onended = () => {
          setIsPlaying(false)
        }
      }
    }
  }

  const prayerTimes = [
    { name: 'Fajr', time: data?.timings?.Fajr, icon: '🌅' },
    { name: 'Sunrise', time: data?.timings?.Sunrise, icon: '☀️' },
    { name: 'Dhuhr', time: data?.timings?.Dhuhr, icon: '🌞' },
    { name: 'Asr', time: data?.timings?.Asr, icon: '🌇' },
    { name: 'Maghrib', time: data?.timings?.Maghrib, icon: '🌆' },
    { name: 'Isha', time: data?.timings?.Isha, icon: '🌙' }
  ]

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
    { code: 'bengali', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'urdu', name: 'اردو', flag: '🇵🇰' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen animated-bg islamic-pattern flex items-center justify-center">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold gradient-text mb-2">Loading Prayer Times</h2>
          <p className="text-muted-foreground">Fetching your location and daily prayers...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen animated-bg islamic-pattern flex items-center justify-center">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animated-bg islamic-pattern">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4 float">
            Islamic Prayer Times
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay connected with your daily prayers and Quranic wisdom
          </p>
        </motion.div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-card border-0 pulse-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <MapPin className="w-6 h-6" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{data?.city}</h3>
                  <p className="text-muted-foreground">{data?.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-mono">{data?.lat?.toFixed(4)}, {data?.lon?.toFixed(4)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Prayer Times Grid */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
            Today's Prayer Times
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayerTimes.map((prayer, index) => (
              <motion.div
                key={prayer.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="prayer-card p-6 rounded-xl"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{prayer.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{prayer.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-mono font-bold text-primary">
                      {prayer.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quran Verse Card */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="verse-card border-0 rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <BookOpen className="w-6 h-6" />
                  Daily Verse from Quran
                </div>
                <Button
                  onClick={playAudio}
                  variant="outline"
                  size="sm"
                  className="glass-card border-primary/30 hover:bg-primary/20"
                >
                  {isPlaying ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selector */}
              <div className="flex flex-wrap gap-2 justify-center">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    size="sm"
                    className={`glass-card border-primary/30 ${
                      selectedLanguage === lang.code 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-primary/20'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </Button>
                ))}
              </div>

              {/* Verse Display */}
              <motion.div
                key={selectedLanguage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className={`text-lg md:text-xl leading-relaxed ${
                  selectedLanguage === 'arabic' ? 'text-right text-2xl md:text-3xl font-arabic' : ''
                }`}>
                  {data?.ayah?.[selectedLanguage]}
                </div>
                {selectedLanguage === 'arabic' && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    Surah Al-An'am (6:99)
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 text-muted-foreground"
        >
          <p>May Allah bless your prayers and guide your path</p>
          <p className="text-sm mt-2">Built with modern glassmorphism design</p>
        </motion.div>
      </div>
    </div>
  )
}

export default App

