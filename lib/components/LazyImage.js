"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
/* https://dev.to/kunalukey/make-your-own-lazy-loading-image-component-in-react-2j7m
 * Kunal Ukey. 2022.11.21. Make Your Own Lazy Loading Image Component In React. DEV Community.
*/

function LazyImage({
  src,
  alt,
  ref,
  sx = {
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  },
  containerClassName,
  className,
  children
}) {
  /* States */
  const [isLoaded, setIsLoaded] = (0, _react.useState)(false);
  const [view, setView] = (0, _react.useState)("");
  const placeholderRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    // Initiating Intersection Observer
    const observer = new IntersectionObserver(entries => {
      // Set actual image source && unobserve when intersecting
      if (entries[0].isIntersecting) {
        setView(src);
        if (placeholderRef.current) {
          observer.unobserve(placeholderRef.current);
        }
      }
    });
    // observe for an placeholder image
    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, [src]);
  const backgroundImageStyle = {
    backgroundImage: `url("${view}")`
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: containerClassName,
    ref: placeholderRef,
    children: [!isLoaded && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Skeleton, {
      variant: "rectangular",
      width: "100%",
      height: "100%"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      // ref={ref}
      style: {
        visibility: isLoaded ? 'visible' : 'hidden',
        ...sx
      },
      className: className,
      src: view,
      alt: alt,
      onLoad: () => {
        setIsLoaded(true);
        console.log(`[LazyImage] Isloaded alt=${alt}`);
      }
    })]
  });
}
;
var _default = exports.default = LazyImage;