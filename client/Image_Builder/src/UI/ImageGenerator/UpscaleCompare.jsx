import React from "react";
import { Compare } from "../../components/ui/compare";

export default function UpscaleCompare() {
  return (
    <div
      className="flex flex-col justify-between items-center p-4 shadow-blue-500 rounded-3xl w-full px-4 relative ">
      <Compare
        firstImage="https://images.unsplash.com/photo-1506886009355-7f3af05dd5d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        secondImage="https://res.cloudinary.com/danrkhcaz/image/upload/v1755674666/image_upscalar/utwu4cm7wcmyrjrdahdm.webp"
        firstImageClassName="object-cover w-full h-full "
        secondImageClassname="object-cover w-full h-full "
       className="h-[250px] w-full md:h-[500px] md:w-[500px] shadow-blue-950"

        slideMode="hover" />
    </div>  
  );
}


