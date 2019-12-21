<script>
	import {onMount, beforeUpdate} from 'svelte';
	import {goto} from '@sapper/app';
	import Nav from '../components/Nav.svelte';
	import LoginNav from '../components/LoginNav.svelte';
	import {LS} from '../store.js';

	export let segment;
	let token;
	onMount(() => {
		let path = location.pathname.split('/');
		if(path.length==2 && LS.token) goto('/me');
	});
	beforeUpdate(() => {
		token = LS.token;
	})
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

{#if !token}
<Nav {segment}/>
{:else}
<LoginNav {segment}/>
{/if}

<main>
	<slot></slot>
</main>