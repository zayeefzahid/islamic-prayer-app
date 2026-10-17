import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_LOCATION } from '@/lib/prayer-times.js'
import { enrichLocationName, getDeviceLocation } from '@/services/prayer-api.js'

export function useLocation() {
  const [state, setState] = useState({
    location: DEFAULT_LOCATION,
    ready: false,
    busy: true,
    notice: '',
  })
  const requestId = useRef(0)

  const requestLocation = useCallback(async () => {
    const id = ++requestId.current
    setState(current => ({ ...current, busy: true, ready: false, notice: 'Checking your device location…' }))

    try {
      const coordinates = await getDeviceLocation()
      if (id !== requestId.current) return

      const location = await enrichLocationName(coordinates)
      if (id !== requestId.current) return

      setState({
        location,
        ready: true,
        busy: false,
        notice: 'Using your device location for today’s prayer times.',
      })
    } catch {
      if (id !== requestId.current) return

      setState(current => ({
        ...current,
        ready: true,
        busy: false,
        notice: `Location is unavailable. Using ${current.location.label}. You can retry when location access is enabled.`,
      }))
    }
  }, [])

  useEffect(() => {
    requestLocation()
    return () => {
      // Geolocation cannot be cancelled; ignore results from superseded requests.
      requestId.current += 1
    }
  }, [requestLocation])

  return { ...state, requestLocation }
}
