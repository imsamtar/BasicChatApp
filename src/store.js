import {writable} from 'svelte/store';

export let LS = {
    set token(t){
        localStorage.setItem("token", JSON.stringify(t));
    },
    get token(){
        return localStorage.getItem("token") || "";
    }
}

export let token = writable("");
