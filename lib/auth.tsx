import React, { createContext, useContext, useEffect, useState } from "react";
import { api, publicApi } from "./api";
import Cookies from "js-cookie";
import lang from "@/constants/lang";

export default interface User {
  name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  photo?: string;
  phone?: string;
  avatar: any;
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("provider reset");
    if (!user) {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userObject = JSON.parse(userCookie.toString());
        console.log("user recovered from cookie", userObject);
        setUser(userObject);
      }
    }
  }, []);

  const handleUser = (user) => {
    if (user) {
      setUser(user);
      Cookies.set("token", user.token, {
        expires: 0.001, // days
      });
      Cookies.set("user", user, {
        expires: 0.01, // days
      });
      //tengo sesión activa
      return user;
    } else {
      // no tengo sesión activa
      setUser(false);
      Cookies.remove("token");
      return false;
    }
  };

  async function login(user: User) {
    try {
      const response = await publicApi.post("/login", user);
      handleUser(response.data.user);
      return { status: "success" };
    } catch (error) {
      if (error.response) {
        return {
          status: "error",
          message: lang(error.response.data.message),
        };
      } else if (error.request) {
        console.log("error.request", error.request);
        return { status: "error", message: null };
      } else {
        console.log("error.config", error.config);
        return { status: "error", message: null };
      }
    }
  }

  async function checkCredentials(credentials) {
    try {
      const response = await publicApi.post("/check", credentials);
      return { status: "success" };
    } catch (error) {
      if (error.response) {
        return {
          status: "error",
          message: lang(error.response.data.message),
        };
      } else if (error.request) {
        console.log("error.request", error.request);
        return { status: "error", message: null };
      } else {
        console.log("error.config", error.config);
        return { status: "error", message: null };
      }
    }
  }

  async function register(user: User) {
    var form_data = new FormData();

    for (var key in user) {
      if (key == "avatar") {
        const avatarFile = user["avatar"];

        form_data.append("avatar", avatarFile, avatarFile.fileName);
        continue;
      }
      form_data.append(key, user[key]);
    }

    try {
      const response = await publicApi.post("/register", form_data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data;`,
        },
      });

      const savedUser = response.data.user;
      Cookies.set("user", savedUser);
      handleUser(savedUser);
      return [savedUser, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  async function logout() {
    try {
      const token = Cookies.get("token");

      const response = api.post("/logout", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      return [response, null];
    } catch (error) {
      return [null, error];
    } finally {
      Cookies.remove("user");
      Cookies.remove("token");
      handleUser(false);
    }
  }

  const sendPasswordResetEmail = async (email) => {
    await api.post("/forgot-password", { email });
  };

  const confirmPasswordReset = async (
    email,
    password,
    password_confirmation,
    token
  ) => {
    await api.post("/reset-password", {
      email,
      password,
      password_confirmation,
      token,
    });
  };

  async function getAuthenticatedUser(token) {
    try {
      const token = Cookies.get("token");
      const response = await api.get("/user", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const user = response?.data?.user || null;
      console.log("auth user", user);
      return { status: "success", user };
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    return { status: "error" };
  }

  useEffect(() => {
    console.log("user changed to:", user);
  }, [user]);

  return {
    user,
    register,
    login,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    getAuthenticatedUser,
    handleUser,
    checkCredentials,
  };
}
