"use client";

import { auth, githubProvider, googleProvider } from "@/lib/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SigninPage() {
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        e.currentTarget.email.value.trim(),
        e.currentTarget.password.value
      );
      console.log(res.user);
      if (res.user) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res.user);
      if (res.user) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGithubSignin = async () => {
    try {
      const res = await signInWithPopup(auth, githubProvider);
      console.log(res.user);
      if (res.user) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl mt-12 mb-6">Sign in</h1>
      <div className="text-center">
        <Link href={"/"}>
          <button className="py-2 px-4 bg-gray-600 text-white rounded-sm cursor-pointer">
            Home
          </button>
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col">
        <div className=" border-b border-gray-400 py-12 flex flex-col gap-6">
          <button
            onClick={handleGoogleSignin}
            className="bg-gray-700 border border-gray-400 px-2 py-1 rounded-sm hover:cursor-pointer"
          >
            Sign in with Google
          </button>
          <button
            onClick={handleGithubSignin}
            className="bg-gray-700 border border-gray-400 px-2 py-1 rounded-sm hover:cursor-pointer"
          >
            Sign in with Github
          </button>
        </div>

        <form
          onSubmit={handleEmailLogin}
          className="space-y-4 max-w-md w-full mt-12"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email-signin"
              className="bg-gray-700 border border-gray-400 px-2 py-0.5 rounded-sm"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password-signin"
              className="bg-gray-700 border border-gray-400 px-2 py-0.5 rounded-sm"
            />
          </div>

          <Link href={"/signup"}>Don&apos;t have an account? Sign up </Link>

          <button
            type="submit"
            className="bg-gray-700 border border-gray-400 px-2 py-1 rounded-sm hover:cursor-pointer w-full mt-12"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
export default SigninPage;
