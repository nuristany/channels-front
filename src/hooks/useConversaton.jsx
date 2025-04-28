// hooks/useConversation.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useConversation = (channelId) => {
  return useQuery({
    queryKey: ['conversation', channelId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://channels-backend-production.up.railway.app/api/channels/${channelId}/conversation/`
      );
      return data;
    },
    enabled: !!channelId,
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
