"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _GoogleMapContext = require("../common/GoogleMapContext");
var _jsxRuntime = require("react/jsx-runtime");
;
const GoogleMap = ({
  children,
  sx = {
    width: '100%',
    height: '100%'
  },
  opts
}) => {
  const ref = (0, _react.useRef)(null);
  // const [ map, setMap ] = useState<google.maps.Map | null>();
  const {
    map,
    setMap
  } = (0, _GoogleMapContext.useGoogleMapContext)();
  (0, _react.useEffect)(() => {
    console.log(`Mounting [GoogleMap]`);
    async function importLibrary(mapDiv) {
      const {
        Map
      } = await google.maps.importLibrary("maps");
      const map = new Map(mapDiv, opts);
      setMap(map);
    }
    if (ref.current) {
      console.log("[GoogleMap] Setting Map");
      importLibrary(ref.current);
    }
    return () => {
      setMap(null);
      console.log(`Unmounting [GoogleMap]`);
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: ref,
    style: sx,
    children: children
  });
};
var _default = exports.default = GoogleMap;