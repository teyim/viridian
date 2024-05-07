import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import { fetchGithubActivity } from "@/lib/server";
import { findUserById, updateUserStats } from "@/lib/helpers/user";
import { calculateXpPoints } from "@/lib/helpers";
import {
  TComputeGithubActivityRequestData,
  ZComputeGithubActivityRequestData,
} from "@/types";

export async function POST(req: NextRequest) {
  const requestData = await req.json();
  const { lastActivity, userId } =
    requestData as TComputeGithubActivityRequestData;
  const session = await getServerSession(NEXT_AUTH_OPTIONS);

  console.log(requestData);

  if (!session) {
    return NextResponse.json(
      {
        message: "The request requires user authentication.",
      },
      { status: 401 }
    );
  }

  if (!ZComputeGithubActivityRequestData.safeParse(requestData).success) {
    return NextResponse.json(
      {
        message: "Invalid request data",
      },
      { status: 400 }
    );
  }

  try {
    if (lastActivity) {
      const userCommits = await fetchGithubActivity(
        session,
        lastActivity.toString()
      );
    }

    console.log(userCommits);
    // await updateUserStats(userCommits, requestData?.userId);

    return NextResponse.json({ message: "User activity updated" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user activity" },
      { status: 500 }
    );
  }
}
