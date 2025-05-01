// hooks/useConversation.js
import { useQuery } from '@tanstack/react-query';
import useAuth from "../context/useAuth"
import API_URL from "../api/api";
import axios from 'axios';

export const useConversation = (channelId) => {
  const {authToken} = useAuth();
  return useQuery({
    queryKey: ['conversation', channelId],
    queryFn: async () => {
      const { data } = await API_URL.get(
        `api/channels/${channelId}/conversation/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );
      return data;
    },
    enabled: !!channelId && !!authToken,
  });
};


// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// export const useConversation = (channelId) => {
//   return useQuery({
//     queryKey: ['conversation', channelId],
//     queryFn: async () => {
//       const { data } = await axios.get(
//         `http://127.0.0.1:8000/api/channels/${channelId}/conversation/`
//       );
//       return data;
//     },
//     enabled: !!channelId,
//   });
// };
