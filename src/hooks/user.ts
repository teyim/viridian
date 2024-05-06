"use client";
import { getUser } from "@/services/client/user";
import { QueryKeys, TComputeGithubActivityRequestData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserData = (userId: string | undefined) =>
  useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
