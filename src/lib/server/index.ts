import { Session } from "next-auth";
import { octokitInstance } from "../github";

export const fetchGithubActivity = async (
  session: Session,
  lastActivity: string | undefined
) => {
  const octokitClient = octokitInstance(session.user.accessToken);
  let commitCount = 0;

  try {
    const repos = await octokitClient.request("GET /user/repos", {
      sort: "updated",
      per_page: 100,
    });

    const commitPromises = repos.data.map((repo) =>
      octokitClient.request("GET /repos/{owner}/{repo}/commits", {
        owner: repo.owner.login,
        repo: repo.name,
        since: lastActivity || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Default to last 7 days if no lastActivity
      })
    );

    const allCommits = await Promise.allSettled(commitPromises);

    allCommits.forEach((result) => {
      if (result.status === "fulfilled") {
        const commits = result.value.data
          .filter((commit) => commit?.author?.login === session.user.userName)
          .length;
        commitCount += commits;
      }
    });

    return commitCount;
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    throw new Error("Error fetching user data");
  }
}