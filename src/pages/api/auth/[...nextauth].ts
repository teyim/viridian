import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import NextAuth from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next/types";

const handler = NextAuth(NEXT_AUTH_OPTIONS);

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Return handler as-is, without spreading options again
  return handler(req, res);
}