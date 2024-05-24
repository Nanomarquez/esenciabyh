import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Step1 from "../assets/step1.webp";
import Step2 from "../assets/step2.webp";
import Step3 from "../assets/step3.webp";
const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "80vh",
  width: "100vw",
};
const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 1",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Slide 2",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 3",
  },
];

export const Slideshow = () => {
  return (
    <Slide autoplay={false}>
      <div className="bg-white text-center sm:px-40 gap-5 p-12 h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-black text-2xl font-medium sm:text-3xl">
          TUS VELAS EN 3 PASOS
        </h1>
        <p className="text-slate-500 text-sm sm:text-xl">
          Te dejamos este paso a paso para que puedas armar tus propias velas y
          aromatizar tus ambientes con nuestras fragancias que más te gusten.
          También podés crear para regalar o para emprender! Para ayudarte con
          las cantidades, podes usar nuestra calculadora de velas!
        </p>
      </div>
      <div className="bg-white text-black sm:px-40 gap-5 p-12 h-[80vh] flex items-center justify-center flex-col sm:flex-row">
        <div className="flex">
          <span className="text-5xl sm:text-8xl text-[#E8ABAB] font-bold">
            1.
          </span>
          <div>
            <span className="font-semibold">DISOLVER</span>
            <p className="text-sm text-slate-500">
              En una olla apta para baño maría disolvé el porcentaje elegido de
              endurecedor, y luego agregale la cantidad de cera que vayas a
              utilizar. No olvides colocar la esencia con ese aroma que te
              encanta!
            </p>
          </div>
        </div>
        <img src={Step1} alt="" />
      </div>
      <div className="bg-white text-black sm:px-40 gap-5 p-12 h-[80vh] flex items-center justify-center flex-col sm:flex-row">
        <div className="flex">
          <span className="text-5xl sm:text-8xl text-[#E8ABAB] font-bold">
            2.
          </span>
          <div>
            <span className="font-semibold">PREPARÁ</span>
            <p className="text-sm text-slate-500">
              Prepará el o los envases que vayas a utilizar, colocandole el
              ojalillo y pabilo adecuado.
            </p>
          </div>
        </div>
        <img src={Step2} alt="" />
      </div>
      <div className="bg-white text-black sm:px-40 gap-5 p-12 h-[80vh] flex items-center justify-center flex-col sm:flex-row">
        <div className="flex">
          <span className="text-5xl sm:text-8xl text-[#E8ABAB] font-bold">
            3.
          </span>
          <div>
            <span className="font-semibold">RELLENÁ</span>
            <p className="text-sm text-slate-500">
              Volca la cera en los recipientes, antes de que empiece a
              solidificarse. Dejalo secar durante 24hs. Lo ideal es aguardar 15
              días para encenderla.
            </p>
          </div>
        </div>
        <img src={Step3} alt="" />
      </div>
    </Slide>
  );
};

// export const Slideshow = () => {
//   return (
//     <Slide autoplay={false}>
//       {slideImages.map((slideImage, index) => (
//         <div
//           style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
//         >asd</div>
//       ))}
//     </Slide>
//   );
// };
