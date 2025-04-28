import { useQuery } from "@tanstack/react-query";
import useAuth from "../context/useAuth";
import API_URL from "../api/api";

// ✅ Accept both queryKey and authToken via closure
const fetchChannels = async ({ queryKey }) => {
  const [_key, categoryId, authToken] = queryKey; // Destructure token from queryKey

  try {
    const response = await API_URL.get("/channels/", {
      params: categoryId ? { category_id: categoryId } : {},
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("API data channel", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch channels: " + error.message);
  }
};

export const useChannels = (categoryId) => {
  const { authToken } = useAuth();

  return useQuery({
    queryKey: ["channels", categoryId, authToken], // ✅ Pass token through queryKey
    queryFn: fetchChannels,
    enabled: !!authToken, // ✅ Wait for token
  });
};
