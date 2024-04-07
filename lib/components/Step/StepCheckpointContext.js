"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepCheckpointContextProvider = StepCheckpointContextProvider;
exports.withStepCheckpointContext = exports.useStepCheckpoint = exports.useSetStepCheckpoint = exports.useSetIdToIndex = exports.useScrollToCheckpoint = exports.default = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const StepCheckpointContext = /*#__PURE__*/(0, _react.createContext)({});
function StepCheckpointContextProvider({
  children
}) {
  const [idToIndex, setIdToIndex] = (0, _react.useState)({});
  const stepCheckpointList = (0, _react.useRef)([]);
  (0, _react.useEffect)(() => {
    console.log(`[StepCheckpointContextProvider]  stepCheckpointList.current=${stepCheckpointList.current}`);
    stepCheckpointList.current.forEach((checkpoint, index) => {
      console.log(`[StepCheckpointContextProvider] checkpoints[${index}]=${checkpoint.offsetTop}`);
    });
  }, [stepCheckpointList]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepCheckpointContext.Provider, {
    value: {
      idToIndex: idToIndex,
      setIdToIndex: setIdToIndex,
      stepCheckpointList: stepCheckpointList
    },
    children: children
  });
}

/**** Custom Hooks ****/
const useStepCheckpoint = () => (0, _react.useContext)(StepCheckpointContext);
exports.useStepCheckpoint = useStepCheckpoint;
const useScrollToCheckpoint = () => {
  const {
    stepCheckpointList
  } = (0, _react.useContext)(StepCheckpointContext);
  return (0, _react.useCallback)(index => {
    console.log(`[withSetStepOnChange]\n\tindex=${index}
                \tlength=${stepCheckpointList.current.length} 
            `);
    stepCheckpointList.current[index].scrollIntoView({});
  }, [stepCheckpointList]);
};
exports.useScrollToCheckpoint = useScrollToCheckpoint;
const useSetStepCheckpoint = (index
// handleEntry : ([ entry ] : IntersectionObserverEntry[])=>void  = (() =>{}) 
) => {
  const {
    stepCheckpointList
  } = useStepCheckpoint();
  return {
    setCheckpoint: (0, _react.useCallback)(element => {
      if (element) {
        console.log(`[useSetStepCheckpoint] setCheckpoint. index=${index}`);
        stepCheckpointList.current[index] = element;
      }
    }, [stepCheckpointList, index]),
    removeCheckpoint: (0, _react.useCallback)(() => {
      console.log(`[useSetStepCheckpoint] removeCheckpoint. index=${index}`);
      stepCheckpointList.current = stepCheckpointList.current.splice(index, 1);
    }, [stepCheckpointList, index])
  };
};
exports.useSetStepCheckpoint = useSetStepCheckpoint;
const useSetIdToIndex = idToIndex => {
  const {
    setIdToIndex
  } = useStepCheckpoint();
  (0, _react.useEffect)(() => {
    setIdToIndex(idToIndex);
  }, [idToIndex]);
};

/**** HOCs ****/
exports.useSetIdToIndex = useSetIdToIndex;
const withStepCheckpointContext = WrappedComponent => props => {
  const [idToIndex, setIdToIndex] = (0, _react.useState)({});
  const stepCheckpointList = (0, _react.useRef)([]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepCheckpointContext.Provider, {
    value: {
      idToIndex,
      setIdToIndex,
      stepCheckpointList
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
      ...props
    })
  });
};
exports.withStepCheckpointContext = withStepCheckpointContext;
var _default = exports.default = StepCheckpointContext;