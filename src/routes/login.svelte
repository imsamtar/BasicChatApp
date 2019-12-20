<script>
import {goto} from '@sapper/app';
import {LS} from '../store.js';

let user = { username: '', hash: ''};
async function login(e){
	e.preventDefault();
	if(validate()){
		let res = await fetch('/api/users/auth', {
			method: 'POST',
			body: JSON.stringify({ user }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		res = await res.json();
		if(res.token===undefined){
			alert('Username or password incorrect');
		}else{
			LS.token = res.token;
			goto('/me');
		}
	}
}
function validate(user){
	return true;
}
</script>

<svelte:head>
	<title>Login | Basic Chat App</title>
</svelte:head>

<form class="form" on:submit|preventDefault={login}>

	<label for="username" class="label">Username:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="text" class="input is-primary" bind:value={user.username} placeholder="username">
		<span class="icon is-left is-small"><i class="fas fa-user"></i></span>
		<span class="icon is-right is-small"><i class="fas fa-check"></i></span>
	</div>

	<label for="password" class="label">Password:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="password" class="input is-primary" bind:value={user.hash} placeholder="********">
		<span class="icon is-left is-small"><i class="fas fa-key"></i></span>
		<span class="icon is-right is-small"><i class="fas fa-check"></i></span>
	</div>

	<input type="submit" style="margin:10px 0 10px 0;" class="button is-primary is-fullwidth is-outlined" value="Login">
	<a href="/forget" type="submit" style="margin-top:10px;" class="has-text-danger">Lost your password?</a><br/>
	<a href="/signup" type="submit" style="margin-top:10px;" class="has-text-link">Don't have an account?</a>
	
	

</form>