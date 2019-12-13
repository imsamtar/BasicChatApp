<svelte:head>
	<title>Basic Chat App</title>
</svelte:head>

<form class="form" on:submit|preventDefault={() => {console.log("Signup")}}>

	<label for="fullName" class="label">Full Name:</label>
	<input type="text" class="input is-primary">

	<label for="email" class="label">Email:</label>
	<div class="control has-icons-left has-icons-right">
		<input type="email" class="input is-primary email">
		<span class="icon is-left"><i class="fas fa-envelope"></i></span>
		<span class="icon is-right"><i class="fas fa-check"></i></span>
	</div>
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

	<input type="submit" style="margin:10px 0 10px 0;" class="button is-primary is-fullwidth is-outlined" value="SignUp">
	<a href="/login" type="submit" style="margin-top:10px;" class="has-text-success">Already have an account?</a>

</form>