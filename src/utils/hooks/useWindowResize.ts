import { useState, useEffect, useCallback } from 'react';
import {
  MOBILE_BREAKPOINT,
  RESIZE_EVENT,
  TABLET_BREAKPOINT,
} from '../constants';
interface WindowSize {
  width: number;
  height: number;
}

interface DeviceInfo extends WindowSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useWindowResizeAndDevice = (): DeviceInfo => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener(RESIZE_EVENT, handleResize);
      return window.removeEventListener(RESIZE_EVENT, handleResize);
    }
  }, [handleResize]);

  return {
    ...windowSize,
    isMobile: windowSize.width <= MOBILE_BREAKPOINT,
    isTablet:
      windowSize.width > MOBILE_BREAKPOINT &&
      windowSize.width <= TABLET_BREAKPOINT,
    isDesktop: windowSize.width > TABLET_BREAKPOINT,
  };
};

export default useWindowResizeAndDevice;
