<script>
    import { createEventDispatcher } from 'svelte';
  
    export let show = false;
    const dispatch = createEventDispatcher();
  
    function close() {
      show = false;
      dispatch('close');
    }
</script>
  
<svelte:window on:keydown="{e => (e.key === 'Escape' ? close() : null)}"/>

{#if show}
<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            Privacy Notice
        </h3>
        <div class="mt-2">
            <p class="text-sm text-gray-500">
            We, at Equal Insight, are committed to maintaining your privacy and protecting your information when you visit our website and submit any information through our web form.
            </p>
            <p class="text-sm text-gray-500">
            Any data you upload via our web form is processed solely for the purpose intended and is not stored or linked to your personal details in any way.
            </p>
            <p class="text-sm text-gray-500">
            We will store your personal details in a secure and confidential manner, in accordance with the General Data Protection Regulation (GDPR) guidelines.
            </p>
            <p class="text-sm text-gray-500">
            If you have any queries regarding this Privacy Notice, your personal data, or if you want to exercise any of your data protection rights, please email us at info@equal-insight.com.
            </p>
        </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" on:click="{close}">
            Close
        </button>
        </div>
    </div>
    </div>
</div>
{/if}
  