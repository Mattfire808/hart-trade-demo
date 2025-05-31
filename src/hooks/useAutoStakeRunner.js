// src/hooks/useAutoStakeRunner.js

import { useEffect, useRef } from "react";
import { runAutoStakeCycle } from "../utils/autoStakeEngine";

export default function useAutoStakeRunner(isRunning, interval = 5000) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        runAutoStakeCycle();
      }, interval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, interval]);
}
