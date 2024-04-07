"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepContextProvider = StepContextProvider;
exports.withStepContext = exports.useStepContext = exports.useStep = exports.useSetStep = exports.default = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const StepContext = /*#__PURE__*/(0, _react.createContext)({});
function StepContextProvider({
  children
}) {
  const [step, setStep] = (0, _react.useState)(0);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepContext.Provider, {
    value: {
      step,
      setStep
    },
    children: children
  });
}
const withStepContext = WrappedComponent => props => {
  const [step, setStep] = (0, _react.useState)(0);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepContext.Provider, {
    value: {
      step,
      setStep
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
      ...props
    })
  });
};
exports.withStepContext = withStepContext;
const useStep = () => (0, _react.useContext)(StepContext).step;
exports.useStep = useStep;
const useSetStep = () => (0, _react.useContext)(StepContext).setStep;
exports.useSetStep = useSetStep;
const useStepContext = () => (0, _react.useContext)(StepContext);
exports.useStepContext = useStepContext;
var _default = exports.default = StepContext;