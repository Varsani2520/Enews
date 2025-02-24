"use client";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/app/utils/firebase";
import { Container } from "@mui/material";

const ProfileLayout = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
        <h2 className="text-2xl font-semibold">
          You need to log in to access your profile
        </h2>
        <button
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
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

  // Sidebar Tabs
  const tabs = [
    { name: "favorites", label: "Favorites" },
    { name: "bookmarks", label: "Bookmarks" },
  ];

  return (
    <Container maxWidth="xl">
      <div className="flex min-h-screen bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-md border-r border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-6 tracking-wide text-gray-800">
            Profile
          </h2>
          <nav className="space-y-3">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={`/profile/${user.displayName}/${tab.name}  `}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname.includes(tab.name)
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium shadow transition-all"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white shadow-md">{children}</main>
      </div>
    </Container>
  );
};

export default ProfileLayout;
