// import React, { createContext, useContext, useEffect, useState } from "react";
// import API_URL from "../api/api";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(() =>
//     localStorage.getItem("authToken")
//       ? JSON.parse(localStorage.getItem("authToken"))
//       : null
//   );
//   const [user, setUser] = useState(null);

//   const loginUser = async (email, password) => {
//     try {
//       const { data } = await API_URL.post("/auth/jwt/create/", {
//         email,
//         password,
//       });

//       setAuthToken(data.access);
//       localStorage.setItem("authToken", JSON.stringify(data.access));
//       await getUser(data.access);
//       return true;
//     } catch (err) {
//       console.error("Login error:", err);
//       return false;
//     }
//   };

//   const logoutUser = () => {
//     setAuthToken(null);
//     setUser(null);
//     localStorage.removeItem("authToken");
//   };

//   const getUser = async (JWT) => {
//     try {
//       const { data } = await API_URL.get("/auth/users/me/", {
//         headers: {
//           Authorization: `Bearer ${JWT}`,
//         },
//       });
//       setUser(data);
//     } catch (err) {
//       console.error("Get user error:", err);
//     }
//   };

//   useEffect(() => {
//     if (authToken) {
//       getUser(authToken); // 🔥 It's a plain token string
//     }
//   }, [authToken]);

//   return (
//     <AuthContext.Provider value={{ user, authToken, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export { AuthContext };          
// export default AuthProvider;

// import { createContext, useContext, useEffect, useState } from "react";
// import authURL from "../api/auth_api";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(() =>
//     localStorage.getItem("authToken")
//       ? JSON.parse(localStorage.getItem("authToken"))
//       : null
//   );
//   console.log("authToken", authToken);
//   const [user, setUser] = useState(null);

//   const loginUser = async (email, password) => {
//     try {
//       const { data } = await authURL.post("/auth/jwt/create", {
//         email,
//         password,
//       });

//       setAuthToken(data.access);
//       localStorage.setItem("authToken", JSON.stringify(data.access));
//       await getUser(data.access);
//       return true;
//     } catch (err) {
//       return false;
//     }
//   };

//   const logoutUser = () => {
//     setAuthToken(null);
//     setUser(null);
//     localStorage.removeItem("authToken");
//   };

//   const getUser = async (authToken) => {
//     try {
//       const { data } = await authURL.get("/auth/users/me/", {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       setUser(data);
//     } catch (err) {
//       console.error("Get user error:", err);
//     }
//   };

//   useEffect(() => {
//     if (authToken) {
//       getUser(authToken);
//     }
//   }, [authToken]);

//   return (
//     <AuthContext.Provider value={{ user, authToken, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext };
// export default AuthProvider;

import { createContext, useContext, useEffect, useState } from "react";
import authURL from "../api/auth_api";
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  console.log("AuthToken", authToken)
  const [user, setUser] = useState(null);

  // Check if the token has expired
  const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);

    return decoded.exp * 1000 < Date.now(); // Token expiration time is in seconds
  };

  // Handle user login
  const loginUser = async (email, password) => {
    try {
      const { data } = await authURL.post("/auth/jwt/create/", {
        email,
        password,
      });
      console.log("Data", data)

      setAuthToken(data.access);
      localStorage.setItem("authToken", JSON.stringify(data.access));
      await getUser(data.access); // Fetch user data after login
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // Handle user logout
  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  // Get user data using the auth token
  const getUser = async (authToken) => {
    if (isTokenExpired(authToken)) {
      console.log("Token expired");
      logoutUser(); // Log out if the token has expired
      return;
    }

    try {
      const { data } = await authURL.get("/auth/users/me/", {
          headers: {
              Authorization: `Bearer ${authToken}`,
            },
        });
        console.log("User:", data)
      setUser(data);
    } catch (err) {
      console.error("Get user error:", err);
      // Optionally, handle session expiration or token refresh here
    }
  };

  useEffect(() => {
    if (authToken) {
      getUser(authToken); // Fetch user data if the auth token is present
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ user, authToken, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
