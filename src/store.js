import {writable} from 'svelte/store';

export let LS = {
    set token(t){
        localStorage.setItem("token", t);
    },
    get token(){
        return localStorage.getItem("token") || "";
    },
    set user(user){
        localStorage.setItem("user", JSON.stringify(user));
    },
    get user(){
        return JSON.parse(localStorage.getItem("user") || "");
    }
}

export let token = writable("");
