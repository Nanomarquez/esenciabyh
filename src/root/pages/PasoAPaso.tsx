import SimpleBackdrop from "@/components/Dialog";
import React from "react";
import Pabilos1 from "../../assets/Pabilos1.jpg";
import Pabilos2 from "../../assets/Pabilos2.jpg";
import Pabilos3 from "../../assets/Pabilos3.jpg";
import CeraSoja1 from "../../assets/CeraSoja1.jpg";
import CeraSoja2 from "../../assets/CeraSoja2.jpg";
import CeraSoja3 from "../../assets/CeraSoja3.jpg";
import CeraSoja4 from "../../assets/CeraSoja4.jpg";
import CeraAbeja1 from "../../assets/CeraAbeja1.jpg";
import CeraAbeja2 from "../../assets/CeraAbeja2.jpg";
import MoldeCeraSoja1 from "../../assets/MoldeCeraSoja1.jpg";
import MoldeCeraSoja2 from "../../assets/MoldeCeraSoja2.jpg";
function PasoAPaso() {
  const [open, setOpen] = React.useState(false);
  const [arrow, setArrow] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setContent(null);
  };
  const handleOpen = (content: any) => {
    setContent(content);
    setOpen(true);
  };
  const slideImages1 = [
    { img: Pabilos1 },
    { img: Pabilos2 },
    { img: Pabilos3 },
  ];
  const slideImages2 = [
    { img: CeraSoja1 },
    { img: CeraSoja2 },
    { img: CeraSoja3 },
    { img: CeraSoja4 },
  ];
  const slideImages3 = [{ img: CeraAbeja1 }, { img: CeraAbeja2 }];
  const slideImages4 = [{ img: MoldeCeraSoja1 }, { img: MoldeCeraSoja2 }];
  const divStyle = {
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  const slide1 = (
    <div className="flex flex-col overflow-y-scroll h-full">
      {slideImages1.map((slideImage, index) => (
        <div key={index} className="">
          <div
            style={{ ...divStyle, backgroundImage: `url(${slideImage.img})` }}
          ></div>
        </div>
      ))}
    </div>
  );
  const slide2 = (
    <div className="flex flex-col overflow-y-scroll h-full">
      {slideImages2.map((slideImage, index) => (
        <div key={index} className="">
          <div
            style={{ ...divStyle, backgroundImage: `url(${slideImage.img})` }}
          ></div>
        </div>
      ))}
    </div>
  );
  const slide3 = (
    <div className="flex flex-col overflow-y-scroll h-full">
      {slideImages3.map((slideImage, index) => (
        <div key={index} className="">
          <div
            style={{ ...divStyle, backgroundImage: `url(${slideImage.img})` }}
          ></div>
        </div>
      ))}
    </div>
  );
  const slide4 = (
    <div className="flex flex-col overflow-y-scroll h-full">
      {slideImages4.map((slideImage, index) => (
        <div key={index} className="">
          <div
            style={{ ...divStyle, backgroundImage: `url(${slideImage.img})` }}
          ></div>
        </div>
      ))}
    </div>
  );
  const [content, setContent] = React.useState(null);
  return (
    <div className="text-center h-screen w-full p-4 flex flex-col justify-center">
      <SimpleBackdrop
        open={open}
        handleClose={handleClose}
        content={content}
        arrow={arrow}
      />
      <h1 className="text-xl font-bold">Instructivos Esencia Body & Home</h1>
      <ol id="lista5" className="flex flex-col gap-4">
        <li>
          <button
            onClick={() => {
              handleOpen(slide1);
              setArrow(true);
            }}
          >
            Como hacer velas de soja en recipiente
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(slide2);
              setArrow(true);
            }}
          >
            Como hacer velas de molde con cera de abeja
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(slide3);
              setArrow(true);
            }}
          >
            Como hacer velas de molde con cera APF
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(slide4);
              setArrow(true);
            }}
          >
            Guía de pabilos
          </button>
        </li>
      </ol>
    </div>
  );
}

export default PasoAPaso;
