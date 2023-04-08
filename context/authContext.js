import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if (!user) {
      me();
    }
  }, [user]);
  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      const re = await axios.post("api/auth/login", {
        username,
        password,
      });
      if (re.data.success) {
        me();
        setIsAuth(true);
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const me = async () => {
    try {
      setLoading(true);
      const re = await axios.get(`/api/auth/me`);
      if (re.data.user) {
        setIsAuth(true);
        setLoading(false);
        setUser(re.data.user);
      }
    } catch (err) {
      setLoading(false);
      setIsAuth(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      const re = await axios.post("api/auth/logout");
      if (re.data.success) {
        setIsAuth(false);
        setUser(null);
      }
    } catch (err) {
      setLoading(false);
      setIsAuth(false);
      setUser(null);
      setError(err);
    }
  };

  const register = async ({ first_name, last_name, email, password }) => {
    try {
      setLoading(true);
      console.log(first_name, last_name, email, password);
      const re = await axios.post(`${process.env.API_URL}/api/register`, {
        first_name,
        last_name,
        email,
        password,
      });
      if (re.data) {
        setLoading(false);
        router.push("/login");
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const uploadCv = async (formData, accessToken) => {
    try {
      setLoading(true);
      const re = await axios.put(
        `${process.env.API_URL}/api/current_user/cv`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (re.data) {
        setLoading(false);
        setUploaded(true);
      }
    } catch (err) {
      setLoading(false);
      setUploaded(false);
      setError(err);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        isAuth,
        error,
        login,
        me,
        logout,
        register,
        clearErrors,
        uploadCv,
        uploaded,
        setUploaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
