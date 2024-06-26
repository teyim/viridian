"use client";

import React, { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

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
