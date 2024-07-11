export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 body-font">
      <div className="container px-5 py-8 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white bg-indigo-500 rounded-full p-2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">All-Fashion Market</span>
        </div>
        <div className="md:flex-grow">
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Discover the latest trends in fashion and style at All-Fashion
            Market. Explore our wide selection of clothing, accessories, and
            more to express your unique style. With us, you&apos;ll find everything
            you need to look fashionable for any occasion. Join our community of
            fashion enthusiasts today!
          </p>
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-75">
        <div className="container px-5 py-6 mx-auto flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2024 All-Fashion Market
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <p className="text-gray-400 text-sm">
              We accept various payment methods
            </p>
          </span>
        </div>
      </div>
    </footer>
  );
}
