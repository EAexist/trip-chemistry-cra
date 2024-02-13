// /* React */
// import { useEffect, useRef, useState } from "react";

// /* React Packages */
// import { useDispatch, useSelector } from "react-redux";
// import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// import { motion, useMotionValueEvent, useScroll } from "framer-motion"

// import { Alert, Avatar, AvatarGroup, Button, Card, CardActionArea, Fade, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Popper, Slider, Toolbar, useScrollTrigger } from "@mui/material";
// import { Add, ArrowDownward, Close, KeyboardArrowDown } from "@mui/icons-material";

// import { CHEMISTRY, SLIDERPROPS_CHEMISTRY_BUDGET_FOOD, SLIDERPROPS_TEST_BUDGET_FOOD, TEST, USERS_EXAMPLE } from "../../common/app-const";
// import SectionPaper from "../../components/Paper/SectionPaper";
// import StepContainer from "../../components/Step/StepContainer";
// import { useStrings } from "../../texts";
// import { SWIPERPROPS_CHARACTER_CAROUSEL } from "../../common/swiperProps";

// import { setProfile, asyncGetTestAnswer, asyncGetTestResult, setAllREST, setStatus, useProfileList } from "../../reducers/profileReducer";
// import TestResultCard from "../../components/Card/TestResultCard";
// import { AppDispatch, RootState } from "../../store";
// import { LoadStatus, IProfileId } from "../../reducers";
// import { useChemistry, useChemistryLoadStatus, useGetChemistry } from "../../reducers/chemistryReducer";
// import useValueToProfileIdList from "../../hooks/useValueToProfileIdList";
// import ChemistrySlider from "../../components/Slider/ChemistrySlider";
// import ProfileAvatar from "../../components/Avatar/ProfileAvatar";
// import { Outlet, useNavigate } from "react-router-dom";
// import TestResultBox from "../../components/Card/TestResultBox";
// import ProfileImage from "../../components/ProfileImage";
// import Tooltip from "../../components/Tooltip";
// import { useTestAnswerStatus } from "../../reducers/testAnswerReducer";
// import LoadContent from "../LoadContent";
// import LoadContentItem from "../LoadContentItem";
// import LazyImage from "../../components/LazyImage";
// import getImgSrc, { FORMATPNG } from "../../utils/getImgSrc";
// import { useUserId } from "../../reducers/authReducer";

// interface TestPutContentProps {

// };

// function TestPutContent({ }: TestPutContentProps) {

//     const strings = useStrings().public.contents.test;
//     const navigate = useNavigate();

//     const dispatch = useDispatch<AppDispatch>();

//     /* Store */
//     const [status, setStatus] = useTestAnswerStatus();
//     const userId = useUserId();

//     /* Event Handler */
//     const handleSuccess = () => {
//         navigate('/result');
//     }
//     const handleFail = () => {
//         navigate('/test');        
//     }

//     return (
//         <LoadContent {...{ 
//             status, 
//             setStatus,
//             handleSuccess,
//             handleFail,
//         }}>
//         </LoadContent>
//     );
// }
// export default TestPutContent;