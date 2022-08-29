import axios from "axios";

const instance = axios.create({
  baseURL: "https://upayments-studycase-api.herokuapp.com/api/",
  // token should be from env file but this is a test project
  headers: {
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoYW5yYWphYXl1c2gxMjNAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL0F5dXNoLTIwMDEtRGhhbnJhaiIsImlhdCI6MTY2MTYxMzEyOCwiZXhwIjoxNjYyMDQ1MTI4fQ.wPQ2nLkDgKWcj4HxzJW5OfZnQA9MQX7MVnl4e5ymonk",
  },
});

export default instance;
