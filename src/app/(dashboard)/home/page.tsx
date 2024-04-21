"use client";
import LevelProgress from "@/components/levelProgress";
import { GitCommitVertical, Medal, RefreshCw, Trees } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <section className="text-gray-700 h-screen w-screen overflow-hidden">
      {/**Dashboard header section */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <h2 className="font-sans font-bold ">VIRIDIAN</h2>
        </div>
        <div className=" flex item-center space-x-5 font-mono text-sm">
          <div className="flex items-center space-x-1">
            <Medal />
            <span className="font-extrabold text-black">160 xp</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitCommitVertical />
            <span className="font-extrabold text-black">23</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trees />
            <span className="font-extrabold text-black">level 1</span>
          </div>
          <div className="flex items-center space-x-1">
            <RefreshCw />
            <span className="font-extrabold text-black">last sync</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className=" rounded-full">
              <Image
                src={session?.user.image ?? ""}
                alt="user profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-black"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-4 overflow-x-auto w-[98vw] mx-auto  no-scrollbar">
        <LevelProgress />
      </div>
    </section>
  );
};

export default Home;
