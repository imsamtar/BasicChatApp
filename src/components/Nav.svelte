<script>
	import {beforeUpdate} from 'svelte';
	import {LS} from '../store.js';
	export let segment;

	let token = "";
	
	beforeUpdate(() => {
		token = LS.token;
	});
</script>

<nav class="navbar is-primary">
	<div class="navbar-item has-text-bold">
		<a class="button is-primary" class:has-text-weight-bold={segment === "undefined"} href=".">
			<i class="far fa-home"></i>
		</a>
	</div>
	<ul class="navbar-menu navbar-end">
		<li class="navbar-item">
			<a class="button is-primary" class:has-text-weight-bold={segment === "signup"} href='signup'>Signup</a>
		</li>
		<li class="navbar-item">
			<a class="button is-primary" class:has-text-weight-bold={segment === "login"} href='login'>Login</a>
		</li>
		<li class="navbar-item">
			<a class="button is-primary" target="_blank" href='//github.com/imsamtar/BasicChatApp'><i class="fab fa-github"></i></a>
		</li>
	</ul>
</nav>
