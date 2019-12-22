<script>
    import {onMount} from 'svelte';
    import {goto} from '@sapper/app';
    import {LS} from '../../../store.js';

    let name = "";
    let keyword = "";
    let users = [];
    let matched = [];
    onMount(getUsers);
    async function getUsers(){
        users = (await (await fetch("/api/users")).json()).reverse();
        users = users.filter(user => user._id!=LS.user._id);
    }
    async function createChat(){
        let chat = await (await fetch('/api/users/me/chats',{
            method: 'POST',
            headers: {
                "authorization": LS.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,members: users.filter(u => u.selected).map(u => u.username)})
        })).json();
        goto('/me/chats');
    }
    $: matched = users.filter(user => user.username.startsWith(keyword));
</script>



<style>
.users {
    height: 80vh;
    overflow-y: scroll;
}
form {
    margin-top: 1rem;
    max-height: 4rem;
    margin-bottom: 0.3rem;
}
form > input {
    outline: 0;
    border: 0;
    display: block;
    padding: 1rem;
    background: #eee;
    color: #555;
    place-content: center;
    width: 100%;
}
.name {
    margin-right: 0.3rem;
}
.users > * {
    box-sizing: border-box;
    margin-bottom: 0.3rem;
}
form > input {
    font-size: 1rem;
}
form > button {
    outline: 0;
    border: 0;
    display: inline-block;
    font-weight: 600;
    padding: 1rem;
    place-content: center;
    color: #777;
}
.users > li.selected {
    border-left: 10px solid black;
}
.users > li > div {
    padding-top: 1rem;
    height: 4rem;
    display: block;
    font-size: 1.3rem;
    font-weight: 600;
    color: #555;
}
</style>

<form style="display: flex;" on:submit|preventDefault={createChat} >
    <input bind:value={name} class="name" placeholder="Name of chat">
    <input bind:value={keyword} class="search-username" placeholder="Filter by username">
    <button type="submit"> <i class="fad fa-forward fa-2x"></i> </button>
</form>
<ul class="users">
    {#each matched as user}
        <li class:selected={user.selected} on:click={() => user.selected = !user.selected}>
            <div class="list-item notification"><i class="far fa-user-circle fa-lg"></i>&nbsp;&nbsp;{user.username}</div>
        </li>
    {/each}
</ul>