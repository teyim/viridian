import { GithubActivity } from "@/constants";

export function calculateXpPoints(commits: number) {
  const xpPoints = commits * GithubActivity.Commit;
  return xpPoints;
}

export function isoToDateTime(isoString: Date | undefined): string {
  // Type assertion for ISO string format (optional but recommended)
  if (isoString) {
    const parsedDate = new Date(isoString) as Date;

    // Options for formatting the date and time
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    // Format the date according to the options
    const formattedDateTime = parsedDate.toLocaleDateString("en-US", options);
    return formattedDateTime;
  }
  return "";
}
