import { z } from "zod";

export type ErrorCode = {
  [key: number]: string;
};

export enum QueryKeys {
  USER_ACTIVITY = "user-activty",
  USER = "user",
}

export const ZComputeGithubActivityRequestData = z.object({
  userId: z.string(),
  lastActivity: z.date(),
});

export type TComputeGithubActivityRequestData = z.infer<
  typeof ZComputeGithubActivityRequestData
>;
