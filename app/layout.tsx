"use client";

import { useEffect } from "react";
import "./globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase.config";
import useUserStore from "@/store/userStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.resetUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        resetUser();
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
  }, [resetUser, setUser]);

  console.log(user);
  
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
