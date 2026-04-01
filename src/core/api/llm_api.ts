import axios from "axios";

const llmApi = axios.create({
  baseURL: "http://172.20.10.3:1234/v1", // change to your IP
  headers: {
    "Content-Type": "application/json",
  },
});

export default llmApi;