import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-neutral-900 px-16 py-6 text-xl text-gray-400 max-md:px-5">
      <div className="mx-auto flex w-full max-w-[1620px] flex-wrap justify-between items-center gap-6">
        
        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-10" role="navigation" aria-label="Main navigation">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/sessions" className="hover:text-gray-300">Sessions</a>
          <a href="/favorites" className="hover:text-gray-300">Favorites</a>
          <a href="/admin" className="hover:text-gray-300">Admin Panel</a>
        </nav>

        {/* Buttons: search, cart */}
        <div className="flex flex-wrap items-center gap-6">
          <button className="flex items-center gap-2.5 hover:text-gray-300" aria-label="Search movies">
            <img src="/icons/Search.svg" alt="" className="w-5 h-5 object-contain"/>
            <span>Search</span>
          </button>
          <button className="flex items-center gap-3 hover:text-gray-300" aria-label="View cart" >
            <img src="/icons/Cart.svg" alt="" className="w-[29px] h-auto object-contain"/>
            <span>Cart</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
