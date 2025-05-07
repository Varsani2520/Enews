"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithGoogle,
  loginWithEmail,
  signUpWithEmail,
} from "../utils/auth";

const LoginDialog = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    avatar: "",
  });
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
    setError(""); // Clear error message on toggle
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleAuthAction = async () => {
    setEmailLoading(true);
    setError("");

    try {
      if (
        !userData.email ||
        !userData.password ||
        (!isLogin && !userData.name)
      ) {
        setError("Please fill in all fields.");
        setEmailLoading(false);
        return;
      }
      if (isLogin) {
        await loginWithEmail(userData);
      } else {
        await signUpWithEmail(userData);
      }
      onClose(); // Close dialog on successful login/signup
    } catch (error) {
      setError(error.message);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      onClose(); // Close dialog on success
    } catch (error) {
      setError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {isLogin ? "Login" : "Sign Up"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!isLogin && (
          <>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={userData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="phone_no"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={userData.phone_no}
              onChange={handleInputChange}
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <label
                htmlFor="avatar-upload"
                style={{ display: "block", marginBottom: 6, fontWeight: 500 }}
              >
                Avatar
              </label>
              <Box
                sx={{
                  border: "1px solid #c4c4c4",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "#555" }}>
                  {userData.avatar ? userData.avatar.name : "No file chosen"}
                </span>
                <label htmlFor="avatar-upload">
                  <Button variant="outlined" size="small" component="span">
                    Choose File
                  </Button>
                </label>
              </Box>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  setUserData({ ...userData, avatar: e.target.files[0] })
                }
              />
            </Box>
          </>
        )}

        <TextField
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={userData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={userData.password}
          onChange={handleInputChange}
        />
        {error && (
          <Box sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>{error}</Box>
        )}
        <Button
          onClick={handleAuthAction}
          disabled={emailLoading}
          sx={{
            background: "#f20404",
            my: 1,
            py: 1.2,
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            "&:hover": { background: "#d10202" },
          }}
          fullWidth
          variant="contained"
        >
          {emailLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </Button>
        <Button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          sx={{
            background: "#4285F4",
            color: "#fff",
            mb: 1,
            py: 1.2,
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            "&:hover": { background: "#357ae8" },
          }}
          fullWidth
          startIcon={<GoogleIcon />}
          variant="contained"
        >
          {googleLoading
            ? "Signing in..."
            : isLogin
            ? "Login with Google"
            : "Sign Up with Google"}
        </Button>
        <Button
          onClick={toggleLogin}
          fullWidth
          variant="text"
          sx={{
            color: "#1976d2",
            fontWeight: "500",
            fontSize: "0.85rem",
            textTransform: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
