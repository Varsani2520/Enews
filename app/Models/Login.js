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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/auth";

const LoginDialog = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

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
      console.log("User signed in:", result.user);
      await saveUserDataToFirestore(result.user);
      onClose();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      // Validate all required fields are filled
      if (
        !userData.name ||
        !userData.email ||
        !userData.password ||
        !userData.phone
      ) {
        console.error("Please fill in all required fields.");
        return;
      }

      // Example: Sign up with phone number
      const phoneNumber = userData.phone;
      const appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      console.log("Verification code sent to", phoneNumber);

      // Show OTP input fields
      setShowOTPInput(true);
    } catch (error) {
      console.error("Error signing up with phone number:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const result = await auth.signInWithCredential(credential);
      console.log("User signed in with phone:", result.user);

      // Save user data to Firestore
      await saveUserDataToFirestore(result.user);
      onClose();
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const saveUserDataToFirestore = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDataToSave = {
        name: userData.name || user.displayName,
        email: userData.email || user.email,
        phoneNumber: userData.phone || user.phoneNumber || "",
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
        {!isLogin && !showOTPInput && (
          <>
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
            <PhoneInput
              country={"us"}
              inputProps={{
                id: "phone",
                name: "phone",
                required: true,
                autoFocus: false,
              }}
              containerStyle={{ marginTop: "16px", width: "100%" }}
              inputStyle={{ width: "100%" }}
              value={userData.phone}
              onChange={(phone) => setUserData({ ...userData, phone })}
            />
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
           
          </>
        )}
        {!isLogin && showOTPInput && (
          <>
            {[...Array(6)].map((_, index) => (
              <TextField
                key={index}
                autoFocus={index === 0}
                margin="dense"
                id={`otp${index}`}
                label={`OTP ${index + 1}`}
                type="text"
                fullWidth
                variant="outlined"
                value={verificationCode[index] || ""}
                onChange={(e) => {
                  const newVerificationCode = [...verificationCode];
                  newVerificationCode[index] = e.target.value;
                  setVerificationCode(newVerificationCode);
                }}
              />
            ))}
            <Button
              onClick={handleVerifyOTP}
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
              fullWidth
            >
              Verify OTP
            </Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!showOTPInput && (
          <Box width="100%">
            <Button
              onClick={handleSignUp}
              sx={{ background: "#f20404" }}
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
          </Box>
        )}
        {!showOTPInput && (
          <Box width="100%">
            <Button
              onClick={handleGoogleSignIn}
              color="secondary"
              fullWidth
              startIcon={<GoogleIcon />}
              variant="contained"
            >
              Sign Up with Google
            </Button>
          </Box>
        )}
        {!showOTPInput && (
          <Box width="100%">
            <Button
              onClick={toggleLogin}
              fullWidth
              variant="text"
              color="primary"
            >
              Already have an account? Login
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
