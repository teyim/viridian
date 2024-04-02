import { Session } from "next-auth";
import { octokitInstance } from "../github";
import { fingUserById } from "../helpers/user";

export const fecthGithubActivity = async (session: Session) => {
  const octokitClient = octokitInstance(session.user.accessToken);
  let commitCount = 0;

  const userData = await fingUserById(session.user.id);

  try {
    let repos = await octokitClient.request("GET /user/repos", {
      sort: "updated",
      per_page: 100,
    });

    //get array of promises
    const commitPromise = repos.data.map((repo) => {
      //get commits from last 7 days by done by me
      return octokitClient.request("GET /repos/{owner}/{repo}/commits", {
        owner: repo.owner.login,
        repo: repo.name,
        since: userData?.lastActivity?.toISOString(), // get commits in repo since the last time we fetched commits
      });
    });

    // get resolved/rejected promise
    const allCommits = await Promise.all(commitPromise);

    for (const reponse of allCommits) {
      //filter to get commits number of the current user
      const commits = reponse.data
        .filter((commit) => commit?.author?.login === session.user.userName)
        .map((commit) => commit?.author?.login).length;

      // add commits to commit count
      commitCount += commits;
    }
  } catch (error) {
    return new Error("Error fetching user data");
  }
  return commitCount;
};
