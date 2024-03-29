"use client";

import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <main>
      <div>
        {!session ? (
          <div>
            <button onClick={() => signIn()}>Login</button>
          </div>
        ) : (
          <div>
            <h4>username:{session.user?.name}</h4>
            <button onClick={() => signOut()}>Logout</button>
          </div>
        )}
      </div>
    </main>
  );
}
