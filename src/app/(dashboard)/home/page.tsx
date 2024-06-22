"use client";
import BottomMenuBar from "@/components/BottomMenuBar";
import LevelProgress from "@/components/levelProgress";
import { trees } from "@/constants/trees";
import { useGetUserData } from "@/hooks/user";
import { isoToDateTime } from "@/lib/helpers";
import { findUserById } from "@/lib/helpers/user";
import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import { calculateUserActivity } from "@/services/client/user";
import { QueryKeys, TComputeGithubActivityRequestData } from "@/types";
import { QueryClient, useMutation } from "@tanstack/react-query";
import {
  Gem,
  GitCommitVertical,
  Medal,
  RefreshCw,
  Shrub,
  Trees,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
  const { data: user, isPending } = useGetUserData(session?.user.id);
  const { mutate } = useMutation({
    mutationKey: [QueryKeys.USER_ACTIVITY],
    mutationFn: (data: TComputeGithubActivityRequestData) =>
      calculateUserActivity(data),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (user) {
      mutate(
        { userId: user?.id, lastActivity: user?.lastActivity },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
          },
          onError: (error: any) => {
            console.log(error.response.data.message);
          },
        }
      );
    }
  }, [user]);

  return (
    <>
      {isPending ? (
        <div>
          <h3>Syncing with Github..........</h3>
        </div>
      ) : (
        <section className="text-gray-700 h-screen w-screen overflow-hidden relative font-mono">
          {/**Dashboard header section */}
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="font-bold ">VIRIDIAN</h2>
            </div>
            <div className=" flex item-center space-x-5  text-sm">
              <div className="flex items-center space-x-1">
                <Medal />
                <span className="font-extrabold text-black">{user?.xp} xp</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitCommitVertical />
                <span className="font-extrabold text-black">
                  {user?.stats?.commits}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Trees />
                <span className="font-extrabold text-black">
                  level {user?.level}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <RefreshCw />
                <span className="font-extrabold text-black">
                  {isoToDateTime(user?.lastActivity)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className=" rounded-full">
                  <Image
                    src={user?.image ?? ""}
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
            <LevelProgress unlockedTrees={user?.unlockedTrees || []} />
          </div>
          <div className="mt-[55px] flex  justify-center">
            <div className="relative flex flex-col text-center items-center">
              <div className="size-[150px]  flex justify-center items-end">
                <Image
                  src={trees[2].imageUrl}
                  alt="tree"
                  width={50}
                  height={50}
                  className="z-10 relative"
                />
              </div>
              <div className=" my-4">
                <h3 className="font-bold text-[#CA8A04]">{trees[0].name}</h3>
                <p className="text-sm">{trees[0].description}</p>
                <div className="my-3 flex space-x-3 justify-center">
                  <div className="text-xs justify-center flex space-x-1 rounded-lg p-1 text-yellow-600 bg-yellow-200 items-center w-[90px] ring-1 ring-yellow-600">
                    <Gem size={15} className="mb-1" />
                    <span className="font-bold">{trees[0].rarity}</span>
                  </div>
                  <div className="text-xs justify-center flex space-x-1 rounded-lg p-1 text-yellow-600 bg-yellow-200 items-center w-[90px] ring-1 ring-yellow-600">
                    <Shrub size={15} className="mb-1" />
                    <span className="font-bold">Sprout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BottomMenuBar />
        </section>
      )}
    </>
  );
};

export default Home;
