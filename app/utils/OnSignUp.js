"use client";

import toast from "react-hot-toast";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

export async function onSignup({
  setLoading,
  onCaptchVerify,
  setSignupLoading,
  setOtpModel,
  setOpen,
  ph,
}) {
  // setLoading(true);
  // setSignupLoading(true);
  onCaptchVerify();

  const appVerifier = window.recaptchaVerifier;

  const formatPh = "+" + ph;
  console.log("pghone", formatPh);

  // if appverifier is done -> send otp to particular number
  signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      toast.success("OTP sended successfully!");
      setOpen(false);
      setLoading(false);
      setSignupLoading(false);
      setOtpModel(true);
    })
    .catch((error) => {
      console.log("error in sending otp", error);
    });
}
