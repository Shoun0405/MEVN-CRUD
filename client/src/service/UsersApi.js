import axios from "axios";
import http from "../httpCommon";

class UsersApi {
  getAll() {
    return http.get("/");
  }
  getPage(page,limit) {

    const pages = `page=${page}`
    const limits = `limit=${limit}`

    return http.get(`/pagination?${pages}&${limits}`);
  }

  add(data) {
    console.log(data)
    return http.post("/add", data);
  }

  update(id, data) {
    return http.put(`/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete/${id}`);
  }

}

export default new UsersApi();