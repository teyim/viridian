import { Octokit } from "octokit";

export function octokitInstance(accessToken: string) {
  const octokit = new Octokit({
    auth: accessToken,
  });
  return octokit;
}
