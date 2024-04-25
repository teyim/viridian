import { CircleHelp, CircleUser, Goal, Store } from "lucide-react";
import { title } from "process";
import React from "react";

function BottomMenuBar() {
  const bottomMenuItems = [
    {
      icon: <Store strokeWidth={1.5} />,
      title: "Shop",
    },
    {
      icon: <CircleUser strokeWidth={1.5} />,
      title: "Profile",
    },
    {
      icon: <Goal strokeWidth={1.5} />,
      title: "Goals",
    },
    {
      icon: <CircleHelp strokeWidth={1.5} />,
      title: "Help",
    },
  ];
  return (
    <div className="absolute z-20 bottom-6 px-2 py-4 w-[400px] bg-[#333333] text-white rounded-2xl left-0 right-0 mx-auto font-mono text-sm">
      <ul className="flex items-center justify-evenly text-gray-200">
        {bottomMenuItems.map((menuItem, index) => (
          <li key={index}>
            <button className="flex flex-col space-y-2 justify-center items-center  hover:font-bold hover:text-green-400">
              {menuItem.icon}
              <span>{menuItem.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BottomMenuBar;
