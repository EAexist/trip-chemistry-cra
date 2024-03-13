// https://velog.io/@hongkyu_mr_chu/CSR-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%84%ED%99%98-%EC%8B%AC%EB%A6%AC%EC%8A%A4

import { Grow } from "@mui/material";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";


const GrowPage = ({ children } : PropsWithChildren) => {

  /* Hooks */
  const { state } = useLocation();

  return (
    // <Grow in={true} style={{ transformOrigin: state.transformOrigin }}
    // timeout={4000}>
      <motion.div className="fullscreen" layoutId="cityDetail">
        { children }
      </motion.div>
    // </Grow>
  )
};

export default GrowPage;