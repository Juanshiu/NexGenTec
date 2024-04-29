import React, { useState, useEffect } from 'react';
import type Products from "@interface/productos";
import { createClient } from '@supabase/supabase-js'
import FormattUrl from "@components/FormattUrl.astro";

// Create a single supabase client for interacting with your database
const supabase = createClient('https://apizbrhjcalaarjxryea.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwaXpicmhqY2FsYWFyanhyeWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNDk3MTksImV4cCI6MjAyMjcyNTcxOX0._VIV_7_V1D3R0ezrb41Ci3sj5x_Kw40y8pgzJaKFL8U')

const SearchComponent = () => {
 const [searchTerm, setSearchTerm] = useState('');
 const [searchResults, setSearchResults] = useState<Products[]>([]);

 const DEBOUNCE_DELAY = 500; // 500ms de retraso
 let timeout: ReturnType<typeof setTimeout> | null = null;

 // Función para buscar productos
 const searchProducts = async (term: string) => {
    if (term.length === 0) {
      setSearchResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("Productos")
      .select("*")
      .ilike("nombre_producto", `%${term}%`);

    if (error) {
      console.error("Error al cargar productos", error);
      return;
    }

    setSearchResults(data || []);
 }

 // Debounce para la búsqueda en tiempo real
 const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      searchProducts(term);
    }, DEBOUNCE_DELAY);
 }

  function crearSlug(nombre: string) {
    return nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

 return (
    <div>
      
      <form className="flex">
        <input
          id="search"
          type="search"
          className="py-2 px-4 bg-zinc-50 border border-black focus:border-blue-500 rounded-l-md focus:outline-none focus:bg-white focus:ring-opacity-60"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={handleSearch}
        />

        <button
          id="submit"
          type="button"
          className="bg-black text-white px-4 py-2 rounded-e-md"
          onClick={() => searchProducts(searchTerm)}
        >
          Buscar
        </button>
      </form>

      {searchResults.length > 0 && (
        <div
          className="absolute w-60 h-28 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md z-10 mt-2"
        >
          {searchResults.map((producto, index) => (
            <a href={`${crearSlug(producto.nombre_producto)}`} className="product-result py-2 flex">
              <img src={producto.img_producto} alt={producto.nombre_producto} className=' size-12' />
              <h3>{producto.nombre_producto}</h3>
            </a>
          ))}
        </div>
      )}
    </div>
 );
};

export default SearchComponent;
