// import { cookies } from "next/headers";
// import { createContext, useEffect, useState } from "react";

// interface AuthContextType {
//   logout: () => void;
//   isLogged: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isLogged, setIsLogged] = useState<boolean>(false);
//   const [accessToken, setAccessToken] = useState<string | null>();
//   const [refreshToken, setRefreshToken] = useState<string | null>();

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const accessToken = await cookies.getItem("accessToken");
//         const refreshToken = await storage.getItem("refreshToken");

//         if (accessToken || refreshToken) {
//           setAccessToken(accessToken);
//           setRefreshToken(refreshToken);

//           setIsLogged(true);
//         } else {
//           router.replace("/(auth)/login");
//         }
//       } catch (error) {
//         console.error("Failed to fetch the token from storage", error);
//       }
//     };

//     checkToken();
//   }, []);

//   const refetchToken = useCallback(async () => {
//     if (!accessToken || !refreshToken) {
//       console.log("No token found");

//       router.replace("/(auth)/login");
//       return;
//     }

//     console.log("token found");
//     const validate = await AuthService.validationToken()
//       .then((data) => {
//         return data;
//       })
//       .catch((error) => {
//         return error;
//       });
//     console.log("validate", validate.status);

//     if (validate.status === 401) {
//       const response = await AuthService.refreshToken(refreshToken)
//         .then((data) => {
//           return data;
//         })
//         .catch((error) => error);
//       if (response.status === 401) {
//         console.log("refresh token failed", response);

//         router.replace("/(auth)/login");
//       } else {
//         console.log("refresh token success");
//         await storage.setItem("accessToken", response.accessToken);
//         await storage.setItem("refreshToken", response.refreshToken);

//         setAccessToken(response.accessToken);
//         setRefreshToken(response.refreshToken);
//       }
//     } else {
//       console.log("Don't need to refresh token");

//       return;
//     }

//     console.log("------------------");
//   }, [accessToken, refreshToken]);

//   useEffect(() => {
//     refetchToken();
//   }, []);

//   const logout = async () => {
//     await storage.removeItem("accessToken");
//     await storage.removeItem("refreshToken");

//     router.replace("/(auth)/login");
//   };

//   return (
//     <AuthContext.Provider value={{ logout, isLogged }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };
