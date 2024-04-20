"use server";

import { redirect } from "next/navigation";
import type RedirectableProviderType from "next-auth";
import { OAuthProviderType } from "next-auth/providers/oauth-types";
import { SignInResponse, signIn } from "next-auth/react";

/**
 * Server action for OAuth sign in with AuthJS.
 */
export async function signInOAuth({
  provider,
}: {
  provider: OAuthProviderType;
}) {
  let response: SignInResponse | null | undefined = null;
  try {
    // note: could validate the providerId using something like zod to ensure only allowed providers are passed in
    // The signIn() function comes from NextAuth() in your auth.ts
    response = await signIn(provider, {
      redirect: true,
      callbackUrl: "/",
    });
    console.log(response);
    if (!response?.url) {
      return {
        status: "error",
        errorMessage: "Failed to login, redirect url not found",
      } as const;
    }
  } catch (error: any) {
    return {
      status: "error",
      errorMessage: error.message,
    } as const;
  }

  redirect(response.url);
}
