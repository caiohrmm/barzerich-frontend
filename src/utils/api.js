import axios from "axios";

export default axios.create({
  baseURL: "https://apibarzerich-production.up.railway.app", // Substitua pelo IP local da sua API
  timeout: 1000,
});


