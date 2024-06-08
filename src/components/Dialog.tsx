import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/material";
import Close from "../assets/close.svg";
import Arrow from "../assets/arrow.svg";
export default function SimpleBackdrop({
  open,
  handleClose,
  content,
  arrow,
}: Readonly<{
  open: boolean;
  handleClose: () => void;
  content: any;
  arrow: boolean;
}>) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          padding: "0px",
          position: "relative",
        }}
      >
        <Box
          onClick={handleClose}
          className="absolute z-50 right-4 top-28 cursor-pointer"
        >
          <img src={Close} alt="close" />
        </Box>
        {content}
        {arrow && (
          <Box
            className="absolute z-[999999999999999999999] w-14 animate-bounce rotate-90 right-3 bottom-28 cursor-pointer"
          >
            <img src={Arrow} alt="arrow" />
          </Box>
        )}
      </Box>
    </Backdrop>
  );
}
