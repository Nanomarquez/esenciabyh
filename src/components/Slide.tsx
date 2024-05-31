import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useState } from "react";
import Step1 from "../assets/step1.webp";
import Step2 from "../assets/step2.webp";
import Step3 from "../assets/step3.webp";

export const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      type: "intro",
      content: (
        <div className="bg-white text-center sm:px-40 gap-5 p-6 sm:p-12 h-[80vh] flex items-center justify-center flex-col">
          <h1 className="text-black text-2xl font-medium sm:text-3xl">
            TUS VELAS EN 3 PASOS
          </h1>
          <p className="text-slate-500 text-sm sm:text-xl">
            Te dejamos este paso a paso para que puedas armar tus propias velas
            y aromatizar tus ambientes con nuestras fragancias que más te
            gusten. También podés crear para regalar o para emprender! Para
            ayudarte con las cantidades, podes usar nuestra calculadora de
            velas!
          </p>
        </div>
      ),
      step: 0,
    },
    {
      type: "step",
      image: Step1,
      title: "DISOLVER",
      description:
        "En una olla apta para baño maría disolvé el porcentaje elegido de endurecedor, y luego agregale la cantidad de cera que vayas a utilizar. No olvides colocar la esencia con ese aroma que te encanta!",
      step: 1,
    },
    {
      type: "step",
      image: Step2,
      title: "PREPARÁ",
      description:
        "Prepará el o los envases que vayas a utilizar, colocandole el ojalillo y pabilo adecuado.",
      step: 2,
    },
    {
      type: "step",
      image: Step3,
      title: "RELLENÁ",
      description:
        "Volca la cera en los recipientes, antes de que empiece a solidificarse. Dejalo secar durante 24hs. Lo ideal es aguardar 15 días para encenderla.",
      step: 3,
    },
  ];

  const properties = {
    autoplay: false,
    indicators: true,
    arrows: true,
    prevArrow: (
      <button
        type="button"
        className={`${
          current === 0 ? "hidden" : "block"
        } bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full`}
      >
        &#10094;
      </button>
    ),
    nextArrow: (
      <button
        type="button"
        className={`${
          current === slides.length - 1 ? "hidden" : "block"
        } bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full`}
      >
        &#10095;
      </button>
    ),
    onChange: (_previous: number, next: number) => {
      setCurrent(next);
    },
  };

  return (
    <Slide {...properties} transitionDuration={350}>
      {slides.map((slide) => (
        <div
          key={slide.step}
          className="bg-white text-black sm:px-40 gap-5 p-6 sm:p-12 h-[80vh] flex items-center justify-center flex-col sm:flex-row"
        >
          {slide.type === "intro" ? (
            slide.content
          ) : (
            <>
              <div className="flex">
                <span className="text-5xl sm:text-8xl text-[#E8ABAB] font-bold">
                  {slide.step}.
                </span>
                <div>
                  <span className="font-semibold">{slide.title}</span>
                  <p className="text-sm text-slate-500">{slide.description}</p>
                </div>
              </div>
              <img src={slide.image} alt="" />
            </>
          )}
        </div>
      ))}
    </Slide>
  );
};
