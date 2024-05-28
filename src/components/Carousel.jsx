import Slider from "react-slick";

export default function Carousel() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="image-slider-container h-auto">
        <Slider {...settings} >
          {/* cada div es una tarjeta que el componente mostrará */}
          <div >
            <section className="text-gray-600 body-font">
              
              <div
                className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
                bis_skin_checked="1"
              >
                <div
                  className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
                  bis_skin_checked="1"
                >
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    Viste tu estilo
                    <br className="hidden lg:inline-block" />
                    marca tu diferencia
                  </h1>
                  <p className="mb-8 leading-relaxed bg-blue-100 p-4 rounded-md">
                  Descubre una amplia selección de prendas que te permitirán expresar quién eres realmente. 
                  En nuestra tienda, no solo encontrarás moda, sino también la oportunidad de destacar y marcar tu estilo único. 
                  Desde clásico hasta vanguardista, tenemos todo lo que necesitas para crear tu look perfecto y hacer una declaración de moda que sea completamente tuya.
                  </p>
                  <div className="flex justify-center" bis_skin_checked="1">
                  </div>
                </div>
                <div
                  className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 "
                  bis_skin_checked="1"
                >
                  <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src="https://img.freepik.com/fotos-premium/elegante-hermosa-pareja-moda-modelos-ropa-casual-moda-primavera-posa-juntos-calle-mujer-bonita-moda-hombre-hipster-estilo-chaqueta-mezclilla_338491-17836.jpg?w=360"
                  />
                </div>
              </div>
            </section>
          </div>
          <div>
            <section className="text-gray-600 body-font">
              <div
                className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
                bis_skin_checked="1"
              >
                <div
                  className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"
                  bis_skin_checked="1"
                >
                  <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src="https://img.freepik.com/fotos-premium/elegante-hombre-mujer-glamour-abrigo-piel-posando-traje-invierno_105609-1846.jpg?w=360"
                  />
                </div>
                <div
                  className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
                  bis_skin_checked="1"
                >
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    ¡Moda que habla por ti
                    <br className="hidden lg:inline-block" />
                    encuentra tu voz!
                  </h1>
                  <p className="mb-8 leading-relaxed bg-blue-100 p-4 rounded-md">
                  En nuestra tienda, creemos que la moda es más que simplemente vestirte; es una forma de comunicar quién eres sin decir una palabra. 
                  Con nuestras colecciones cuidadosamente seleccionadas, podrás encontrar piezas que realmente te representen y te ayuden a expresar tu personalidad única. 
                  Encuentra tu voz a través de la moda y haz que tus prendas hablen por ti.
                  </p>
                  <div className="flex justify-center" bis_skin_checked="1">
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div>
            <section className="text-gray-600 body-font">
              <div
                className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
                bis_skin_checked="1"
              >
                <div
                  className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
                  bis_skin_checked="1"
                >
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Expresa tu personalidad
                    <br className="hidden lg:inline-block" />
                    con cada prenda que elijas
                  </h1>
                  <p className="mb-8 leading-relaxed bg-blue-100 p-4 rounded-md">
                  Cada prenda que eliges cuenta una historia sobre ti. 
                  En nuestra tienda, te ofrecemos una variedad de estilos y tendencias para que puedas encontrar exactamente lo que necesitas para mostrar tu verdadera personalidad. 
                  Desde atuendos elegantes y sofisticados hasta looks relajados y casuales, cada pieza está diseñada para que te sientas seguro y 
                  cómodo mientras te expresas a ti mismo de la mejor manera posible.
                  </p>
                  <div className="flex justify-center" bis_skin_checked="1">
                  </div>
                </div>
                <div
                  className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
                  bis_skin_checked="1"
                >
                  <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src="https://img.freepik.com/fotos-premium/hermosa-chica-moda-chico-moda-elegante-camiseta-blanca-sueter-chaqueta-estan-parados-estudio_338491-13462.jpg"
                  />
                </div>
              </div>
            </section>
          </div>
        </Slider>
      </div>
    );
  }