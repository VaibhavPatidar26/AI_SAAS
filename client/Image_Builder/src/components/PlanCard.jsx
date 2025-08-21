import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlanCard = ({ image, id, price, credits, desc, loading, activePlan, setLoading, setActivePlan }) => {
  const navigate = useNavigate();
  const { createOrder, token } = useContext(AppContext);

  async function clickhandler() {
    if (!token) {
      toast.error("Login first");
      navigate('/login');
      return;
    }

    setLoading(true);
    setActivePlan(id);

    try {
      await createOrder(price, credits, () => {
        setLoading(false);
        setActivePlan(null);
      });
    } catch {
      setLoading(false);
      setActivePlan(null);
    }
  }

  const isActive = activePlan === id;

  return (
    <div className={`bg-[#1a1a1a] p-6 rounded-xl w-72 border border-[#2d2d2d] flex flex-col justify-between h-full 
                    shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                    ${isActive ? 'ring-1 ring-[#555]' : ''}`}>
      {/* Icon Container */}
      <div className="mb-4 flex items-center justify-center w-14 h-14 bg-[#2d2d2d] rounded-xl">
        <div className="w-8 h-8 text-gray-300">{image}</div>
      </div>

      {/* Plan Details */}
      <div className="text-xl font-bold text-gray-100 mb-1">{id}</div>
      <div className="text-sm text-gray-400 mb-4 leading-relaxed">{desc}</div>

      {/* Price */}
      <div className="text-3xl font-bold text-gray-100 mb-4">
        ₹{price}
        <span className="text-sm font-medium text-gray-500 ml-1">/ {credits} Credits</span>
      </div>

      {/* Button */}
      <button
        onClick={clickhandler}
        disabled={loading}
        className={`rounded-lg w-full py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-[#1a1a1a]
          ${loading && isActive 
            ? 'bg-[#333] text-gray-400 cursor-not-allowed' 
            : 'bg-[#333] hover:bg-[#444] text-gray-100 border border-[#444]'
          }`}
      >
        {loading && isActive
          ? "Processing..."
          : token
            ? "Buy Now"
            : "Get Started"}
      </button>
    </div>
  );
};

export default PlanCard;