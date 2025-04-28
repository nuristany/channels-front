// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../context/useAuth";
// import API_URL from "../api/api";

// const fetchCategories = async () => {
//   const { authToken, user } = useAuth();
//   try {
//     const response = await API_URL.get(`/channel-categories/token = ${authToken}`);
//     console.log("API data categories", response.data);
//     return response.data; // ✅ Axios automatically parses JSON
//   } catch (error) {
//     throw new Error("Failed to fetch categories: " + error.message);
//   }
// };


// export const useCategories = () => {
//   return useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });
// };

import { useQuery } from "@tanstack/react-query";
import useAuth from "../context/useAuth";
import API_URL from "../api/api";

// Moved token to be passed in as argument
const fetchCategories = async (token) => {
  try {
    const response = await API_URL.get("/channel-categories/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API data categories", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories: " + error.message);
  }
};

export const useCategories = () => {
  const { authToken } = useAuth(); // ✅ hook used properly here

  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(authToken),
    enabled: !!authToken, // ✅ don't run if no token
  });
};
