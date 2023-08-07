<script lang="ts">
    import { onMount } from "svelte";
    import { getBrowserFingerprint } from "$lib/fingerprint";
    import { assets } from '$app/paths';
    import { getClientIpAddress } from '$lib/helpers';

    export const prerender = false;
    export let captchaResult = "";
    export let captchaId = "";
    export let serverUrl: string;
    
    let encodedImage: string | null = null;

    onMount(async () => {
        let fingerprint = await getBrowserFingerprint();
        let ipAddress = await getClientIpAddress();
        const response = await fetch(`${serverUrl}/api/captcha/generate/${fingerprint}`, {
            method: "GET",
            headers: {
                "X-Forwarded-For": ipAddress
            }
        });
        let data = await response.json();
        encodedImage = data["captchaImage"]
        captchaId = data["captchaId"]
    });
</script>

<div class="flex justify-center py-1 my-2 mb-4">
    {#if encodedImage}
        <img src={encodedImage} alt="" class="w-[200px]" />
    {:else}
        <img src={`${assets}/prpelguard.png`} alt="" class="w-[200px]" />
    {/if}
    <input
        type="number"
        id="captchaResult"
        name="captchaResult"
        required
        class="rounded-md border border-gray-300 p-2 text-lg mx-2 w-12 sm:w-32"
        bind:value={captchaResult}
    />
</div>
