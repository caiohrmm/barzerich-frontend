import axios from "axios";

export default axios.create({
  baseURL: "http://26.86.119.136:5000", // Substitua pelo IP local da sua API
  timeout: 1000,
});
