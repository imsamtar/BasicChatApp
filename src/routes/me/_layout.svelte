<script>
    import {onMount} from 'svelte';
	import {goto} from '@sapper/app';
    import {LS} from '../../store.js';
    
    async function authorize(){
		if(LS.token){
			let res = await fetch('/api/users/me/verify', {
				headers: { 'authorization': LS.token }
			});
            res = await res.json();
			if(res.authorized){
                LS.user = res.user;
			} else {
                LS.token = "";
                goto('/login');
            }
        }
        else goto('/login');
    }
    
    onMount(authorize);
</script>

<slot></slot>