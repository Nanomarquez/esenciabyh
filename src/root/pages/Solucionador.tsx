import SimpleBackdrop from "@/components/Dialog";
import FormacionDeTunel from "../../assets/FormacionDeTunel.jpg";
import GlaseadoOFrosting from "../../assets/GlaseadoOFrosting.jpg";
import GrietasEnSuperficie from "../../assets/GrietasEnSuperficie.jpg";
import PabiloHongo from "../../assets/PabiloHongo.jpg";
import Rechupe from "../../assets/Rechupe.jpg";
import SuperficieMojada from "../../assets/SuperficieMojada.jpg";
import React from "react";

function Solucionador() {
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
  const [content, setContent] = React.useState(null);

  return (
    <div className="text-center w-full p-4 mt-20">
      <SimpleBackdrop
        open={open}
        handleClose={handleClose}
        content={content}
        arrow={arrow}
      />
      <h1 className="text-2xl font-extrabold">
        Instructivos Esencia Body & Home
      </h1>
      <ol id="lista5" className="flex flex-col gap-4">
        <li>
          <button
            onClick={() => {
              handleOpen(
                <div className="bg-white mt-16 text-black p-4 overflow-scroll h-screen">
                  {" "}
                  <br />
                  <br />
                  <br />
                  <br />{" "}
                  <h2 className="font-semibold text-base">
                    Formación de túneles:
                  </h2>{" "}
                  <p>
                    Esto sucede cuando el diámetro de quemado de tu pabilo no
                    llega a cubrir todo el envase, formándose una pequeña pileta
                    de cera que se dirige hacia abajo, en lugar de hacia los
                    costados. <br /> <br />
                    ¿Por qué se produce? Se produce cuando el pabilo colocado en
                    la vela es el incorrecto. <br /> <br />
                    ¿Cómo prevenirlo? Proba colocar un pabilo que tenga un
                    diámetro más amplio de quemado.{" "}
                  </p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              );
              setArrow(false);
            }}
          >
            <img src={FormacionDeTunel} alt="FormacionDeTunel" />
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(
                <div className="bg-white mt-16 text-black p-4 overflow-scroll h-screen">
                  {" "}
                  <br />
                  <br />
                  <h2 className="font-semibold text-base">
                    Glaseado o Frosting:
                  </h2>
                  <p>
                    Luego de dejar secar tu vela comienzan a aparecer manchas
                    blancas sobre su superficie o laterales <br /> <br />
                    ¿Por qué se produce? El glaseado es un subproducto de una
                    cera natural y es causado por el crecimiento de pequeños
                    cristales en las superficies de la cera. Solo es algo
                    estético, no afecta el funcionamiento de la vela. <br />{" "}
                    <br />
                    ¿Cómo prevenirlo? Algunas recomendaciones para disminuir el
                    frosting son: Revolver suavemente nuestra cera, Agitarla
                    demasiado puede aumentar y/o acelerar el proceso de
                    cristalización. Precalentar los envases de vidrio ayuda a
                    evitar el choque de temperaturas que acelera el proceso de
                    cristalización. Verter la cera en los envases a la
                    temperatura más baja posible. Deja secar tus velas lejos de
                    corrientes de aire.
                  </p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              );
              setArrow(true);
            }}
          >
            <img src={GlaseadoOFrosting} alt="GlaseadoOFrosting" />
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(
                <div className="bg-white mt-16 text-black p-4 overflow-scroll h-screen">
                  {" "}
                  <br />
                  <br />
                  <h2 className="font-semibold text-base">Agrietamiento:</h2>
                  <p>
                    Es común que se produzca una grieta muy delgada en un
                    círculo alrededor de la mecha. <br /> <br />
                    ¿Por qué se produce? Esto se debe a la combinación de que la
                    cera se encoge ligeramente a medida que se enfría y pequeñas
                    burbujas de aire atrapadas en el fondo del recipiente.
                    Después de que la cera se endurece, se hunde un poco donde
                    la burbuja de aire dejó un vacío. No afecta el rendimiento
                    de su vela. <br /> <br />
                    ¿Cómo prevenirlo? Mientras la cera esta líquida en el
                    envase, golpear suavemente el recipiente sobre la superficie
                    de trabajo ayudará a liberar las burbujas de aire que
                    quedaron atrapadas en la cera; realizar las velas sobre una
                    superficie templada evitará que la cera se enfrié
                    repentinamente, sino que lo hará de manera más uniforme;
                    ajustar la temperatura del vertido hasta encontrar la que
                    mejor se adecue a nuestra formula. También podes corregirlo
                    colocando una fina capa de cera sobre la superficie de tu
                    vela.
                  </p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              );
              setArrow(true);
            }}
          >
            <img src={GrietasEnSuperficie} alt="GrietasEnSuperficie" />
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(
                <div className="bg-white mt-16 text-black p-4 overflow-scroll h-screen">
                  {" "}
                  <br />
                  <br />
                  <br />
                  <h2 className="font-semibold text-base">
                    Mecha en forma de hongo:
                  </h2>
                  <p>
                    Una mecha en forma de "hongo" que a veces se ve en el
                    extremo de la mecha de una vela después de quemarse es el
                    resultado de la acumulación de carbono. <br /> <br />
                    ¿Por qué se produce? Esto sucede cuando la llama consume más
                    combustible (cera + esencia) del que puede quemar. <br />{" "}
                    <br />
                    ¿Cómo prevenirlo? Recorta el pabilo quemado de tu vela antes
                    de volver a encenderla. Cambia el tamaño de tu pabilo, puede
                    que sea muy grande para el tamaño de tu vela y este quemando
                    muy rápido.
                  </p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              );
              setArrow(false);
            }}
          >
            <img src={PabiloHongo} alt="PabiloHongo" />
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(
                <div className="bg-white mt-16 text-black p-4 overflow-scroll h-screen">
                  {" "}
                  <br />
                  <br />
                  <h2 className="font-semibold text-base">
                    Manchas o puntos húmedos (burbujas de aire):{" "}
                  </h2>
                  <p>
                    Lo que pueden parecer puntos húmedos en los lados de las
                    velas no son realmente puntos húmedos, sino lugares que la
                    cera se ha desprendido del recipiente a medida que se
                    enfría. Es causado por la cera que se enfría más rápido en
                    algunas áreas que en otras. Este es el problema de
                    adherencia al vidrio más común en las velas en envase. No
                    afecta el rendimiento de su vela. <br /> <br /> ¿Por qué se
                    produce? Por el choque de temperaturas que se produce entre
                    el envase de vidrio que comúnmente esta frio y la
                    temperatura de la cera en estado líquido. <br /> <br />{" "}
                    ¿Cómo prevenirlo? Se puede prevenir, pero no eliminar por
                    completo. Al trabajar con una cera de origen vegetal pueden
                    ocurrir estos procesos que son naturales, ya que al
                    enfriarse la cera se contrae buscando volver a su forma
                    inicial. Algunos consejos son: entibiar los envases con
                    calor o sumergiéndolos en agua tibia; Verter la cera
                    lentamente en los envases a la menor temperatura posible,
                    cuando la misma deja de estar cristalina, alrededor de los
                    35/40 Grados; realizar las velas sobre una superficie
                    templada evitará que la cera se enfrié repentinamente, sino
                    que lo hará de manera más uniforme; separar las velas entre
                    sí, para que su enfriamiento sea lento y uniforme.
                  </p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              );
              setArrow(true);
            }}
          >
            <img src={Rechupe} alt="Rechupe" />
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleOpen(
                <div className="bg-white mt-16 text-black p-4 overflow-scroll h-screen">
                  {" "}
                  <br />
                  <br />{" "}
                  <h2 className="font-semibold text-base">
                    Superficie mojada o aceitosa(formación de grasa):{" "}
                  </h2>{" "}
                  <p>
                    En los días posteriores a que la vela se haya enfriado, es
                    posible que a veces notes que hay una cantidad significativa
                    de líquido en la partesuperior o inferior de la vela. <br />{" "}
                    <br />
                    ¿Por qué se produce? Por lo general, se debe a la adición de
                    demasiada esencia o al agregar la fragancia a una
                    temperatura incorrecta. <br /> <br />
                    ¿Cómo prevenirlo? Añadí la esencia entre los 40 y 50 grados.
                    Cuando más espesa sea la esencia, más cerca de los 50 grados
                    recomendamos aplicarla. Revuelve suavemente durante 2
                    minutos, puede parecer mucho tiempo, pero es importante
                    asegurarse de que la esencia haya tenido tiempo suficiente
                    para unirse a la cera. Ajusta el porcentaje de esencia,
                    quizás estas colocando demasiado.{" "}
                  </p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              );
              setArrow(true);
            }}
          >
            <img src={SuperficieMojada} alt="SuperficieMojada" />
          </button>
        </li>
      </ol>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Solucionador;
