import { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const useImgGenHistory = () => {
    const { token, backendUrl } = useContext(AppContext);

    const getImgGenHistory = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}api/history/ImgGenHist`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.ImgGenhistory);
            return response.data.ImgGenhistory
                ;
        } catch (error) {
            console.error("Error fetching image generation history:", error);
            return [];
        }
    };

    return getImgGenHistory;
};

export default useImgGenHistory;
