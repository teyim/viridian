import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "./prisma";
import GitHubProvider from "next-auth/providers/github";
import type { GithubProfile } from "next-auth/providers/github";

export const NEXT_AUTH_OPTIONS: AuthOptions = {
  providers: [
    GitHubProvider<GithubProfile>({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      // profile(profile) {
      //   return {
      //     id: profile.id.toString(),
      //     name: profile.name || profile.login,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //   };
      // },
    }),
  ],
  // pages: {
  //   //signIn: '/auth/signin', // Displays signin buttons
  //   // signOut: '/auth/signout', // Displays form with sign out button
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // Used for check email page
  // },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  // callbacks: {
  //   // async signIn(user, account, profile) { return true },
  //   // async redirect(url, baseUrl) { return baseUrl },
  //   // async session(session, user) { return session },
  //   // async jwt(token, user, account, profile, isNewUser) { return token }
  // },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  // events: {
  //   // signIn: ({ user, account, profile, isNewUser }) => {
  //   //   console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
  //   // },
  //   // updateUser({ user })
  // },

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // Enable debug messages in the console if you are having problems
  debug: true,
};
