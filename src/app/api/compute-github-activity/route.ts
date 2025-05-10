import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import { fetchGithubActivity } from "@/lib/server";
import { updateUserStats } from "@/lib/helpers/user";
import { TComputeGithubActivityRequestData, ZComputeGithubActivityRequestData } from "@/types";

export async function POST(req: NextRequest) {
  const requestData = await req.json();
  const { lastActivity, userId } = requestData as TComputeGithubActivityRequestData;
  const session = await getServerSession(NEXT_AUTH_OPTIONS);

  if (!session) {
    return NextResponse.json(
      { message: "The request requires user authentication." },
      { status: 401 }
    );
  }

  if (!ZComputeGithubActivityRequestData.safeParse(requestData).success) {
    return NextResponse.json(
      { message: "Invalid request data" },
      { status: 400 }
    );
  }

  try {
    const userCommits = await fetchGithubActivity(session, lastActivity?.toString());
    await updateUserStats(userCommits, userId);

    return NextResponse.json({ message: "User activity updated" });
  } catch (error) {
    console.error("Error computing GitHub activity:", error);
    return NextResponse.json(
      { message: "Error fetching user activity" },
      { status: 500 }
    );
  }
}