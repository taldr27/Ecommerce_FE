export default function Footer() {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font h-32">
      <div className="container px-5 py-4 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col" bis_skin_checked={1}>
        <div className="w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left" bis_skin_checked={1}>
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">All-Fashion Market</span>
          </a>
          <p className="mt-2 text-sm text-gray-500 text-center md:text-left">Descubre las últimas tendencias en moda y estilo en All-Fashion Market. Explora nuestra amplia selección de prendas, accesorios y más para expresar tu estilo único. Con nosotros, encontrarás todo lo que necesitas para lucir a la moda en cualquier ocasión. ¡Únete a nuestra comunidad de amantes de la moda hoy mismo!</p>
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-75" bis_skin_checked={1}>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row" bis_skin_checked={1}>
          <p className="text-gray-400 text-sm text-center sm:text-left">© 2024 All-Fashion Market</p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <p className="text-gray-400 text-sm">Aceptamos diversos medios de pago</p>
          </span>
        </div>
      </div>
    </footer>
  );
}
