import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setToken, SetUser } = useContext(AppContext);

  const [Account, SetAccount] = useState(true);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ShowPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleclick() {
    SetAccount(!Account);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (Account) {
        const { data } = await axios.post(`${backendUrl}api/users/login`, {
          email: Email,
          password: Password,
        });
        toast.success(data.message);
        console.log(data)
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user",data.user)
          SetUser(data.user);
          navigate("/");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}api/users/register`, {
          Name,
          email: Email,
          password: Password,
          ConfirmPassword,
        });
        toast.success(data.message);
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user",data.user)
          SetUser(data.user);
          navigate("/");
        }
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717] px-4">
      <div className="bg-[#1f1f1f] rounded-xl shadow-lg w-full max-w-sm p-8 border border-gray-800">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white text-center">
          {Account ? "Sign in to Imagify" : "Create your account"}
        </h1>
        <p className="text-sm text-gray-400 text-center mt-1 mb-6">
          {Account
            ? "Welcome back! Please enter your details."
            : "Join us today, it's quick and easy."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!Account && (
            <input
              type="text"
              value={Name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2 bg-[#262626] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          )}

          <input
            type="email"
            disabled={loading}
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 bg-[#262626] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />

          <div className="relative">
            <input
              type={ShowPass ? "text" : "password"}
              required
              disabled={loading}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 bg-[#262626] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            <button
              type="button"
              disabled={loading}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
              onClick={() => setShowPass((prev) => !prev)}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {!Account && (
            <input
              type="password"
              disabled={loading}
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3 py-2 bg-[#262626] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          )}

          {Account && (
            <div className="text-right">
              <button
                type="button"
                className="text-xs text-gray-400 hover:text-gray-200"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2c2c2c] hover:bg-[#3a3a3a] text-white py-2 rounded-lg text-sm font-medium transition"
          >
            {loading ? "Loading..." : Account ? "Sign in" : "Sign up"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-xs text-center text-gray-400 mt-4">
          {Account ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={handleclick}
                disabled={loading}
                className="text-gray-300 hover:text-white font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={handleclick}
                disabled={loading}
                className="text-gray-300 hover:text-white font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
