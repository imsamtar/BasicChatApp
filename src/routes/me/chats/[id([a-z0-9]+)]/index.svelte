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
        window.chat = chat;
    })
    afterUpdate(() => {
        last = document.querySelector('.messages.list>li:last-child');
        last && last.scrollIntoView();
    })
    onDestroy(() => {
        clearInterval(refresh);
    })

    function sendMsg(e){
        console.log("send message");
    }
</script>

<style>
.messages.list {
    border: 0;
    border-color: #00d1b2;
    border-left: 1px solid #00d1b2;
    border-right: 1px solid #00d1b2;
    border-radius: 0;
    height: calc(100vh - 6.25rem);
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 0;
    padding: 0.5rem;
}
li.notification {
    width: 48%;
}
li.right {
    margin-left: auto;
    margin-right: 0;
}
.flex {
    display: flex;
}
</style>

<ul class="messages list">
    {#each chat.messages || [] as msg}
        <li class="notification" class:right={msg.sender==LS.user._id}><i class="fal fa-user-circle fa-lg"></i>&nbsp;&nbsp;{msg.content}</li>
    {/each}
</ul>
<form class="flex" on:submit|preventDefault={sendMsg}>
    <input type="text" class="input is-primary" style="border-radius: 0 0 0 0.5rem">
    <button type="submit" class="button is-primary" style="border-radius: 0 0 0.5rem 0;"><i class="fas fa-arrow-right"></i></button>
</form>
