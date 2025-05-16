"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container, Tabs, Tab, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useThemeContext } from "@/app/context/ThemeContext";
import { useAuth } from "@/app/context/AuthContext";

const ProfileLayout = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [tabIndex, setTabIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { themeData } = useThemeContext()
  // Ensure displayName is always valid
  const username = user?.displayName ? (user.displayName) : "user";

  // Sidebar Tabs
  // Add new tabs
  const tabs = [
    { name: "edit", label: "Edit Profile" },
    { name: "favorites", label: "Favorites" },
    { name: "logout", label: "logout" },
    { name: "delete", label: "Delete Account" },
  ];


  // Update tab index based on pathname
  useEffect(() => {
    const currentIndex = tabs.findIndex((tab) => pathname.includes(tab.name));
    setTabIndex(currentIndex !== -1 ? currentIndex : 0);
  }, [pathname]);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
        <h2 className="text-2xl font-semibold">
          You need to log in to access your profile
        </h2>
        <button
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
          onClick={() => router.push("/")}
        >
          Go to Login
        </button>
      </div>
    );
  }


  return (
    <Container maxWidth="xl">
      <div className="bg-gray-100 text-gray-900">
        {/* Show Sidebar on Desktop */}
        {!isMobile && (
          <div className="flex">
            <aside className="w-72 border-r border-gray-200 p-6" style={{ background: themeData?.background }}>
              <h2 className="text-2xl font-bold mb-6 tracking-wide" style={{ color: themeData?.navText }}>
                Profile
              </h2>
              <nav className="space-y-3">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={`/profile/${username}/${tab.name}`}
                    className={`block px-4 py-2 rounded-lg font-medium transition-all ${pathname.includes(tab.name)
                      ? "shadow-md"
                      : ""
                      }`}
                    style={{ color: themeData?.navText }}
                  >
                    {tab.label}
                  </Link>

                ))}
              </nav>
            </aside>
            <main className="flex-1 p-8" style={{ background: themeData?.background }}>{children}</main>
          </div>
        )}

        {/* Show Tabs on Mobile */}
        {isMobile && user && (
          <Box style={{ background: themeData?.background }}>
            <Tabs
              value={tabIndex}
              onChange={(_, newValue) => {
                setTabIndex(newValue);
                router.push(`/profile/${username}/${tabs[newValue].name}`);
              }}
              variant="fullWidth"
              indicatorColor="primary"
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} sx={{ color: themeData?.navText }}
                />
              ))}
            </Tabs>

            <main className="p-6">{children}</main>


          </Box>
        )}
      </div>
    </Container>
  );
};

export default ProfileLayout;
