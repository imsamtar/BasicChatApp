<script>
	import {beforeUpdate} from 'svelte';
	import {LS} from '../store.js';
	export let segment;

	let token = "";
	
	beforeUpdate(() => {
		token = LS.token;
	});
	let menuShown = false;
</script>

<style>
span.navbar-burger {
	cursor: pointer;
}
</style>

<nav class="navbar is-primary">
	<div class="container">
		<div class="navbar-brand has-text-bold">
			<div class="navbar-item">
				<a class="button is-primary" class:has-text-weight-bold={segment === "undefined"} href=".">
					<i class="fal fa-comment-lines fa-2x"></i>
				</a>
			</div>
			<span class="navbar-burger" on:click={() => menuShown=!menuShown}>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</span>
		</div>
		<ul class="navbar-menu navbar-end" class:is-active={menuShown}>
			<a class="navbar-item has-text-centered" class:has-text-weight-bold={segment === "signup"} href='signup'>Signup</a>
			<a class="navbar-item has-text-centered" class:has-text-weight-bold={segment === "login"} href='login'>Login</a>
			<a class="navbar-item has-text-centered" target="_blank" href='//github.com/imsamtar/BasicChatApp'><i class="fab fa-github"></i></a>
		</ul>
	</div>
</nav>
