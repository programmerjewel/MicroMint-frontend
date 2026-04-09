import { createContext, useEffect, useState } from "react";
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

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
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

  const updateUser = async (name, image) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { 
        displayName: name, 
        photoURL: image 
    });
    
    // Crucial: Manually update local state with the new values
    const updatedUser = { ...auth.currentUser, displayName: name, photoURL: image };
    setUser(updatedUser);
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
      setUser(currentUser);
      if (currentUser?.email && currentUser?.displayName) {
        try {
          const userInfo = {
            name: currentUser.displayName,
            image: currentUser.photoURL,
            email: currentUser.email,
          };

          await axiosSecure.post(`/users/${currentUser.email}`, userInfo);
          await axiosSecure.post("/jwt", { email: currentUser.email });
        } catch (err) {
          console.error("Auth Sync Error:", err);
        }
      }

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