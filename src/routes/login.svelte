<svelte:head>
	<title>Login | Basic Chat App</title>
</svelte:head>

<form class="form" on:submit|preventDefault={() => {console.log("Login")}}>

	<label for="username" class="label">Username:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="text" class="input is-primary">
		<span class="icon is-left is-small"><i class="fas fa-user"></i></span>
		<span class="icon is-right is-small"><i class="fas fa-check"></i></span>
	</div>

	<label for="password" class="label">Password:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="password" class="input is-primary">
		<span class="icon is-left is-small"><i class="fas fa-key"></i></span>
		<span class="icon is-right is-small"><i class="fas fa-check"></i></span>
	</div>

	<input type="submit" style="margin:10px 0 10px 0;" class="button is-primary is-fullwidth is-outlined" value="Login">
	<a href="/forget" type="submit" style="margin-top:10px;" class="has-text-danger">Lost your password?</a><br/>
	<a href="/signup" type="submit" style="margin-top:10px;" class="has-text-link">Don't have an account?</a>
	
	

</form>