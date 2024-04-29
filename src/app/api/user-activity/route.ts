import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import { fetchGithubActivity } from "@/lib/server";
import { findUserById, updateUserStats } from "@/lib/helpers/user";
import { calculateXpPoints } from "@/lib/helpers";

export async function GET() {
  const session = await getServerSession(NEXT_AUTH_OPTIONS);

  if (!session) {
    return NextResponse.json(
      {
        message: "The request requires user authentication.",
      },
      { status: 401 }
    );
  }

  try {
    const userData = await findUserById(session.user.id);

    const userCommits = await fetchGithubActivity(session, userData);

    const updatedUser = await updateUserStats(userCommits, userData);

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user activity" },
      { status: 500 }
    );
  }
}
