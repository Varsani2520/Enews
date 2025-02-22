"use client";
import { auth } from "@/app/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfilePage = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1a2e51]">My Profile</h1>

      <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
        <div className="flex items-center space-x-4">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user?.displayName || user?.name}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-gray-700">
        Manage your **favorites**, **saved articles**, **comments**, and
        **notifications** here.
      </p>
    </div>
  );
};

export default ProfilePage;
