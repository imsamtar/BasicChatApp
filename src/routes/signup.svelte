<script>
import {goto} from '@sapper/app';
let user = { username: '', email: '', hash: '', profile: { firstName: '', lastName: ''}};
async function signup(e){
	e.preventDefault();
	if(validate()){
		console.log(user);
		let res = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ user }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if((await res.json()).errmsg!==undefined){
			alert('Account with this username or email already exists');
		}else{
			goto('/login');
		}
	}
}
function validate(user){
	return true;
}
</script>

<svelte:head>
	<title>Basic Chat App</title>
</svelte:head>

<form class="form" on:submit|preventDefault={signup}>

	<label for="fullName" class="label">First Name:</label>
	<input type="text" class="input is-primary"  bind:value={user.profile.firstName}>

	<label for="lastName" class="label">Last Name:</label>
	<input type="text" class="input is-primary"  bind:value={user.profile.lastName}>

	<label for="email" class="label">Email:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="email" class="input is-primary email" bind:value={user.email}>
		<span class="icon is-left"><i class="fas fa-envelope"></i></span>
		<span class="icon is-right"><i class="fas fa-check"></i></span>
	</div>
	<label for="username" class="label">Username:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="text" class="input is-primary" bind:value={user.username}>
		<span class="icon is-left is-small"><i class="fas fa-user"></i></span>
		<span class="icon is-right is-small"><i class="fas fa-check"></i></span>
	</div>

	<label for="password" class="label">Password:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="password" class="input is-primary"  bind:value={user.hash}>
		<span class="icon is-left is-small"><i class="fas fa-key"></i></span>
		<span class="icon is-right is-small"><i class="fas fa-check"></i></span>
	</div>

	<input type="submit" style="margin:10px 0 10px 0;" class="button is-primary is-fullwidth is-outlined" value="SignUp">
	<a href="/login" type="submit" style="margin-top:10px;" class="has-text-success">Already have an account?</a>

</form>