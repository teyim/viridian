import React from "react";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Tree from "@public/images/tree.svg";

function Signin() {
  return (
    <div className="p-5 rounded-md ring-2 ring-black w-[400px] flex flex-col items-center  text-center shadow-lg">
      <div>
        <Image src={Tree} alt="tree" width={70} height={70} />
      </div>
      <div className=" my-6">
        <h2 className="font-bold my-1">Connect your Github</h2>
        <h6 className="">
          Connect Viridian with your Github account and start collecting tress
          and grow your forest
        </h6>
      </div>

      <form>
        <Button className="flex space-x-3 bg-green-600 hover:bg-green-700   ">
          <span>
            <FaGithub size={20} />
          </span>
          <span> Continue with Google</span>
        </Button>
      </form>
    </div>
  );
}

export default Signin;
