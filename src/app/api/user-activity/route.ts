import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import { octokitInstance } from "@/lib/github";
import { fingUserById } from "@/lib/helpers/user";
import { fecthGithubActivity } from "@/lib/server";

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
    const userCommits = await fecthGithubActivity(session);
    return NextResponse.json({ commits: userCommits });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
