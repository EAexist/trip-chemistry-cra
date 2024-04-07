"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = require("react");
var _withGoogleMapMarker = _interopRequireDefault(require("../common/withGoogleMapMarker"));
var _iconsMaterial = require("@mui/icons-material");
var _GoogleMapMarkerModule = _interopRequireDefault(require("./GoogleMapMarker.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
;
const MapMarker = ({
  label,
  icon,
  marker
}) => {
  (0, _react.useEffect)(() => {
    console.log(`Rednering [MapMarker] ${marker.position?.lat}, ${marker.position?.lng}`);
  }, []);
  const handleMouseEnter = (0, _react.useCallback)(() => {
    console.log('[MapMarker] handleMouseEnter');
    marker.zIndex = 10;
  }, [marker]);
  const handleMouseLeave = (0, _react.useCallback)(() => {
    console.log('[MapMarker] handleMouseLeave');
    marker.zIndex = 0;
  }, [marker]);
  return (
    /*#__PURE__*/
    // <div className='flex flex-col items-center -translate-x-1/2 -translate-y-14 card animate-fadeIn'
    // onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>        
    (0, _jsxRuntime.jsxs)("div", {
      className: _GoogleMapMarkerModule.default.marker__container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.LocationOn, {
        sx: {
          fontSize: 52,
          color: "gray"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Circle, {
        className: _GoogleMapMarkerModule.default.marker__background,
        sx: {
          fontSize: 28,
          color: "white"
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Icon, {
        className: _GoogleMapMarkerModule.default.marker__icon,
        sx: {
          fontSize: 20
        },
        children: icon
      })]
    })
    // </div>
  );
};

// const MapMarkerWithActiveOnFocus = withActiveOnFocus( withGoogleMapMarker( MapMarker ) );
var _default = exports.default = (0, _withGoogleMapMarker.default)(MapMarker); // export { MapMarkerWithActiveOnFocus };