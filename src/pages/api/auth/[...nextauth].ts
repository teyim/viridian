import { NEXT_AUTH_OPTIONS } from "@/lib/next-auth";
import NextAuth from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    ...NEXT_AUTH_OPTIONS,
  });
}
