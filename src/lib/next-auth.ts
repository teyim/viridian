import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, User } from "next-auth";
import prisma from "./prisma";
import GitHubProvider from "next-auth/providers/github";
import type { GithubProfile } from "next-auth/providers/github";
import { createUserWithInitialTree } from "./auth";
import { fingUserById } from "./helpers/user";

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

  callbacks: {
    async session({ session, token }) {
      session.user = token.user as User;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          const userData = await fingUserById(user.id);
          console.log(userData);
          await createUserWithInitialTree(userData); // Call function to unlock initial tree
          token.user = user;
        } catch (error) {
          // Handle potential errors with initial tree unlocking
          console.error(error);
          // Optionally, redirect to a different page or display an error message
        }
      }

      return token;
    },
  },

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
    maxAge: 30 * 24 * 60 * 60, //jwt session token last 30days max
  },
  // Enable debug messages in the console if you are having problems
  debug: true,
};
