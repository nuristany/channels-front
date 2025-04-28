import React from "react";
import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "../components/Main";
import PopularChannels from "../components/PopularChannels";
import ExploreCategoryList from "../components/ExplorCategoryList";
import Chat from "./Chat";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <PopularChannels />
      </PrimaryDraw>
      <SecondaryDraw>
        <ExploreCategoryList />
      </SecondaryDraw>
      <Main>
        <Chat />
      </Main>
    </Box>
  );
};

export default Home;
