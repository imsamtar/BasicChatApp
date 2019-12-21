<script>
    import {onMount} from 'svelte';
    import {goto} from "@sapper/app";

    onMount(() => {
        goto('/me/chats');
    })
</script>