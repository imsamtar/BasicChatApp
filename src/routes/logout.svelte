<script>
    import {goto} from '@sapper/app';
    import {onMount} from 'svelte';
    import {token, LS} from '../store.js';
    onMount(() => {
        LS.token = $token = "";
        setTimeout(() => goto('/'), 1000);
    })
</script>

<svelte:head>
	<title>Logout | Basic Chat App</title>
</svelte:head>