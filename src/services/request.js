import axios from "axios";
import { url } from "../utilities";

const request = axios.create({
  baseURL: url,
});
export default request;