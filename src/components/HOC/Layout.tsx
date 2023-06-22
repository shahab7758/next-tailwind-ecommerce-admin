"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../Header/Nav";

export default function Layout({ children }: any) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center ">
        <div className="w-full text-center">
          <button
            className="bg-white p-2 rounded-lg"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
        {children}
      </div>
    </div>
  );
}
