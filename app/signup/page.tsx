"use client";

import { auth } from "@/lib/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        e.currentTarget.email.value.trim(),
        e.currentTarget.password.value
      );

      if (res.user) {
        form.reset();
        router.push("/dashboard");
        alert("Account created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl my-12">Sign up</h2>
      <div className="text-center">
        <Link href={"/"}>
          <button className="py-2 px-4 bg-gray-600 text-white rounded-sm cursor-pointer">
            Home
          </button>
        </Link>
      </div>
      <form
        onSubmit={handleSignup}
        className="space-y-4 max-w-md w-full mx-auto mt-6"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email-signup"
            className="bg-gray-700 border border-gray-400 px-2 py-0.5 rounded-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password-signup"
            className="bg-gray-700 border border-gray-400 px-2 py-0.5 rounded-sm"
          />
        </div>

        <Link href={"/signin"}>Already have an account. Sign in instead. </Link>

        <button
          type="submit"
          className="bg-gray-700 border border-gray-400 px-2 py-1 rounded-sm hover:cursor-pointer w-full mt-12"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
export default Signup;
