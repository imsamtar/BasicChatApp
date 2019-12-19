<script>
	import {onMount} from 'svelte';
	import Nav from '../components/Nav.svelte';
	import {token, LS} from '../store.js';

	export let segment;

	onMount(() => {
		$token = LS.token;
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

<Nav {segment}/>

<main>
	<slot></slot>
</main>