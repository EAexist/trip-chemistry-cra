import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = params => {
  return qs.stringify( params, { arrayFormat: 'comma' });
}