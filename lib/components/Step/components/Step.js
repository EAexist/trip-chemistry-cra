"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _StepCheckpointContext = require("../StepCheckpointContext");
var _jsxRuntime = require("react/jsx-runtime");
;
function Step({
  index,
  children,
  ...props
}) {
  const {
    setCheckpoint
  } = (0, _StepCheckpointContext.useSetStepCheckpoint)(index
  // useCallback(([ entry ] : IntersectionObserverEntry[])=>{
  //     if ( entry.isIntersecting ){
  //         console.log(`[Step] isIntersecting index=${index}`);
  //         setStep(index);
  //         if( props.id ){
  //             navigate( location+props.id, { replace: true });
  //         }
  //     }
  // }, [ index, setStep, location, navigate, props.id ]) 
  );
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: setCheckpoint,
    ...props,
    children: children
  });
}
var _default = exports.default = Step;