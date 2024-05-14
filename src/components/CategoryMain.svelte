<script lang="ts">
    export let className = "";
</script>

<main class={` flex flex-col sm:max-w-6xl mx-auto mt-8 px-4${className}`}>
    <slot/>
</main>