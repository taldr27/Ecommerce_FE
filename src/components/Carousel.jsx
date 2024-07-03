import Slider from "react-slick";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="image-slider-container h-auto">
      <Slider {...settings}>
        <div>
          <section className="text-gray-700 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="text-4xl sm:text-5xl text-gray-900 font-bold mb-6">
                  Dress Your Style
                  <br className="hidden lg:inline-block" />
                  Make Your Mark
                </h1>
                <p className="mb-8 leading-relaxed bg-blue-100 p-4 rounded-lg text-lg">
                  Discover a wide selection of garments that allow you to
                  express who you really are. In our store, you'll find not just
                  fashion, but also the opportunity to stand out and make your
                  unique style statement. From classic to avant-garde, we have
                  everything you need to create your perfect look and make a
                  fashion statement that's completely yours.
                </p>
              </div>
              <div className="">
                <img
                  className="object-cover object-center rounded-lg"
                  alt="hero"
                  src="https://img.freepik.com/fotos-premium/elegant-beautiful-fashion-couple-models-casual-clothes-spring-fashion-poses-together-street-woman-pretty-fashion-man-hipster-style-denim-jacket_338491-17836.jpg?w=360"
                />
              </div>
            </div>
          </section>
        </div>
        <div>
          <section className="text-gray-700 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <img
                  className="object-cover object-center rounded-lg"
                  alt="hero"
                  src="https://img.freepik.com/fotos-premium/elegant-man-woman-glamour-coat-posing-winter-suit_105609-1846.jpg?w=360"
                />
              </div>
              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="text-4xl sm:text-5xl text-gray-900 font-bold mb-6">
                  Fashion Speaks for You
                  <br className="hidden lg:inline-block" />
                  Find Your Voice!
                </h1>
                <p className="mb-8 leading-relaxed bg-blue-100 p-4 rounded-lg text-lg">
                  In our store, we believe that fashion is more than just
                  clothing; it's a way to communicate who you are without saying
                  a word. With our carefully curated collections, you'll find
                  pieces that truly represent you and help you express your
                  unique personality. Find your voice through fashion and let
                  your clothes speak for you.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section className="text-gray-700 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="text-4xl sm:text-5xl text-gray-900 font-bold mb-6">
                  Express Your Personality
                  <br className="hidden lg:inline-block" />
                  with Every Garment You Choose
                </h1>
                <p className="mb-8 leading-relaxed bg-blue-100 p-4 rounded-lg text-lg">
                  Every garment you choose tells a story about you. In our
                  store, we offer you a variety of styles and trends so you can
                  find exactly what you need to showcase your true personality.
                  From elegant and sophisticated outfits to relaxed and casual
                  looks, each piece is designed to make you feel confident and
                  comfortable while expressing yourself in the best possible
                  way.
                </p>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  className="object-cover object-center rounded-lg"
                  alt="hero"
                  src="https://img.freepik.com/fotos-premium/beautiful-fashion-girl-boy-fashion-elegant-white-t-shirt-sweater-jacket-standing-studio_338491-13462.jpg"
                />
              </div>
            </div>
          </section>
        </div>
      </Slider>
    </div>
  );
}
