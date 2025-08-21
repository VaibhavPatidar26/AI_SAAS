import axios from "axios";

export async function apiGenerateImage(prompt, token, backendUrl) {
  return await axios.post(`${backendUrl}api/text-to-image/generateImage`,
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
