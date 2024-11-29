<script lang="ts">
    import cartContext, { totalQuantity } from '../../context/cartStore';
    import { onMount, onDestroy } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import type Cart from '../../interface/cart';
    import CartLogo from '../icons/CartLogo.svelte';
    import { getCartFromLocalStorage } from '../../utils/persistCart';

    let cart: Cart[] = [];
    let isOpen = false;

    const unsubscribe = cartContext.subscribe((value) => {
        cart = value;
    });

    onMount(() => {
        cart = getCartFromLocalStorage();
    });

    onDestroy(unsubscribe);

    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (node && !node.contains(event.target as Node) && isOpen) {
                isOpen = false;
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

    function toggleCart() {
        isOpen = !isOpen;
    }
</script>

<div class="relative inline-block text-left" use:clickOutside>
    <div>
        <button 
            type="button" 
            class="bg-white p-2 rounded-full border hover:border-black transition-colors" 
            on:click={toggleCart}
            aria-label={isOpen ? "Cerrar carrito" : "Abrir carrito"}
        >
            <CartLogo />
        </button>
        {#if $totalQuantity > 0}
            <span class="absolute left-7 bottom-6 bg-black text-white px-2 rounded-full">{$totalQuantity}</span>
        {/if}
    </div>

    {#if isOpen}
        <div 
            transition:fly="{{ y: 20, duration: 300 }}"
            class="absolute p-2 right-0 z-10 mt-2 w-96 max-h-96 h-min overflow-y-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
            {#if cart.length === 0}
                <p>Tu carrito está vacío.</p>
            {:else}
                <ul>
                    {#each cart as item}
                        <li class="flex my-4" transition:fade="{{ duration: 200 }}">
                            <img src={item.id_producto.img_producto} alt={item.id_producto.nombre_producto} class="h-12 w-16 pr-2" />
                            <div>
                                <h3>{item.id_producto.nombre_producto}</h3>
                                <p>Cantidad: {item.cantidad}</p>
                                <p class="text-red-600">Precio: {item.id_producto.precio * item.cantidad}</p>
                                <button 
                                    class="p-1 bg-black rounded-md text-white" 
                                    on:click={() => cartContext.removeFromCart(item.id_producto.id_producto)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    {/each}
                </ul>
                <hr>
                <span class="font-bold">Total: {cart.reduce((acc, item) => acc + item.id_producto.precio * item.cantidad, 0)}</span>
            {/if}
        </div>
    {/if}
</div>