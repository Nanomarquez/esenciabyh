import { Slideshow } from "@/components/shared/Slide";
import { Box } from "@mui/material";
import React from "react";

function Home() {
  return (
    <div className="w-full flex justify-center items-center">
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Slideshow></Slideshow>
      </Box>
    </div>
  );
}

export default Home;
