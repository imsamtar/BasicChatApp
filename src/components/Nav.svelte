<script>
	export let segment;
</script>

<nav class="navbar is-primary">
	<ul class="navbar-menu navbar-end">
		<li class="navbar-item"><a class="button is-primary" class:is-hidden='{segment === 'signup'}' class:has-text-primary='{segment === "logout"}' href='.'>Signup</a></li>
		<li class="navbar-item"><a class="button is-primary" class:is-hidden='{segment === "login" || segment === "logout"}' href='login'>Login</a></li>
		<li class="navbar-item"><a class="button is-primary" class:is-hidden='{segment !== "login"}' href='logout'>Logout</a></li>
		<li class="navbar-item"><a class="button is-primary" target="_blank" href='//github.com/imsamtar/BasicChatApp'><i class="fab fa-github"></i></a></li>
	</ul>
</nav>
