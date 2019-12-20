<script>
	import {onMount} from 'svelte';
	import {goto} from '@sapper/app';
	import Nav from '../components/Nav.svelte';
	import {LS} from '../store.js';

	export let segment;

	onMount(() => {
		let path = location.pathname.split('/');
		if(path.length==2 && LS.token) goto('/me');
	});
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

<Nav {segment}/>

<main>
	<slot></slot>
</main>