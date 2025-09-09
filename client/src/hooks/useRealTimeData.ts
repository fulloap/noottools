import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface RealTimePrice {
  price: string;
  change24h: string;
  volume24h: string;
  lastUpdate: string;
}

interface RealTimeHolders {
  count: number;
  change24h: number;
  lastUpdate: string;
}

export function useRealTimeData() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Real-time price data
  const priceQuery = useQuery<RealTimePrice>({
    queryKey: ["/api/realtime/price"],
    refetchInterval: 3000, // Update every 3 seconds
  });

  // Real-time holders data
  const holdersQuery = useQuery<RealTimeHolders>({
    queryKey: ["/api/realtime/holders"],
    refetchInterval: 5000, // Update every 5 seconds
  });

  // Simulate burn events
  const [burnedToday, setBurnedToday] = useState(1250);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance every 3 seconds
        const additionalBurn = Math.floor(Math.random() * 100) + 10;
        setBurnedToday(prev => prev + additionalBurn);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    currentTime,
    price: priceQuery.data,
    holders: holdersQuery.data,
    burnedToday,
    isLoading: priceQuery.isLoading || holdersQuery.isLoading,
  };
}

export function useAntiSniperCountdown(initialSeconds: number = 28) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isActive,
    isExpired: timeLeft === 0,
  };
}
