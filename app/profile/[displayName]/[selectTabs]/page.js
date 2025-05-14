"use client";

import FavoritesPage from "@/app/components/features/FavoritePage";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { deleteUserById, logoutUser, updateUserById } from "@/app/utils/auth";
import { Avatar, IconButton, TextField, Button, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { deepPurple } from "@mui/material/colors";
import toast from "react-hot-toast";

const SelectedTabs = () => {
  const { selectTabs } = useParams();
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    phoneNumber: user?.phone_no || "",
    avatar: null, // Handle avatar file
  });
  console.log("jdh", user)
  useEffect(() => {
    document.title = `Enews - ${selectTabs?.charAt(0).toUpperCase() + selectTabs?.slice(1)}`;
  }, [selectTabs]);

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }} alt={user?.fullname} src={user?.avatar_url} />
        <div>
          <h3 className="text-lg font-semibold">{user?.fullname}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>
      {selectTabs === "edit" && (
        <IconButton onClick={() => setEditMode(!editMode)} color="primary">
          {editMode ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      )}
    </div>
  );
  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        fullname: formData.fullname,
        phone_no: formData.phoneNumber,
        avatar: formData.avatar, // Handle avatar file upload
      };

      const updatedUser = await updateUserById(updatedData); // Call updateUserById
      setUser(updatedUser); // Update the user state in the context
      setEditMode(false); // Disable edit mode after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user profile");
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };
  const renderEditProfile = () => (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow">
      {renderHeader()}
      {editMode ? (
        <form className="space-y-4">
          <TextField
            label="Username"
            fullWidth
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          />
          <TextField
            label="Phone Number"
            fullWidth
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            {formData.avatar && <p>Avatar Selected: {formData.avatar.name}</p>}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );


  const renderDeleteAccount = () => (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow text-center">
      {renderHeader()}
      <h2 className="text-xl font-bold mb-4 text-red-600">Delete Account</h2>
      <p className="mb-4 text-gray-700">This action is permanent and cannot be undone.</p>
      <button
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        onClick={() => {
          deleteUserById(setUser);
          router.push("/");
        }}
      >
        Confirm Delete
      </button>
    </div>
  );

  const renderLogout = () => {
    useEffect(() => {
      logoutUser(setUser);
      router.push("/");
    }, []);

    return (
      <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow text-center text-gray-700">
        {renderHeader()}
        <p>Logging out...</p>
      </div>
    );
  };

  // -- Main Switch --
  if (selectTabs === "edit") return renderEditProfile();
  if (selectTabs === "favorites") return <FavoritesPage />;
  if (selectTabs === "logout") return renderLogout();
  if (selectTabs === "delete") return renderDeleteAccount();

  return (
    <div className="text-center py-10 text-gray-700">
      Page not found
    </div>
  );
};

export default SelectedTabs;
