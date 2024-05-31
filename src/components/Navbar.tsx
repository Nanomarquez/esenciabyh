import Click from "../assets/click.svg";
function Navbar({
  handleOpen,
}: Readonly<{
  handleOpen: () => void;
}>) {
  return (
    <>
      <button
        onClick={handleOpen}
        className="absolute left-0 text-white z-20 mt-4 ml-2"
      >
        <img src={Click} alt="click" width={36} height={36} />
      </button>
      <nav className="flex items-center flex-col bg-black h-16 text-white justify-center relative">
        <span className="text-2xl font-semibold">ESENCIA</span>
        <p>
          Body <span className="font-bold">&</span> Home
        </p>
      </nav>
    </>
  );
}

export default Navbar;
