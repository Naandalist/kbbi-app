import {useEffect, useState} from 'react';

export default function useCountdown(initialSeconds, onComplete) {
  const [countdown, setCountdown] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onComplete) {
            onComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return countdown;
}
