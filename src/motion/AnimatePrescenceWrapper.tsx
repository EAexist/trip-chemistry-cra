// https://www.freecodecamp.org/news/improve-user-experience-in-react-by-animating-routes-using-framer-motion/

import { AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";

const AnimatePrescenceWrapper = ({ children }: PropsWithChildren) => {

  return (
    <AnimatePresence>
      {children}
    </AnimatePresence>
  );
}

export default AnimatePrescenceWrapper;