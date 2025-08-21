import axios from "axios";

export async function apiGetImgGenHistory(token, backendUrl) {
  return await axios.get(`${backendUrl}api/history/ImgGenHist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function apiDeleteGenHistory(token,id,backendurl){

let response = await axios.delete(`${backendurl}api/history/ImgGenHist/delete/${id}`,{headers:{
  Authorization: `Bearer ${token}`
}})
console.log(response)
return response;
}

export  async function apiDeleteBgRemHistory(token,id,backendUrl){
  let response = await axios.delete(`${backendUrl}api/history/BgRemHist/delete/${id}`, {headers:{Authorization: `Bearer ${token}`}})
  console.log(response)
  return response
}

export async function apiDeleteImgUpsHistory(token,id,backendUrl){
  let response = await axios.delete(`${backendUrl}api/history/upscaleHist/delete/${id}`,{headers:{Authorization:`Bearer ${token}`}})
  console.log(response)
  return response
}