import { axiosConfig } from "@/config/axiosConfig";
import { TComputeGithubActivityRequestData } from "@/types";
import { User } from "@prisma/client";

export const calculateUserActivity = async (
  data: TComputeGithubActivityRequestData
) => {
  const response = await axiosConfig.post<{ message: string }>(
    "compute-github-activity/",
    data
  );
  return response.data;
};

export const getUser = async (userId: string | undefined) => {
  if (userId) {
    const response = await axiosConfig.get<User>(`/user/${userId}`);
    return response.data;
  }
};
