"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _StepCheckpointContext = require("../components/Step/StepCheckpointContext");
var _StepContext = require("../components/Step/StepContext");
var _jsxRuntime = require("react/jsx-runtime");
;
const withSetStepOnChange = WrappedComponent => ({
  index,
  className,
  ...props
}) => {
  const scrollToCheckpoint = (0, _StepCheckpointContext.useScrollToCheckpoint)();
  const {
    step
  } = (0, _StepContext.useStepContext)();
  const handleChange = (event, value) => scrollToCheckpoint(value);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
    onChange: handleChange,
    selected: step === index,
    className: `${className} scroll-target`,
    ...props
  });
};
var _default = exports.default = withSetStepOnChange;