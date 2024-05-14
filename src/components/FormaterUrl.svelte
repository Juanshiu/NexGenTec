<script lang="ts">
    export let url: string;
    export let className = '';

    function crearSlug(nombre: string) {
        return nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
</script>

<a href={crearSlug(url)} class={`flex text-center font-semibold bg-black hover:scale-105 transition-transform text-white px-4 py-2 rounded text-md ${className}`}>
    <slot />
</a>