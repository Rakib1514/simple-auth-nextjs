"use client";

import { auth } from "@/lib/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type user = {
  email: string;
  uid: string;
  displayName: string;
  photoURL: string;
};

function Dashboard() {
  const [user, setUser] = useState<user | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        alert("Sign in to access dashboard");
        router.push("/signin");
      } else {
        setUser({
          email: currentUser.email!,
          uid: currentUser.uid,
          displayName: currentUser.displayName!,
          photoURL: currentUser.photoURL!,
        });
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-center text-2xl my-12">Dashboard</h1>

      <div className="flex justify-center items-center gap-6 my-4">
        <Link href={"/"}>
          <button className="py-2 px-4 bg-gray-600 text-white rounded-sm cursor-pointer">Home</button>
        </Link>

        <button onClick={handleSignOut} className="py-2 px-4 border border-gray-600 text-white rounded-sm cursor-pointer">Sign out</button>
      </div>

      <h2 className="text-center">Hello, {user.displayName || user.email}</h2>
    </div>
  );
}
export default Dashboard;
