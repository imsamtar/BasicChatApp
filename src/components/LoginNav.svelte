<script>
	import {beforeUpdate} from 'svelte';
	import {LS} from '../store.js';
	export let segment;

	let token = "";
	
	beforeUpdate(() => {
        console.log("Login Nav")
		token = LS.token;
	})
</script>

<nav class="navbar is-primary">
	<ul class="navbar-menu navbar-end">
        {#if segment!='chat'}
            <li class="navbar-item has-text-bold">
                <a class="button is-primary" class:has-text-weight-bold={segment === "chats"} href="/me/chats">
                    <i class="far fa-comment-lines fa-lg"></i>
                </a>
            </li>
        {/if}
            <li class="navbar-item">
                <a class="button is-primary" class:has-text-weight-bold={segment === "logout"} href='logout'>
                    <i class="far fa-sign-out fa-lg"></i>
                </a>
            </li>
	</ul>
</nav>
