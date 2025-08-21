import React from "react";
import { Compare } from "../../components/ui/compare";

export default function CompareDemo() {
  return (
    <div
      className="flex flex-col justify-between items-center p-4 shadow-blue-500 rounded-3xl w-full px-4 relative ">
      <Compare
        firstImage="https://c4.wallpaperflare.com/wallpaper/574/955/610/beautiful-girl-4k-best-picture-wallpaper-preview.jpg"
        secondImage="https://res.cloudinary.com/danrkhcaz/image/upload/v1755004371/user_images/vujuh3rgohzr9gwryndj.png"
        firstImageClassName="object-cover w-full h-full"
        secondImageClassname="object-cover h-full w-full bg-white"
       className="h-[250px] w-full md:h-[500px] md:w-[500px] shadow-blue-950"

        slideMode="hover" />
    </div>
  );
}


