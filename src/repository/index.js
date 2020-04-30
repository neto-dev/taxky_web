import axios from "axios";

const urlStandard = process.env.VUE_APP_API_URL;

const request = axios.create({
  baseURL: urlStandard
});

const Token = returnToken();

function returnToken() {
  if (localStorage.getItem("token") === null) {
    console.log("Este es el token que se manda: ", "123456789");
    return "123456789";
  } else {
    console.log(
      "Este es el token que se manda: ",
      localStorage.getItem("token")
    );
    return localStorage.getItem("token");
  }
}
// const service = new Service(request);
// service.register({
// 	async onRequest(config) {
// 		if (!!config.headers.Authorization) return config;
// 		let token;
// 		try {
// 			token = await AsyncStorage.getItem('TOKEN');
// 		} catch (err) {
// 			token = '';
// 		}
// 		let _config = { ...config };
// 		_config.headers.Authorization = JSON.parse(token);
// 		return _config;
// 	}
// })

export async function index(uri, baseURL = urlStandard) {
  return request({
    url: uri,
    headers: {
      Authorization: Token,
      "Content-Type": "application/json"
    },
    baseURL
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err;
    });
}

export async function show(id, uri, baseURL = urlStandard) {
  return request({
    url: `${uri}/${id}`,
    headers: {
      Authorization: Token,
      "Content-Type": "application/json"
    },
    baseURL
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err;
    });
}

export async function filter(value, uri, baseURL = urlStandard) {
  return request({
    url: `${uri}/filters`,
    method: "POST",
    headers: {
      Authorization: Token,
      "Content-Type": "application/json"
    },
    baseURL,
    data: value
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err;
    });
}

export async function create(value, uri, baseURL = urlStandard) {
  return request({
    url: `${uri}`,
    method: "POST",
    headers: {
      Authorization: Token,
      "Content-Type": "application/json"
    },
    data: value,
    baseURL
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err;
    });
}

export async function update(value, id, uri, baseURL = urlStandard) {
  return request({
    url: `${uri}/${id}`,
    method: "PUT",
    data: value,
    headers: {
      Authorization: Token,
      "Content-Type": "application/json"
    },
    baseURL
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err;
    });
}

export async function remove(id, uri, baseURL = urlStandard) {
  return request({
    url: `${uri}/${id}`,
    method: "DELETE",
    headers: {
      Authorization: Token,
      "Content-Type": "application/json"
    },
    baseURL
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err;
    });
}

export async function login(value) {
  return request({
    url: `sessions/adminuser`,
    method: "POST",
    data: value
  })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      throw Error(err);
    });
}

export default {
  index,
  show,
  filter,
  create,
  update,
  remove,
  login,
  request
};