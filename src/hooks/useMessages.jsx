
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// export const useMessages = (conversationId) => {
//   return useQuery({
//     queryKey: ['messages', conversationId],
//     queryFn: async () => {
//       const response = await axios.get(`http://127.0.0.1:8000/api/messages/conversation/${conversationId}/`);
//       console.log("Messaage data:", response.data); // Log the response data
//       return response.data;
//     },
//     enabled: !!conversationId, // Only fetch messages if conversationId is available
//     onError: (error) => {
//       console.error("Error fetching messages:", error);
//     },
//     onSuccess: (data) => {
//       console.log("Successfully fetched messages:", data);
//     },
//   });
// };


// hooks/useMessages.js


import { useQuery } from '@tanstack/react-query';
import useAuth from "../context/useAuth"
import axios from 'axios';
import API_URL from '../api/api';

export const useMessages = (conversationId) => {
  const {authToken} = useAuth();
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/api/messages/conversation/${conversationId}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!conversationId && !!authToken,
  });
};



// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// export const useMessages = (conversationId) => {
//   return useQuery({
//     queryKey: ['messages', conversationId],
//     queryFn: async () => {
//       const { data } = await axios.get(
//         `http://127.0.0.1:8000/api/messages/conversation/${conversationId}/`
//       );
//       return data;
//     },
//     enabled: !!conversationId,
//   });
// };
