import React, { useState, useEffect, useRef } from 'react';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Función para manejar el cierre del menú al hacer clic fuera de él
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Event listener para detectar clics fuera del menú desplegable
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" flex justify-center border border-y-black shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        id="options-menu" aria-haspopup="true" aria-expanded="true">
        Categorías
        {/* Icono de flecha */}
      </button>

      {/* Menú desplegable */}
      <div
        className={`origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          {/* Opciones del menú */}
          <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
            Componentes
          </a>
          <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
            Perifericos 
          </a>
          {/* Más opciones... */}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
