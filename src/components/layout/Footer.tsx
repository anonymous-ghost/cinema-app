import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-900 px-16 py-12 mt-36 max-md:px-5 max-md:mt-10">
      <div className="mx-auto flex w-full max-w-[1620px] flex-wrap justify-between gap-10 max-md:flex-col max-md:items-center">
        
        {/* Logotype / Name */}
        <div className="mt-5">
          <h2 className="anton-regular text-7xl text-stone-300 max-md:text-4xl">MOVIEAPP</h2>
        </div>

        {/* Description */}
        <div className="flex flex-col items-center text-center mt-6 max-md:mt-0 max-md:px-4">
          <p className="text-xl font-medium text-gray-400"> The best place to discover and track your favorite movies and sessions.</p>
          <p className="mt-8 text-lg text-zinc-500"> © {currentYear} MovieApp. All rights reserved.</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center items-center gap-6 my-auto text-lg font-medium text-gray-400" role="navigation" aria-label="Footer navigation">
          <a href="/faq" className="hover:text-gray-300">FAQ</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a href="/privacy" className="hover:text-gray-300">Privacy</a>
          <a href="/terms" className="hover:text-gray-300">Terms</a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
