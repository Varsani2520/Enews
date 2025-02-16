"use client";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/app/utils/firebase";

const ProfileLayout = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">
          You need to log in to access your profile
        </h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white h-screen p-6">
        <h2 className="text-xl font-bold mb-6">Profile</h2>
        <nav className="space-y-4">
          <Link
            href={`/profile/${user.displayName}`}
            className="block hover:text-blue-400"
          >
            Overview
          </Link>
          <Link
            href={`/profile/${user.displayName}/favorites`}
            className="block hover:text-blue-400"
          >
            Favorites
          </Link>
          <Link
            href={`/profile/${user.displayName}/read-later`}
            className="block hover:text-blue-400"
          >
            Read Later
          </Link>
          <Link
            href={`/profile/${user.displayName}/comments`}
            className="block hover:text-blue-400"
          >
            Comments
          </Link>
          <Link
            href={`/profile/${user.displayName}/notifications`}
            className="block hover:text-blue-400"
          >
            Notifications
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default ProfileLayout;
