import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import BannerBlends from "../../assets/Banner-Blends-2-scaled.jpg";
import BannerMoldes from "../../assets/Banner-moldes-velas-scaled.jpg";
import BannerJabones from "../../assets/Banner-Jabones-scaled.jpg";
import BannerEsencias from "../../assets/Banner-esencias-gourmet2.jpg";
import BannerCO from "../../assets/CO0A0535.jpg";

export const Slideshow = () => {

  const slides = [
    {
      key: 0,
      content: (
        <div
          className="text-center sm:px-40 gap-5 p-6 sm:p-12 h-full w-full flex items-center justify-center flex-col"
          style={{
            backgroundImage: `url(${BannerBlends})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-[#F74CE6] text-6xl font-black">BLENDS</h1>
          <h2 className="text-white text-5xl font-extrabold">
            Los aromas más exclusivos
          </h2>
          <a className="bg-white p-3 font-semibold" href="https://www.esenciabodyandhome.com.ar/product-category/esencias-puras-2/esencias-blends/">VER MÁS</a>
        </div>
      ),
    },
    {
      key: 1,
      content: (
        <div
          className="text-center sm:px-40 gap-5 p-6 sm:p-12 h-full w-full flex items-center justify-center flex-col"
          style={{
            backgroundImage: `url(${BannerMoldes})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-[#E8ABAB] p-2 text-4xl text-white rounded-md shadow-md">
            <p className="dancing-script">Moldes para que hagas</p>
            <p className="poppins font-black">velas increíbles</p>
          </div>
          <a href="https://www.esenciabodyandhome.com.ar/product-category/moldes-para-velas/" className="bg-[#E8ABAB] text-white p-3 font-semibold rounded-md shadow-md">
            VER MÁS
          </a>
        </div>
      ),
    },
    {
      key: 2,
      content: (
        <div
          className="text-center sm:px-40 gap-5 p-6 sm:p-12 h-full w-full flex items-center justify-center flex-col"
          style={{
            backgroundImage: `url(${BannerJabones})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-[#b7d8bd] p-2 text-4xl text-white rounded-md shadow-md">
            <p className="dancing-script">NEW IN</p>
            <p className="poppins font-black">
              Moldes para lograr jabones únicos y atractivos.
            </p>
          </div>
          <a href="https://www.esenciabodyandhome.com.ar/product-category/todo-jabones/moldes-silicona/" className="bg-[#b7d8bd] text-white p-3 font-semibold rounded-md shadow-md">
            VER MÁS
          </a>
        </div>
      ),
    },
    {
      key: 3,
      content: (
        <div
          className="text-center sm:px-40 gap-5 p-6 sm:p-12 h-full w-full flex items-center justify-center flex-col"
          style={{
            backgroundImage: `url(${BannerEsencias})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 p-2 text-4xl text-white rounded-md shadow-md">
            <p className="poppins font-black">ESENCIAS GOURMET</p>
            <p className="poppins font-black">Para creaciones exquisitas</p>
          </div>
          <a href="https://www.esenciabodyandhome.com.ar/product-category/esencias-gourmet/" className="bg-black/60 text-white p-3 font-semibold rounded-md shadow-md">
            VER MÁS
          </a>
        </div>
      ),
    },
    {
      key: 4,
      content: (
        <div
          className="text-center sm:px-40 gap-5 p-6 sm:p-12 h-full w-full flex items-center justify-center flex-col"
          style={{
            backgroundImage: `url(${BannerCO})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/30 p-2 text-3xl text-black/70 rounded-md shadow-md">
            <p className="poppins">¿Estás listo para crear?</p>
            <p className="poppins">¡Comencemos a hacerlo juntos!</p>
          </div>
          <a href="https://www.esenciabodyandhome.com.ar/tienda/" className="bg-white/30 text-black/70 p-3 font-semibold rounded-md shadow-md">
            VER MÁS
          </a>
        </div>
      ),
    },
  ];

  const properties = {
    autoplay: true,
    indicators: false,
    arrows: true,
    prevArrow: (
      <button
        type="button"
        className={`bg-gray-300/50 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full`}
      >
        &#10094;
      </button>
    ),
    nextArrow: (
      <button
        type="button"
        className={` bg-gray-300/50 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full`}
      >
        &#10095;
      </button>
    )
  };

  return (
    <Slide {...properties} transitionDuration={350}>
      {slides.map((slide) => (
        <div key={slide.key} className="w-screen h-[100vh]">
          {slide.content}
        </div>
      ))}
    </Slide>
  );
};
