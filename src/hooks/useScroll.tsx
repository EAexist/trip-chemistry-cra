import { useCallback, useEffect, useState } from "react";
import throttle from "./throttle";

const useScroll = ( onScroll :  (e: Event) => void ) => {
 
    const onScrollWithThrottle = throttle(onScroll, 200);
  
    useEffect(() => {
      console.log('App: add scroll event listner');
      window.addEventListener('scroll', onScrollWithThrottle);
  
      return () => {
        console.log('App: Unmount: remove scroll event listner');
        window.removeEventListener('scroll', onScrollWithThrottle);
      };
    }, []);
}

export default useScroll;