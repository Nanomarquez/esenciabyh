import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { Slideshow } from "./Slide";
import { Box, Button, Theme, useMediaQuery } from "@mui/material";
import Close from "../assets/close.svg";
export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Box
        sx={{
          width: isMobile ? "100vw" : "80vw",
          height: "100vh",
          padding: "50px",
          position: "relative",
        }}
      >
        <Box className="absolute z-50 right-16 top-16">
            <img src={Close} alt="close" />
        </Box>
        <Slideshow></Slideshow>
      </Box>
    </Backdrop>
  );
}
