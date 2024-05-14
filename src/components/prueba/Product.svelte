<script lang="ts">
    import { supabase } from '../../lib/supabase';
    import { onMount } from "svelte";
    import { addToCart } from '../../context/cartStore';
    import type Products from '../../interface/productos';

    let Productos: Products[] = [];

    const fetchData = async () => {
        const { data, error } = await supabase
        .from("Productos")
        .select(`*, id_marca(*)`)

        if (error) {
            console.error("Error al cargar productos", error);
            return;
        }

        Productos = data;
    };

    onMount(fetchData);
</script>

{#each Productos as producto}
    <div class="product-card">
        <img src={producto.img_producto} alt={producto.nombre_producto} />
        <h3>{producto.nombre_producto}</h3>
        <p>{producto.descripcion}</p>
        <p>Precio: {producto.precio}</p>
        <button on:click={() => addToCart(producto, 1)} class=' bg-black p-2 rounded-md text-white'>Agregar al Carrito</button>
    </div>
{/each}