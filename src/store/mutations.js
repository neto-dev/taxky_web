export default {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, payload) {
    state.status = "success";
    state.token = payload.token;
    console.log("User payload mutation: ", payload.user);
    state.user = payload.user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = {};
  },
};
