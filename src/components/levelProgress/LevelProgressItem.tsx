import React from "react";
import Image from "next/image";
import { Medal } from "lucide-react";
import { twMerge } from "tailwind-merge";

type LevelProgressItemProps = {
  img: string;
  xp: number;
  isActive: boolean;
  showIndicator: boolean;
};
function LevelProgressItem({
  img,
  xp,
  isActive,
  showIndicator,
}: LevelProgressItemProps) {
  return (
    <div className="flex items-center">
      <div
        className={twMerge(
          "relative  flex flex-col justify-center items-center content-center ",
          !isActive ? "size-[100px]" : "size-[120px]"
        )}
      >
        <div
          className={twMerge(
            "w-[79px] h-[80px] border-[6px] border-green-600 rounded-[19px] flex ",
            !isActive && "hidden"
          )}
        ></div>
        <div className="w-[56px] h-[68px]  bg-[#333333] rounded-[13px] z-10 absolute top-0">
          <div className="w-[56px] h-[58px] bg-[#4C4C4C] rounded-[13px] border-[8px] border-[#666666] flex justify-center items-center">
            <Image
              src={img}
              alt="tree"
              width={25}
              height={25}
              className={twMerge("", !isActive && "grayscale")}
            />
          </div>
        </div>
        <div
          className={twMerge(
            "flex items-center space-x-1 text-[10px] absolute bottom-1 z-10  text-gray-500",
            isActive && "text-green-600 bottom-7"
          )}
        >
          <Medal size={12} />
          <span className="font-extrabold">{xp} xp</span>
        </div>
      </div>
      {showIndicator && (
        <div className="w-[50px] h-[4px] bg-[#E5E5E5] rounded-lg mb-2"></div>
      )}
    </div>
  );
}

export default LevelProgressItem;
