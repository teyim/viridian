import { findUserById } from "@/lib/helpers/user";
import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RequestParams = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: RequestParams) {
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
    const user = await findUserById(params?.id);
    return NextResponse.json({ user: user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}
