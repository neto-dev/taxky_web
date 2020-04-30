import axios from 'axios'
import UserRepository from "../repository/users";

export default {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      UserRepository.login({
        Email: user.email,
        Password: user.password,
      })
        .then((resp) => {
          console.log("Data Login: ", resp);
          let token = resp.results.Token;
          let userApi = resp.results;
          localStorage.setItem("token", token);
          localStorage.setItem("user_data", JSON.stringify(userApi));
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", {
            token: token,
            user: {
              ...userApi,
            },
          });
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  register({ commit }, data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      commit("auth_request");
      UserRepository.create(data)
        .then((resp) => {
          console.log("Data Login: ", resp);
          let token = resp.results.Token;
          let user = resp.results;
          localStorage.setItem("token", token);
          localStorage.setItem("user_data", JSON.stringify(user));
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", {
            token: token,
            user: {
              ...user,
            },
          });
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
};
