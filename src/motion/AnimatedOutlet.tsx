// https://velog.io/@hongkyu_mr_chu/CSR-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%84%ED%99%98-%EC%8B%AC%EB%A6%AC%EC%8A%A4

import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import StatedOutlet from "./StatedOutlet";

const AnimatedOutlet = () => {
  /* Hooks */
  const location = useLocation();

  return (
    <AnimatePresence>
      <StatedOutlet key={location.pathname} />
    </AnimatePresence>
  )
};

export default AnimatedOutlet;