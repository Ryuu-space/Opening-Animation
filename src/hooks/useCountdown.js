import { useEffect, useMemo, useState } from 'react';

const getTimeRemaining = (targetTime) => {
  const difference = targetTime - Date.now();

  if (difference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    total: difference,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
};

const useCountdown = (targetTime) => {
  const initialValue = useMemo(
    () => getTimeRemaining(targetTime),
    [targetTime],
  );

  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeRemaining(getTimeRemaining(targetTime));
    };

    updateCountdown();

    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [targetTime]);

  return timeRemaining;
};

export default useCountdown;
