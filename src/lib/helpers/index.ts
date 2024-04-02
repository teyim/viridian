import { GithubActivity } from "@/constants";

export function calculateXpPoints(commits: number) {
  const xpPoints = commits * GithubActivity.Commit;
  return xpPoints;
}
