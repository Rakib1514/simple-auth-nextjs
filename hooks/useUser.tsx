import { auth } from "@/lib/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type user = {
  email: string;
  uid: string;
  displayName: string;
  photoURL: string;
};

function useUser() {
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (!currentUser) {
        setUser(null);
      } else {
        setUser({
          email: currentUser.email!,
          uid: currentUser.uid,
          displayName: currentUser.displayName!,
          photoURL: currentUser.photoURL!,
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  return { user, loading };
}
export default useUser;
