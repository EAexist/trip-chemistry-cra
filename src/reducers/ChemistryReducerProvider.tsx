import { Outlet } from "react-router-dom";
import chemistryReducer from "./chemistryReducer";
import withReducer from "../hocs/withReducer";

const ChemistryReducerProvider = withReducer(Outlet)({ chemistry: chemistryReducer });
export default ChemistryReducerProvider;