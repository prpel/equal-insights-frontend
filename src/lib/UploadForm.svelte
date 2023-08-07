<script lang="ts">
	import Captcha from "./Captcha.svelte";
	import { getBrowserFingerprint } from "$lib/fingerprint";
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { UploadFailInfo } from '$lib/types';
	import { getClientIpAddress, readAsText } from '$lib/helpers';

	let captchaId = "";
	let captchaResult = "";
	let file = "";
	let formFailure: UploadFailInfo | null = null;
	
	const handler: SubmitFunction = async (event) => {
		// Add missing parameter to the form data
		event.formData.append('browserId', (await getBrowserFingerprint()));
		event.formData.append('captchaId', captchaId);
		event.formData.append('ipAddress', (await getClientIpAddress()));

		// Parse the csv file and send this up as a string
		let file = event.formData.get('file');
		let contents = await readAsText(file as Blob);
  		event.formData.append('fileStr', contents);

		return ({ update, result }) => {
            if (result.type === 'success') {
				formFailure = null;
                result.data
			} else if (result.type === 'redirect') {
				location.href = result.location;
            } else {
				formFailure = (result as any).data as UploadFailInfo;

				if (formFailure.fieldWithError === "captchaResult")
					captchaResult = "";

				if (formFailure.fieldWithError === "file")
					captchaId = "";

				console.log(formFailure);
			}
			update();
		};
	};

	export const prerender = false;
</script>

<form
	method="POST"
	class="w-full"
	enctype="multipart/form-data"
	use:enhance={handler}
>
	<h2 class="text-gray-900 text-lg font-medium title-font mb-5">Data Upload</h2>

	{#if formFailure}
		<p class="text-red-500">There was an error with your submission: {formFailure.failReason}.</p>
	{/if}

	<div class="relative mb-4">
		<label for="fullname" class="leading-7 text-sm text-gray-600">Full Name</label>
		<input
			type="text"
			id="fullname"
			name="fullname"
			required
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	</div>

	<div class="relative mb-4">
		<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
		<input
			type="email"
			id="email"
			name="email"
			required
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	</div>

	<div class="relative mb-4">
		<label for="organisation" class="leading-7 text-sm text-gray-600">Organisation</label>
		<input
			type="text"
			id="organisation"
			name="organisation"
			required
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	</div>

	<!-- Add an input where a user can upload a csv or xlsx file -->
	<div class="relative mb-4">
		<label for="file" class="leading-7 text-sm text-gray-600">Upload File</label>
		<input
			type="file"
			id="file"
			name="file"
			value={file ?? ""}
			required
			accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	</div>

	<div class="relative mb-4">
		<Captcha bind:captchaResult={captchaResult} bind:captchaId={captchaId} serverUrl="http://localhost:7071" />
	</div>

	<button
		class="text-white bg-[#a679e0] border-0 py-2 px-8 w-full focus:outline-none hover:bg-[#4ec2c2] rounded text-lg"
		>Get Analysis</button
	>
</form>
