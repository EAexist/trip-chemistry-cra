"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _client = require("react-dom/client");
var _options = require("./options");
var _GoogleMapContext = require("./GoogleMapContext");
var _jsxRuntime = require("react/jsx-runtime");
;
const withGoogleMapMarker = WrappedComponent => ({
  position = {
    lat: _options.CENTER_FUKUOKA_TENJIN.lat,
    lng: _options.CENTER_FUKUOKA_TENJIN.lng
  },
  isActive = true,
  ...props
}) => {
  const {
    map
  } = (0, _GoogleMapContext.useGoogleMapContext)();
  const [marker, setMarker] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    console.log(`Mounting [withGoogleMapMarker] props=${Object.values(props)}`);
    if (marker === undefined) {
      const importLibrary = async () => {
        console.log(`[withGoogleMapMarker] [importLibrary]`);
        const {
          AdvancedMarkerElement
        } = await google.maps.importLibrary("marker");
        const content = document.createElement("div");
        content.className = 'h-0 w-0';
        const advancedMarkerElement = new AdvancedMarkerElement({
          position: position,
          content: content,
          zIndex: 0
        });
        advancedMarkerElement.addListener('click', () => {});
        const root = (0, _client.createRoot)(advancedMarkerElement.content);
        root.render( /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
          marker: advancedMarkerElement,
          ...props
        }));
        setMarker(advancedMarkerElement);
      };
      importLibrary();
    } else {
      return () => {
        console.log(`[withGoogleMapMarker] Unmounting marker=${marker}`);
        marker.map = null;
      };
    }
  }, [marker]);
  (0, _react.useEffect)(() => {
    if (map) {
      if (marker) {
        if (isActive) {
          marker.map = map;
        } else {
          marker.map = null;
        }
      }
    }
  }, [isActive, map, marker]);
  return null;
};
var _default = exports.default = withGoogleMapMarker;