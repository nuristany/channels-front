import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { useCategories } from "../hooks/useCategories";
import { Link } from "react-router-dom";

const PopularChannels = ({ open }) => {
  const { data: categories, isLoading, error } = useCategories();
  const BASE_URL = "http://localhost:8000";

  if (isLoading) {
    return <Typography sx={{ p: 2 }}>Loading categories...</Typography>;
  }

  if (error) {
    return (
      <Typography sx={{ p: 2 }} color="error">
        Error loading categories
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <List dense>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat) => {
            let iconUrl = cat.media?.[0]?.icon;
            if (iconUrl && !iconUrl.startsWith("http")) {
              iconUrl = `${BASE_URL}${iconUrl}`; // Prepend BASE_URL if it's a relative URL
            }

            console.log("Icon_URL", iconUrl);

            return (
              <ListItem key={cat.id} disablePadding>
                <ListItemButton component={Link} to={`/category/${cat.id}`}>
                  {open && (
                    <ListItemAvatar>
                      <Avatar src={iconUrl || undefined} alt={cat.name} />
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    primary={open ? cat.name : ""}
                    secondary={
                      open ? cat.description || "No description available" : ""
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <Typography sx={{ p: 2 }}>No categories available</Typography>
        )}
      </List>
    </React.Fragment>
  );
};

export default PopularChannels;
