import Application from "./";

const url = "users";

class UserRepository {
  static index() {
    return Application.index(url);
  }

  static show(id) {
    return Application.show(id, url);
  }

  static filter(value) {
    return Application.filter(value, url);
  }

  static create(value) {
    return Application.create(value, url);
  }

  static update(value, id) {
    return Application.update(value, id, url);
  }

  static delete(id) {
    return Application.remove(id, url);
  }

  static login(value) {
    return Application.request({
      url: `users/login`,
      method: "POST",
      data: value,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  static reset_password(email) {
    return Application.request({
      url: `/users/send-password-forgot`,
      method: "POST",
      data: email,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  static restore_password(data) {
    return Application.request({
      url: `/users/change-password`,
      method: "POST",
      data: data,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  static check(email) {
    return Application.request({
      url: `users/check`,
      method: "POST",
      data: email,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw Error(err);
      });
  }
}

export default UserRepository;
