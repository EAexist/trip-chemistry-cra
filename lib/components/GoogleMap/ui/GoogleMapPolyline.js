"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _GoogleMapContext = require("../common/GoogleMapContext");
var _options = require("../common/options");
// import withActiveOnFocus, { withActiveOnFocusProps } from '../../Focus/withActiveOnFoucs';

// interface GoogleMapPolylineProps extends withActiveOnFocusProps {

;
const draw = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: i => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay,
          type: "spring",
          duration: 2,
          bounce: 0
        },
        opacity: {
          delay,
          duration: 0.01
        }
      }
    };
  }
};

// const Path = ({ index, id, start, end, text } : GoogleMapPolylineProps) => {

//   const path = `M ${start.x},${start.y} L ${end.x},${end.y}`

//   return(
//     <>
//       <defs>
//         <mask id={id} maskUnits="userSpaceOnUse">
//           <path
//             strokeDasharray='12 6'
//             d={path}
//             className='w-full h-full stroke-4 stroke-white'
//           />
//         </mask>
//       </defs>
//       {/* Aniamted Path */}
//       <motion.path
//         variants={draw}
//         className='w-full h-full stroke-4 stroke-red-500 fill-transparent'
//         d={path}
//         mask={`url(#${id})`}
//       />
//       {/* </motion.svg> */}
//     </>
//   );
// };

const GoogleMapPolyline = ({
  start,
  end,
  isActive = true
}) => {
  const {
    map
  } = (0, _GoogleMapContext.useGoogleMapContext)();
  const [polyline, setPolyline] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    console.log(`Mounting [GoogleMapPolyline] isActive=${isActive}`);
    async function importLibrary() {
      const {
        Polyline
      } = await google.maps.importLibrary("maps");
      const line = new Polyline({
        path: [start, end],
        ..._options.POLYLINE_OPTIONS.DASHED
      });
      setPolyline(line);
    }
    importLibrary();
    return () => {
      console.log(`Unmounting [GoogleMapPolyline]`);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (isActive) {
      if (map) {
        console.log(`GoogleMapPolyline: polyline.setMap(map)`);
        polyline && polyline.setMap(map);
      }
    } else {
      console.log(`GoogleMapPolyline: polyline.setMap(null)`);
      polyline && polyline.setMap(null);
    }
  }, [isActive, map, polyline]);
  return null;
};

// export default withGoogleAPI(GoogleMapPolyline)(API_KEY);

// const GoogleMapPolylineWithActiveOnFocus = withActiveOnFocus( GoogleMapPolyline )
var _default = exports.default = GoogleMapPolyline; // export { GoogleMapPolylineWithActiveOnFocus };