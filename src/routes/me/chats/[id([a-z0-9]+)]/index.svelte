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
    let chat = {messages:[]}, messageList, content = '';
    async function fetchMessages(newMsg){
        let temp = (await (await fetch(`/api/users/me/chats/${id}`, { headers: { "authorization": LS.token } })).json());
        chat = {...temp};
        if(newMsg) scrollDown();
    }
    function scrollDown(){
        setTimeout(() => messageList && messageList.scrollBy(0, messageList.scrollHeight+10), 1);
    }
    function sendMsg(e){
        let msg = content;
        fetch(`/api/users/me/chats/${id}`, { method: 'POST', headers: {
            "authorization": LS.token,
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({content: msg})
        });
        chat.messages = [...chat.messages, {content, sender: LS.user.username}];
        scrollDown();
        content = '';
    }
    onMount(async () => {
        await fetchMessages();
        window.scrool = scrollDown;
        scrollDown();
        let socket = io('/');
        socket.on('connect', () => {
            socket.on('new msg '+id, fetchMessages);
        });
    });
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
    padding: 0.5rem 0.1rem;
}
li.notification {
    width: 48%;
    min-width: 280px;
    padding: 0.3rem 0.5rem;
    margin: 0.2rem 0;
}
li.right {
    margin-left: auto;
    margin-right: 0;
}
.flex {
    display: flex;
}
</style>

<ul class="messages list" bind:this={messageList}>
    {#each chat.messages || [] as msg}
        <li class="notification" class:right={msg.sender==LS.user.username} class:is-primary={msg.sender==LS.user.username} class:is-link={msg.sender!=LS.user.username}>
            {#if msg.sender!=LS.user.username}
                <h3 class:right={msg.sender==LS.user.username}>By: {msg.sender}</h3>
            {/if}
            <p>{msg.content}</p>
        </li>
    {/each}
</ul>
<form class="flex" on:submit|preventDefault={sendMsg}>
    <input type="text" class="input is-primary" style="border-radius: 0 0 0 0.5rem" bind:value={content}>
    <button type="submit" class="button is-primary" style="border-radius: 0 0 0.5rem 0;"><i class="fas fa-arrow-right"></i></button>
</form>
