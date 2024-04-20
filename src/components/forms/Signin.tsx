import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Tree from "@public/images/tree.svg";
import { signIn } from "next-auth/react";
import AuthError from "next-auth";
import { signInOAuth } from "@/lib/server/actions";

function Signin() {
  const [error, setError] = useState("");
  const handleSignin = async () => {
    const result = await signInOAuth({
      provider: "github",
    });
    if (result?.status === "error") {
      setError(result.errorMessage);
    }
  };

  return (
    <div>
      <form
        action={handleSignin}
        className="p-5 rounded-md ring-1 ring-black w-[400px] flex flex-col items-center  text-center shadow-lg"
      >
        <div>
          <Image src={Tree} alt="tree" width={70} height={70} />
        </div>
        <div className=" my-6">
          <h2 className="font-semibold my-1">Connect your Github</h2>
          <h6 className="">
            Connect Viridian with your Github account and start collecting tress
            and grow your forest
          </h6>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          className="flex space-x-3 bg-green-600 hover:bg-green-700 "
          type="submit"
        >
          <span>
            <FaGithub size={20} />
          </span>
          <span> Continue with Github</span>
        </Button>
      </form>
    </div>
  );
}

export default Signin;
