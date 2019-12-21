<script>
    import {onMount} from 'svelte';
    import {LS} from '../../../store.js';

    let chats = 0;
    onMount(async () => {
        chats = (await (await fetch("/api/users/me/chats", { headers: { "authorization": LS.token } })).json());
    })
</script>


<ul class="list">
    <li class="list-item has-text-centered"> <i class="fal fa-plus fa-lg"></i></li>
    {#each chats as chat}
        <li class="list-item"><a href="/me/chats/{chat._id}"><i class="fal fa-user-circle fa-lg"></i>&nbsp;&nbsp;{chat.name}</a></li>
    {/each}
</ul>
