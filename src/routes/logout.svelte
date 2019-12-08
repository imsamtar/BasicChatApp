<script>
    import {goto} from '@sapper/app';
    import {onMount} from 'svelte';
    onMount(() => {
        console.log("Mounted");
        setTimeout(() => goto('/'), 3000);
    })
</script>

<svelte:head>
	<title>Logout | Basic Chat App</title>
</svelte:head>