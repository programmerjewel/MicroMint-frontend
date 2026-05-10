import { createContext, useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "@/firebase/firebase.init";
import { axiosSecure } from "@/hooks/useAxiosSecure";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSigningUp = useRef(false);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    isSigningUp.current = true;
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

const updateUser = async (name, image, role = null) => {
  if (!auth.currentUser) return;

  await updateProfile(auth.currentUser, { displayName: name, photoURL: image });

  // 1. JWT first
  await axiosSecure.post("/jwt", { email: auth.currentUser.email });

  // 2. Save user to DB
  await axiosSecure.post("/users", {
    name,
    image,
    email:    auth.currentUser.email,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...(role && { role }),
  });

  // 3. Set user state after token is ready
  const updatedUser = { ...auth.currentUser, displayName: name, photoURL: image };
  setUser(updatedUser);
  isSigningUp.current = false;
  return updatedUser;
};

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await axiosSecure.post("/logout"); 
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

    if (isSigningUp.current) {
      setLoading(false);
      return;
    }

    if (currentUser?.email) {
      try {
        // 1. Get JWT first — before setUser triggers any protected API calls
        await axiosSecure.post("/jwt", { email: currentUser.email });

        const isGoogleUser = currentUser.providerData?.[0]?.providerId === "google.com";
        if (isGoogleUser) {
          await axiosSecure.post("/users", {
            name:     currentUser.displayName,
            image:    currentUser.photoURL,
            email:    currentUser.email,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
        }
      } catch (err) {
        console.error("Auth Sync Error:", err);
      }
    } else {
      // Logged out — clear JWT cookie
      await axiosSecure.post("/logout").catch(() => {});
    }

    // 2. Set user AFTER JWT is ready — components render with token already set
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    loginWithGoogle,
    updateUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;