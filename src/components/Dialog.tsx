import Backdrop from "@mui/material/Backdrop";
import { Slideshow } from "./Slide";
import { Box, Theme, useMediaQuery } from "@mui/material";
import Close from "../assets/close.svg";
export default function SimpleBackdrop({
  open,
  handleClose,
}: Readonly<{ open: boolean; handleClose: () => void }>) {
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
        <Box
          onClick={handleClose}
          className="absolute z-50 right-16 top-16 cursor-pointer"
        >
          <img src={Close} alt="close" />
        </Box>
        <Slideshow></Slideshow>
      </Box>
    </Backdrop>
  );
}
