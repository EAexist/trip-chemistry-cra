"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _framerMotion = require("framer-motion");
var _reactRouterDom = require("react-router-dom");
var _jsxRuntime = require("react/jsx-runtime");
/* ScrollPageContainer
    Sticky Container, which displays paged items according to the amount of scroll in the container.*/

;
const ScrollPageContainer = ({
  onPageChange,
  pages,
  children
}) => {
  const [page, setPage] = (0, _react.useState)();
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  // const [ pages, setPages ] = useState<number>(0);

  const ref = (0, _react.useRef)(null);
  const pageRef = (0, _react.useRef)(null);

  /* Motion */
  const {
    scrollY
  } = (0, _framerMotion.useScroll)();
  (0, _framerMotion.useMotionValueEvent)(scrollY, "change", latest => {
    console.log(`[ScrollPageContainer] useMotionValueEvent\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
    setPage(Math.min(Math.floor((scrollY.get() - ref.current?.offsetTop) / pageRef?.current?.offsetHeight), pages - 1));
  });

  /* Side Effect */
  (0, _react.useEffect)(() => {
    console.log(`[ScrollPageContainer] useEffect\n\tscrollY.get()=${scrollY.get()}\n\tpageRef?.current?.offsetHeight=${pageRef?.current?.offsetHeight}`);
    setPage(Math.floor((scrollY.get() - ref.current?.offsetTop) / pageRef?.current?.offsetHeight));
  }, []);

  /* Side Effect OnPageChange */
  (0, _react.useEffect)(() => {
    console.log(`[ScrollPageContainer]\n\tpage=${page}`);
    /* onPageChange Event Handlers from props */
    if (page) {
      onPageChange && onPageChange(page);
    }
  }, [page, onPageChange, pathname]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: ref,
    className: "ScrollPageContainer",
    children: children
  });
};
var _default = exports.default = ScrollPageContainer;