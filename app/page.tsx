"use client";

import useUserStore from "@/store/userStore";
import Link from "next/link";


export default function Home() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="container mx-auto flex h-screen w-full justify-center items-center gap-6">
      {user.email ? (
        ""
      ) : (
        <Link
          href="/signin"
          className="py-2 px-4 bg-gray-600 text-white rounded-sm"
        >
          Sing in
        </Link>
      )}

      <Link
        href="/dashboard"
        className="py-2 px-4 bg-gray-600 text-white rounded-sm"
      >
        Dashboard
      </Link>
    </div>
  );
}
