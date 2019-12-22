<script>
    import {onMount} from 'svelte';
    import {LS} from '../../../store.js';

    let chats = 0;
    onMount(getChats)
    async function getChats(){
        chats = (await (await fetch("/api/users/me/chats", { headers: { "authorization": LS.token } })).json()).reverse();
    }
    
</script>

<style>
.list {
    margin-top: 1rem;
    min-height: 70vh;
}
.create-button {
    display: flex;
    padding: 1rem;
    background: #eee;
    color: #555;
    place-content: center;
}
.create-button > i {
    align-self: center;
    font-size: 2rem;
}
.chats > li {
    border-bottom: 0.3rem solid #fff;
}
.chats > li > a {
    padding-top: 1rem;
    height: 4rem;
    display: block;
    font-size: 1.3rem;
    font-weight: 600;
    color: #555;
}
</style>

<ul class="list chats">
    <li>
        <a href="/me/chats/create" class="create-button has-text-centered" > <i class="far fa-plus fa-lg"></i></a>
    </li>
    {#each chats as chat}
        <li><a href="/me/chats/{chat._id}" class="list-item notification"><i class="far fa-user-circle fa-lg"></i>&nbsp;&nbsp;{chat.name}</a></li>
    {/each}
</ul>
