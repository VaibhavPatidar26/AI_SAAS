import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { HandleAxiosError } from '../utils/HandleAxiosError';

// Import API functions
import { apiGetUserHistory, apiGetCredit } from '../api/user';
import { apiGenerateImage } from '../api/images';
import { apiCreateOrder, apiVerifyPayment } from '../api/payment';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);

  const [upscaleImg,setupscaleImg] = useState("")
  const [Image, setImage] = useState("");
  const [User, SetUser] = useState(() => localStorage.getItem("user"));
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [Images, setImages] = useState(() => localStorage.getItem("finalImage"));
  const [credit, setCredit] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  async function userhistory() {
    let response = await apiGetUserHistory(localStorage.getItem("token"), backendUrl);
    let Image_url = response.data.history;
    console.log(Image_url);
    return Image_url;
  }

  async function createOrder(amount, alpha, onComplete) {
    try {
      let response = await apiCreateOrder(amount, token, backendUrl);
      const order = response.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "AI Image Generator",
        description: "Buy Credits",
        order_id: order.id,
        handler: async function (paymentResponse) {
          const verifyResponse = await apiVerifyPayment(paymentResponse, alpha, token, backendUrl);
          if (verifyResponse.data.success) {
            await CreditFetcher();
            alert("Payment successful! Credits added.");
          } else {
            alert("Payment verification failed!");
          }
          if (onComplete) onComplete();
        },
        modal: {
          ondismiss: function () {
            if (onComplete) onComplete();
          }
        },
        theme: { color: "#3399cc" }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log(err);
      if (onComplete) onComplete();
    }
  }

  function handleLogout() {
    ["token", "user", "finalImage","final_bg_image","final_upscale_image"].forEach((key) => {
      localStorage.removeItem(key);
    });
    setToken("");
    SetUser(null);
    setImages(null);
    setImage(null)
    setupscaleImg(null)
    setIsLogout(true)
   
    toast.success("Logged Out Successfully");
    navigate("/",{replace:true});
    setIsLogout(false)
  }

  function tokenChecker() {
    if (token) {
      navigate("/dashboard");
    } else {
      toast("Login To create free Images");
      navigate("/login");
    }
  }

  async function CreditFetcher() {
    try {
      const response = await apiGetCredit(token, backendUrl);
      setCredit(response.data.credit);
      console.log(response);
    } catch (err) {
      HandleAxiosError(err, "unable to fetch token");
    }
  }

  async function imageGenerator(beta) {
    try {
      let response = await apiGenerateImage(beta, token, backendUrl);
      console.log(response);
      if (response.data.success) {
        console.log(response);
        CreditFetcher();
       toast.success(response.data.message);
        return response.data.finalImage;
      }
      if(!response.data.success){
        toast.error(response.data.message)
      }
    } catch (err) {
      HandleAxiosError(err, "can't generate image");
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      CreditFetcher();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{
      backendUrl,
      User,
      SetUser,
      token,
      setToken,
      Images,
      setImages,
      CreditFetcher,
      credit,
      setCredit,
      imageGenerator,
      tokenChecker,
      handleLogout,
      userhistory,
      createOrder,
      Image,
      setImage,
      upscaleImg,
      setupscaleImg,
      setIsLogout,
      isLogout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
