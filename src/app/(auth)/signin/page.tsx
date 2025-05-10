"use client";
import Signin from "@/components/forms/Signin";
import Link from "next/link";

function SigninPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <nav className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold">
          Viridian
        </Link>
      </nav>
      <div className="flex-1 flex justify-center items-center">
        <Signin />
      </div>
    </div>
  );
}

export default SigninPage;