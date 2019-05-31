<script context="module">
import Waveball from '../components/Waveball/Waveball.svelte';

export async function preload() {
    return { Waveball };
}
</script>

<script>
import {stores} from '@sapper/app';

</script>

<style>
:global(.waveball) {
    display: block;
    margin: auto;
}
</style>

<svelte:head>
	<title>Chris Lee</title>
</svelte:head>

<div class="wrap wrap--wide">
    <Waveball id="waveball" class="waveball"/>
</div>
