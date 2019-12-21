<script context="module">
    export async function preload(page){
        const {id} = page.params;
        return {id};
    }
</script>
<script>
    import {onMount, afterUpdate, onDestroy} from 'svelte';
    import {LS} from '../../../../store.js';

    export let id;
    let chat = 0, last, refresh;
    onMount(async () => {
        chat = (await (await fetch(`/api/users/me/chats/${id}`, { headers: { "authorization": LS.token } })).json());
        refresh = setInterval(async () => {
            chat = (await (await fetch(`/api/users/me/chats/${id}`, { headers: { "authorization": LS.token } })).json());
        }, 10000);
    })
    afterUpdate(() => {
        last = document.querySelector('.messages.list>li:last-child');
        last && last.scrollIntoView();
    })
    onDestroy(() => {
        clearInterval(refresh);
    })
</script>

<style>
.messages.list {
    height: 70vh;
    overflow: scroll;
    overflow-x: hidden;
}
.flex {
    display: flex;
}
</style>

<ul class="messages list">
    {#each chat.messages || [] as msg}
        <li class="list-item"><i class="fal fa-user-circle fa-lg"></i>&nbsp;&nbsp;{msg.content}</li>
    {/each}
</ul>
<div class="list-item has-text-centered flex">
    <input type="text" class="input has-outline-0">
    <button class="button has-text-link"><i class="fas fa-check"></i></button>
</div>
