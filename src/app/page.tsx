"use client";
import Image from "next/image";
import React from "react";
import { signIn, useSession } from "next-auth/react";
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
            <button>Logout</button>
          </div>
        )}
      </div>
    </main>
  );
}
