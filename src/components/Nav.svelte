<script>
	import {beforeUpdate} from 'svelte';
	import {LS} from '../store.js';
	export let segment;

	let token = "";
	
	beforeUpdate(() => {
		token = LS.token;
	})
</script>

<nav class="navbar is-primary">
	<ul class="navbar-menu navbar-end">
		{#if !token}
			<li class="navbar-item">
				<a class="button is-primary" class:has-text-weight-bold={segment === "signup"} href='.'>Signup</a>
			</li>
			<li class="navbar-item">
				<a class="button is-primary" class:has-text-weight-bold={segment === "login"} href='login'>Login</a>
			</li>
		{:else}
			<li class="navbar-item">
				<a class="button is-primary" class:has-text-weight-bold={segment === "logout"} href='logout'>Logout</a>
			</li>
		{/if}
		<li class="navbar-item">
			<a class="button is-primary" target="_blank" href='//github.com/imsamtar/BasicChatApp'><i class="fab fa-github"></i></a>
		</li>
	</ul>
</nav>
