"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../utils/firebase";

const LoginDialog = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleLogin = () => {
    setIsLogin((prev) => !prev); // Toggle between login and signup
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("users", JSON.stringify(result.user));

      await saveUserDataToFirestore(result.user);
      onClose();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignUpOrLogin = async () => {
    try {
      if (isLogin) {
        if (!userData.email || !userData.password) {
          console.error("Please fill in all required fields.");
          return;
        }
        // Add login logic here
      } else {
        if (!userData.name || !userData.email || !userData.password) {
          console.error("Please fill in all required fields.");
          return;
        }
        // Add sign-up logic here
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveUserDataToFirestore = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDataToSave = {
        name: userData.name || user.displayName,
        email: userData.email || user.email,
      };
      await setDoc(userRef, userDataToSave);
      console.log("User data saved to Firestore:", userDataToSave);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          display: "flex",
          flexDirection: "column",
          width: "400px",
        },
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isLogin ? "Login" : "Sign Up"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!isLogin && (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={userData.name}
            onChange={handleInputChange}
          />
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
      </DialogContent>
      <DialogActions>
        <Box width="100%">
          <Button
            onClick={handleSignUpOrLogin}
            sx={{
              background: "#f20404",
              mb: 1,
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
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <Button
            onClick={handleGoogleSignIn}
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
            {isLogin ? "Login with Google" : "Sign Up with Google"}
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
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
