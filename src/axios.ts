import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = params => {
  return qs.stringify( params, { arrayFormat: 'comma' });
}
axios.defaults.baseURL = process.env.REACT_APP_API_URL;