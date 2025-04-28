import {
  useTheme,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from "@mui/material";
import { useChannels } from "../hooks/useChannels";
import { useParams, Link as RouterLink } from "react-router-dom";
import { forwardRef } from "react";

// Custom LinkBehavior for MUI to work correctly with react-router
const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  return <RouterLink ref={ref} {...props} />;
});

const ExploreCategoryList = () => {
  const { categoryId } = useParams();
  const { data: channels, isLoading, error } = useChannels(categoryId || null);
  const theme = useTheme();
  const BASE_URL = "https://channels-backend-production.up.railway.app";

  return (
    <>
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          pr: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
          zIndex: 1000,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Explore
        </Typography>
      </Box>

      <List>
        {isLoading && <Typography sx={{ p: 2 }}>Loading channels...</Typography>}
        {error && (
          <Typography color="error" sx={{ p: 2 }}>
            Failed to load channels
          </Typography>
        )}
        {!isLoading && channels?.length === 0 && (
          <Typography sx={{ p: 2 }}>No channels found for this category.</Typography>
        )}

        {channels?.map((channel) => {
          const iconUrl = channel.media?.length > 0 && channel.media[0].icon
            ? channel.media[0].icon.startsWith("http")
              ? channel.media[0].icon // If the URL is absolute, use it as is
              : `${BASE_URL}${channel.media[0].icon}` // If the URL is relative, prepend BASE_URL
            : null;

          return (
            <ListItem key={channel.id} disablePadding>
              <ListItemButton
                component={LinkBehavior}
                to={`/channel/${channel.id}/chat`}
              >
                <ListItemAvatar>
                  {iconUrl ? (
                    <Avatar
                      src={iconUrl}
                      alt={channel.name}
                      sx={{ width: 25, height: 25, mr: 1 }}
                    />
                  ) : (
                    <Avatar>{channel.name?.charAt(0).toUpperCase() || "C"}</Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText primary={channel.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default ExploreCategoryList;
