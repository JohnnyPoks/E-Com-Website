import { config } from "./config";
// import { getToken } from "./localstorage";

const getRequest = async (path) => {
  // console.log(getToken())
  try {
    const params = {
      method: "GET",
      // headers: {
      //   Authorization: "Bearer " + getToken(),
      // },
    };
    const res = await fetch(config.adminBaseURL + path, params);
    console.log(res);

    const data = await res.text();
    console.log(JSON.parse(data));

    return { statusCode: res.status, data };
  } catch (e) {
    console.error(`error in get Request (${path}) :- `, e);
    return { statusCode: 400, data: [] };
  }
};

const postRequest = async (path, body) => {
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.adminBaseURL + path, params);
    console.log(res);

    const data = await res.text();
    console.log(JSON.parse(data));

    return { statusCode: res.status, data };
  } catch (e) {
    console.error(`error in post Request (${path}) :- `, e);
  }
};

const deleteRequest = async (path) => {
  try {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + getToken(),
      },
    };

    const res = await fetch(config.adminBaseURL + path, params);
    console.log(res);

    const data = await res.text();
    console.log(data);
    // console.log(JSON.parse(data));

    return { statusCode: res.status, data };
  } catch (e) {
    console.error(`error in Delete Request (${path}) :- `, e);
  }
};

const putRequest = async (path, body) => {
  try {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.adminBaseURL + path, params);
    console.log(res);

    const data = await res.text();
    console.log(JSON.parse(data));

    return { statusCode: res.status, data };
  } catch (e) {
    console.log(`error in PUT Request (${path}) :- `, e);
  }
};

const AdminApi = {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
};

export default AdminApi;
