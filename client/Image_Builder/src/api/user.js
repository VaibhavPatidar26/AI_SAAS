import axios from "axios";

export async function apiGetUserHistory(token, backendUrl) {
  return await axios.get(`${backendUrl}api/users/history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function apiGetCredit(token, backendUrl) {
  return await axios.post(`${backendUrl}api/users/credit`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
