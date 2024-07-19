// LoginDialog component
'use client'
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
  Tabs,
  Tab,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import OtpContainer from "../utils/OtpContainer";
import { onSignup } from "../utils/OnSignUp";
import { onCaptchVerify } from "./onCaptchVerify";

const LoginDialog = ({ open, onClose, setOpen }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [otpModel, setOtpModel] = useState(false);
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      await saveUserDataToFirestore(result.user);
      toast.success("Signed in with Google successfully!");
      onClose();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google.");
    }
  };

  const handleSignUp = async () => {
    try {
      if (!userData.name || !userData.email || !userData.password) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      console.log("User signed up:", result.user);
      toast.success("Sign up successful!");
      await saveUserDataToFirestore(result.user);
      onClose();
    } catch (error) {
      console.error("Error signing up with email:", error);
      toast.error("Error signing up with email.");
    }
  };

  const handleLogin = async () => {
    try {
      if (!userData.email || !userData.password) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const result = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      console.log("User logged in:", result.user);
      toast.success("Login successful!");
      onClose();
    } catch (error) {
      console.error("Error logging in with email:", error);
      toast.error("Error logging in with email.");
    }
  };

  const handleOtpSignIn = async () => {
    toast.success("OTP sign-in is not implemented yet.");
    onClose();
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

  async function handleSubmit(e) {
    e.preventDefault();

    // Call onCaptchVerify to handle captcha verification
    onCaptchVerify(() => {
      onSignup({
        setLoading,
        onCaptchVerify,
        setSignupLoading,
        setOtpModel,
        setOpen,
        ph,
      });
    });
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: "column",
            width: "400px",
            padding: "16px",
          },
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          {tabIndex === 0
            ? "Login"
            : tabIndex === 1
            ? "Sign Up"
            : "OTP Sign In"}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="login options"
          >
            <Tab label="Email/Password" />
            <Tab label="Google" />
            <Tab label="OTP" />
          </Tabs>

          {tabIndex === 0 && (
            <>
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={userData.email}
                onChange={handleInputChange}
                sx={{ marginBottom: "16px" }}
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
              <Box width="100%" sx={{ marginTop: "8px" }}>
                <Button
                  onClick={handleLogin}
                  fullWidth
                  sx={{
                    background: "#4CAF50",
                    color: "#fff",
                    ":hover": { background: "#388E3C" },
                  }}
                  variant="contained"
                >
                  Sign In
                </Button>
              </Box>
            </>
          )}

          {tabIndex === 2 && (
            <>
              <PhoneInput
                country={"in"}
                value={ph}
                className="appearance-none border rounded w-full border-none"
                onChange={setPh}
                inputStyle={{ width: "240px" }}
              />
              <div id="recaptcha-container"></div>

              <div className="flex items-center justify-center">
                <button
                  onClick={handleSubmit} // Changed to handleSubmit directly
                  className="w-full hover:bg-white hover:text-black hover:border-red-600 border flex gap-1 items-center justify-center py-2 text-white rounded secondry-bg"
                >
                  {signupLoading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Sign up</span>
                </button>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {tabIndex === 1 && (
            <Box width="100%" sx={{ marginTop: "8px" }}>
              <Button
                onClick={handleGoogleSignIn}
                color="secondary"
                fullWidth
                startIcon={<GoogleIcon />}
                variant="contained"
                sx={{
                  background: "#4285F4",
                  color: "#fff",
                  ":hover": { background: "#357ae8" },
                }}
              >
                {tabIndex === 0 ? "Sign In with Google" : "Sign Up with Google"}
              </Button>
            </Box>
          )}
        </DialogActions>
      </Dialog>
      <Toaster />
      <Backdrop open={open}>
        <OtpContainer
          user={userData}
          setOpen={setOtpModel}
          loading={loading}
          setLoading={setLoading}
          phoneNo={ph}
        />
      </Backdrop>
    </>
  );
};

export default LoginDialog;
