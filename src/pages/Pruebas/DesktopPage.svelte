<script lang="ts">
    import type Products from "../../interface/productos";
    import "../../pages/css/Animacheck.css";
    import { onMount } from "svelte";
    import Loader from "../../components/ui/Loader.svelte";
    import { supabase } from "../../lib/supabase";
    import AddToCartButton from "../../components/Cart/AddToCartButton.svelte";
    import FormaterUrl from "../../components/FormaterUrl.svelte";
    import Main from "../../components/CategoryMain.svelte";

    let Productos: Products[] | null = null;
    let tipoPCSeleccionadas: string[] = [];

    const fetchData = async () => {
        const { data, error } = await supabase
        .from("Productos")
        .select(`*, id_tipopc(*)`)
        .eq("id_categoria", 2);

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

    const TiposTorres = ['Gaming', 'Profesional'];

    function handleChange(event: Event, value: string) {
        const target = event.target as HTMLInputElement;
            const tipoPCSeleccionada = target.checked
                ? [...tipoPCSeleccionadas, value]
                : tipoPCSeleccionadas.filter(TiposTorres => TiposTorres !== value);
                tipoPCSeleccionadas = tipoPCSeleccionada;
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
                on:click={() => (tipoPCSeleccionadas = [])}>Limpiar todo</button
                >
            </div>
            <hr />

            <div class="py-2">
                <details>
                    <summary class="flex justify-between">
                        Por Tipos
                        <img src="more.svg" width="20px" alt="" />
                        <img src="less.svg" width="20px" alt="" />
                    </summary>
                    <div class=" flex flex-col">
                        {#each TiposTorres as TipoPC}
                        <label>
                            <input
                                type="checkbox"
                                name="TiposTorres"
                                value={TiposTorres}
                                checked={tipoPCSeleccionadas.includes(TipoPC)}
                                on:change={(event) => handleChange(event, TipoPC)}
                            />
                            <span>{TipoPC}</span>
                        </label>
                        {/each}
                    </div>
                </details>
            </div>
        <hr />
        </aside>

        <article class=" w-full sm:w-4/6 grid grid-cols-3 gap-2">
        {#if Productos}
            {#each Productos.filter((producto) => tipoPCSeleccionadas.length === 0 || tipoPCSeleccionadas.includes(producto.id_tipopc.tipo_torre)) as producto}

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
        {:else}
            <Loader />
        {/if}
        </article>
    </section>
</Main>