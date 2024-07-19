// utils/onCaptchVerify.js

import { getAuth, RecaptchaVerifier } from "firebase/auth";

export function onCaptchVerify(onSignupCallback) {
  const authInstance = getAuth();
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // Callback logic after captcha verification
          onSignupCallback(); // Call your signup function after verification
        },
      },
      authInstance
    );
  }
}
