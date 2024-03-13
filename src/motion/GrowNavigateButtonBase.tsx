// https://velog.io/@hongkyu_mr_chu/CSR-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%84%ED%99%98-%EC%8B%AC%EB%A6%AC%EC%8A%A4

import { ButtonBase, ButtonBaseProps } from "@mui/material";
import { useEffect, useRef } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

interface GrowNavigateButtonBaseProps extends ButtonBaseProps {
  to: To,
  options?: NavigateOptions | undefined
}

const GrowNavigateButtonBase = ({ to, options, children, ...props }: GrowNavigateButtonBaseProps) => {

  /* Hooks */
  const navigate = useNavigate();

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    console.log(`${(Math.round(ref.current?.getBoundingClientRect().bottom as number + ( ref.current?.getBoundingClientRect().top as number ))/2)}px ${(Math.round(ref.current?.getBoundingClientRect().right as number + ( ref.current?.getBoundingClientRect().left as number ))/2)}px`)

  }, [ ref ])


  /* Event Handlers */
  const handleClick = () => {
    navigate(to, {...options, state: {
        ...options?.state, 
        transformOrigin: `${(Math.round(ref.current?.getBoundingClientRect().bottom as number + ( ref.current?.getBoundingClientRect().top as number ))/2)}px ${(Math.round(ref.current?.getBoundingClientRect().right as number + ( ref.current?.getBoundingClientRect().left as number ))/2)}px` 
        // transformOrigin: `0px 0px` 
    }});
  };

  return (
    <ButtonBase onClick={handleClick} {...props} ref={ref}>
      {children}
    </ButtonBase>
  )
};

export default GrowNavigateButtonBase;