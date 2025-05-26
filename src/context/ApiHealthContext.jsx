import { createContext, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

const ApiHealthContext = createContext()

export function ApiHealthProvider({ children }) {
    const [isAvailable, setIsAvailable] = useState(false)
    const intervalRef = useRef(null)
    const didFallbackRef = useRef(false)
    const checkApi = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL)
            if (response.status === 200) {
                setIsAvailable(true)
                clearInterval(intervalRef.current)
                intervalRef.current = null
            } else {
                setIsAvailable(false)
                handleFallbackAndRetry()
            }
        } catch {
            setIsAvailable(false)
            handleFallbackAndRetry()
        }
    }

    const handleFallbackAndRetry = async () => {
        if (!didFallbackRef.current) {
            didFallbackRef.current = true
            try {
                await axios.get(import.meta.env.VITE_HEALTH_ENDPOINT)
            } catch { }
        }

        if (!intervalRef.current) intervalRef.current = setInterval(checkApi, 10000)
    }

    useEffect(() => {
        checkApi()
        return () => clearInterval(intervalRef.current)
    }, [])

    return <ApiHealthContext.Provider value={{ isAvailable, setIsAvailable }}>
        {children}
    </ApiHealthContext.Provider>
}

export function useApiHealth() {
    return useContext(ApiHealthContext)
}
