<script lang="ts">
    import { onMount } from "svelte";
    import { getBrowserFingerprint } from "$lib/fingerprint";
    import { assets } from '$app/paths';

    export const prerender = false;
    export let captchaCompleted = false;
    let encodedImage: string | null = null;
    let captchaResult = "";
    let captchaId = "";
    
    async function handleSubmit() {
        let fingerprint = await getBrowserFingerprint();
        try {
            let payload = {
                browserFingerprintHash: fingerprint,
                captchaResult: Number.parseInt(captchaResult),
                captchaId: captchaId
            };
            const response = await fetch(`http://localhost:7071/api/validate`, {
                method: "POST",
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                captchaCompleted = true;
            } else {
                throw new Error("Captcha validation failed.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMount(async () => {
        let fingerprint = await getBrowserFingerprint();
        const response = await fetch(`http://localhost:7071/api/captcha/generate/${fingerprint}`, {
            method: "GET",
        });
        let data = await response.json();
        encodedImage = data["captchaImage"]
        captchaId = data["captchaId"]
    });
</script>

<div class="flex justify-center py-1 my-2 mb-4">
    {#if captchaCompleted}
        <div class="flex">
            <p class="text-3xl pr-2 text-[#1fba26] font-semibold">Verified!</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#1fba26" class="w-7 h-7 my-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        </div>
    {:else}
        {#if encodedImage}
            <img src={encodedImage} alt="" class="w-[200px]" />
        {:else}
            <img src={`${assets}/prpelguard.png`} alt="" class="w-[200px]" />
        {/if}
        <input type="number" id="captchaResult" name="captchaResult" class="rounded-md border border-gray-300 p-2 text-lg mx-2 w-12 sm:w-32" bind:value={captchaResult} />
        <button on:click={handleSubmit} class="bg-gray-400 hover:bg-gray-500 text-white rounded w-6 sm:w-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>          
        </button>
    {/if}
</div>
