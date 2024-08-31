import { useEffect, useState } from "react";
import dayjs from "dayjs";

const DefaultFormat = "YYYY-MM-DD HH:mm:ss";

const useCurrentTime = (format: string = DefaultFormat) => {
  const [currentTime, setCurrentTime] = useState<string>(
    dayjs().format(format)
  );

  useEffect(() => {
    let animationFrameId: number;

    const updateCurrentTime = () => {
      setCurrentTime(dayjs().format(format));
      animationFrameId = requestAnimationFrame(updateCurrentTime);
    };

    animationFrameId = requestAnimationFrame(updateCurrentTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, [format]);

  return currentTime;
};

export default useCurrentTime;
