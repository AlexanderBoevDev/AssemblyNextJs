import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container flex-grow mx-auto mt-5 mb-5 px-6 min-h-screen max-w-[1280px]">
      <h1 className="mb-4 text-3xl font-magistral-bold">Админка</h1>
    </div>
  );
}
