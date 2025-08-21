// utils/handleAxiosError.js
import { toast } from "react-toastify";

export function HandleAxiosError(error, fallbackMessage = "Something went wrong") {
  if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error.message) {
    toast.error(error.message);
  } else {
    toast.error(fallbackMessage);
  }

 
  console.error("Axios Error:", error);
}
