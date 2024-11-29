<script lang="ts">
import type Products from "../../interface/productos";
import { supabase } from "../../lib/supabase";

let searchTerm = "";
let searchResults: Products[] = [];
const DEBOUNCE_DELAY = 400; // 400ms de retraso
let timeout: ReturnType<typeof setTimeout> | null = null;

// Función para buscar productos
const searchProducts = async (term: string) => {
    if (term.length === 0) {
        searchResults = [];
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

    searchResults = data || [];
};

// Debounce para la búsqueda en tiempo real
const handleSearch = (event: Event) => {
    const term = (event.target as HTMLInputElement).value;
    searchTerm = term;

    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
        searchProducts(term);
    }, DEBOUNCE_DELAY);
};

// Función para manejar el envío del formulario
const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
        window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
};

// Función para manejar la tecla Enter
const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        window.location.href = '/search';
    }
};

function crearSlug(nombre: string) {
    return nombre
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
</script>

<div>
<form 
    class="flex"
    on:submit={handleSubmit}
>
    <input
        id="search"
        type="search"
        placeholder="Buscar productos"
        bind:value={searchTerm}
        on:input={handleSearch}
        on:keydown={handleKeyDown}
        class="py-2 px-4 bg-zinc-50 border border-black focus:border-blue-500 sm:rounded-l-md rounded-none focus:outline-none focus:bg-white focus:ring-opacity-60"
    />
    <button
        id="submit"
        type="submit"
        class="bg-black text-white px-4 py-2 rounded-e-md sm:block hidden"
    >
    Buscar
    </button>
</form>

{#if searchResults.length > 0}
    <div
    class="absolute w-80 h-auto overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md z-10 mt-2"
    >
        {#each searchResults as producto}
            <a
                href={`/${crearSlug(producto.nombre_producto)}`}
                class="product-result py-2 flex"
            >
            <img
                src={producto.img_producto}
                alt={producto.nombre_producto}
                class="size-12"
            />
            <h3>{producto.nombre_producto}</h3>
            </a>
            <hr />
        {/each}
    </div>
{/if}
</div>
