import React, { useState } from 'react';
import { assets, plans } from '../assets/assets';
import PlanCard from '../components/PlanCard';

const BuyCredit = () => {
  const [loading, setLoading] = useState(false);       // Global loading flag
  const [activePlan, setActivePlan] = useState(null);  // Which plan is loading

  return (
    <div className='flex flex-col justify-center items-center min-h-screen px-4 bg-[#171717]'>
      <div className="mb-2">
        <h5 className="text-sm text-white uppercase tracking-wide">Our plans</h5>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Choose the plan</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((item, index) => (
          <PlanCard
            key={index}
            image={<img src={assets.logo_icon} alt="logo" />}
            id={item.id}
            price={item.price}
            credits={item.credits}
            desc={item.desc}
            loading={loading}
            activePlan={activePlan}
            setLoading={setLoading}
            setActivePlan={setActivePlan}
          />
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
