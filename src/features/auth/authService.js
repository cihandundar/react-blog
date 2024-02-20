import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const register = async (email, password, userName) => {
  const userResponse = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userResponse.user, {
    displayName: userName,
  });

  if (userResponse.user) {
    localStorage.setItem("user", JSON.stringify(userResponse.user));
  }

  return userResponse.user;
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
};

const login = async (email, password) => {
  const useResponse = await signInWithEmailAndPassword(auth, email, password);

  if (useResponse.user) {
    localStorage.setItem("user", JSON.stringify(useResponse.user));
  }

  return useResponse.user;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
