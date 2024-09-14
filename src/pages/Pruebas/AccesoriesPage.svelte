<script lang="ts">
    import type Products from "../../interface/productos";
    import "../../pages/css/Animacheck.css";
    import { onMount } from "svelte";
    import { supabase } from "../../lib/supabase";
    import AddToCartButton from "../../components/Cart/AddToCartButton.svelte";
    import FormaterUrl from "../../components/FormaterUrl.svelte";
    import Main from "../../components/CategoryMain.svelte";

    let Productos: Products[] | null = null;
    let marcasSeleccionadas: string[] = [];

    const fetchData = async () => {
        const { data, error } = await supabase
        .from("Productos")
        .select(`*, id_marca(*)`)
        .eq("id_categoria", 4);

        if (error) {
            console.error("Error al cargar productos", error);
            return;
        }

        Productos = data;
    };

    onMount(fetchData);

    let numeroDeProductos = 0;
    $: {
        numeroDeProductos = Productos ? Productos.length : 0;
    }

    function crearSlug(nombre: string) {
        //Formater para las URL
        return nombre
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const marcas = ['Redragon', 'Logitech', 'Hyperx'];

    function handleChange(event: Event, value: string) {
        const target = event.target as HTMLInputElement;
            const marcaSeleccionada = target.checked
                ? [...marcasSeleccionadas, value]
                : marcasSeleccionadas.filter(marca => marca !== value);
        marcasSeleccionadas = marcaSeleccionada;
    }
</script>

<Main>
    <div class=" flex justify-between mb-8 text-lg">
        <span>Filtrar resultados: {numeroDeProductos} Producto(s)</span>
        <span class=" text-right">Ordenar Por: 
            <select name="" id="" class=" border border-black rounded">
            <option value="">Recomendados</option>
        </select></span>
    </div>

    <section class=" flex sm:flex-row flex-col gap-12 text-xl">
        <aside class=" w-full sm:w-1/3">
            <div class=" flex justify-between mb-2">
                <span>Ordenar y filtrar</span>
                <button
                class=" hover:text-blue-500 transition-colors"
                on:click={() => (marcasSeleccionadas = [])}>Limpiar todo</button
                >
            </div>
            <hr />

            <div class="py-2">
                <details>
                    <summary class="flex justify-between">
                        Por marca
                        <img src="more.svg" width="20px" alt="" />
                        <img src="less.svg" width="20px" alt="" />
                    </summary>
                    <div class=" flex flex-col">
                        {#each marcas as marca}
                        <label>
                            <input
                                type="checkbox"
                                name="marca"
                                value={marca}
                                checked={marcasSeleccionadas.includes(marca)}
                                on:change={(event) => handleChange(event, marca)}
                            />
                            <span>{marca}</span>
                        </label>
                        {/each}
                    </div>
                </details>
            </div>
        <hr />
        </aside>

        <article class=" w-full sm:w-4/6 grid grid-cols-3 gap-2">
        {#if Productos}
            {#each Productos.filter((producto) => marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(producto.id_marca.nombre_marca)) as producto}

            <div class=" border border-gray-200 p-4">
                <img src={producto.img_producto} alt="" class=" w-full object-cover"/>
                <h3 class=" text-base sm:text-lg font-semibold mt-2">{producto.nombre_producto}</h3>
                <p class=" text-sm text-gray-500 truncate">{producto.descripcion}</p>
                <span class=" font-semibold text-base sm:text-lg">${producto.precio}</span>
                <div class=" flex flex-col justify-between mt-2 gap-2 text-sm">
                    <FormaterUrl url={producto.nombre_producto} className='flex justify-center bg-black hover:scale-105 transition-transform text-white px-4 py-2 rounded'>Ver más del producto</FormaterUrl>
                    <AddToCartButton {producto}/>
                </div>

            </div>
            {/each}
        <!-- {:else}
            <Loader /> -->
        {/if}
        </article>
    </section>
</Main>