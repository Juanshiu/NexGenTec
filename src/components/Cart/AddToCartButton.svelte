<script>
    import Toastify from 'toastify-js';
    import 'toastify-js/src/toastify.css';
    import { addToCart } from '../../context/cartStore';
    import Carrito from '../icons/CartLogo.svelte';

    export let producto;
    const handleClick = () => {
        addToCart(producto, 1);
    };

    function showToast() {
        Toastify({
            text: "Se ha añadido el producto al carrito.",
            duration: 2000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#000",
            },
        }).showToast();
    }
</script>

<button
    type="button"
    id="AddCartButton"
    on:click={handleClick}
    on:click={showToast}
    class="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded bg-neutral-950 px-6 lg:py-5 py-8 font-bold text-white text-xs">
        AÑADIR AL CARRO
    <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
        <Carrito class=" stroke-white" />
    </div>
</button>