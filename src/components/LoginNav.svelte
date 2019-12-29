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
				<a class="button is-primary" class:has-text-weight-bold={segment === "undefined"} href="/me/chats">
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
            <a class="navbar-item" class:has-text-weight-bold={segment === "logout"} href='logout'>
                <i class="far fa-sign-out fa-lg"></i>
            </a>
        </ul>
	</div>
</nav>