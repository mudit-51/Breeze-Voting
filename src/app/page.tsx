"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import GoogleButton from "./components/GoogleButton";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email?.endsWith("@snu.edu.in")) {
        router.push("/vote");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email !== null && email !== undefined && email.endsWith("@snu.edu.in")) {
        setError("");
        router.push("/vote");
      } else {
        setError("Please use your university email to sign in.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign-in.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
        <div
          className="border-4 border-black bg-white custom-rounded"
          style={{ width: 534, height: 310 }}
        >
          <div>
            <div
              className="flex space-x-4 mt-6"
              style={{ marginLeft: 40, marginTop: 33 }}
            >
              <span className="text-black font-bold login-text-1 font-actor ">
                Hello,
              </span>
              <span className="text-black italic login-text-2">Welcome!</span>
            </div>
            <p className="login-text-sub font-Nohemi">
              Get ready for the biggest fest of SNU!
            </p>
          </div>

          <div>
            <div style={{ width: 450, marginLeft: 40 }}>
              <GoogleButton onClick={handleGoogleLogin} />
            </div>

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
          </div>
        </div>
    </div>
  );
}