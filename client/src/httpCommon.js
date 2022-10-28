import axios from "axios";

export default axios.create({
  baseURL: "https://sleepy-badlands-17705.herokuapp.com/api/users",
  headers: {
    "Content-type": "application/json"
  }
});