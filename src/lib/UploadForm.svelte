<script>
	/**
	 * @module CaptchaForm
	 */

	import Captcha from "./Captcha.svelte";
	import { getBrowserFingerprint } from "$lib/fingerprint";
	import { getClientIpAddress, readAsText } from '$lib/helpers';
	import { handleUpload, validateCaptcha, validateFileHeaders } from '$lib/uploader';
	import ProgressListItem from "./ProgressListItem.svelte";

	/** @type {string} */
	let captchaId = "";

	/** @type {string} */
	let captchaResult = "";

	/** @type {string} */
	let file = "";

	/** @type {UploadFailInfo | null} */
	let formFailure = null;

	/** @type {boolean} */
	let uploading = false;

	/** @type {boolean} */
	let captchaValidated = false;

	/** @type {boolean} */
	let fileValidated = false;

	/** @type {boolean} */
	let formUploaded = false;

	/**
	 * Resets the progress flags.
	 */
	function resetProgress() {
		captchaValidated = false;
		fileValidated = false;
		formUploaded = false;
	}
	
	/**
	 * Handles the form submission.
	 * 
	 * @param {Event} event - The form submission event.
	 * @returns {Promise<void>}
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		uploading = true;

		// @ts-ignore
		const rawData = new FormData(event.target);

		// Add missing parameter to the form data
		rawData.append('browserId', (await getBrowserFingerprint()));
		rawData.append('captchaId', captchaId);
		rawData.append('ipAddress', (await getClientIpAddress()));

		// Parse the csv file and send this up as a string
		let file = rawData.get('file');
		// @ts-ignore
		let contents = await readAsText(file);
		rawData.append('fileStr', contents);

		// Convert the form data into an internal format
		// @ts-ignore
		let formData = {
			fileStr: rawData.get("fileStr"),
			filename: rawData.get("file")?.toString(),
			// @ts-ignore
			captchaResult: parseInt(rawData.get("captchaResult")?? "0"),
			captchaId: rawData.get("captchaId"),
			fullname:rawData.get("fullname"),
			email: rawData.get("email"),
			organisation: rawData.get("organisation"),
			browserId: rawData.get("browserId"),
			ipAddress: rawData.get("ipAddress"),
		};

		// First validate the captcha
		// @ts-ignore
		let validateResponse;
		try {			
			validateResponse = await validateCaptcha({
				// @ts-ignore
				captchaId: formData.captchaId,
				captchaResult: formData.captchaResult,
				// @ts-ignore
				browserFingerprintHash: formData.browserId,
			});
		} catch (error) {
			formFailure = {
				fieldWithError: "captchaResult",
				failReason: "Captcha validation failed, try again",
			}
			captchaResult = "";
			uploading = false;
			resetProgress();
			return;
		}
		captchaValidated = true;

		// Now validate the file
		try {
			// @ts-ignore
			validateFileHeaders(formData.fileStr);
		} catch (error) {
			formFailure = {
				fieldWithError: "file",
				failReason: "File validation failed, try a different file",
			}
			file = "";
			uploading = false;
			resetProgress();
			return;
		}
		fileValidated = true;

		// Finally, upload the form
		try {
			// @ts-ignore
			let analysisUrl = await handleUpload(formData, validateResponse);
			formUploaded = true;
			location.href = analysisUrl;
			return;
		} catch (error) {
			formFailure = {
				fieldWithError: "upload",
				failReason: "Something went wrong with the upload, try again later",
			}
			uploading = false;
			resetProgress();
			return;
		}
	}

	export const prerender = false;
</script>

{#if uploading}
<div class="w-full mb-4">
	<h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Generating analysis:</h2>
	<ul class="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
		<ProgressListItem
			loadingText="Making sure you're not a robot 🤖"
			finishedText="Captcha validated"
			loading={!captchaValidated}
			waiting={false}
		/>
		<ProgressListItem
			loadingText="Checking your file looks correct 👀"
			finishedText="File validated"
			loading={!fileValidated}
			waiting={!captchaValidated}
		/>
		<ProgressListItem
			loadingText="Sending your data off for analysis 🚀"
			finishedText="Form uploaded"
			loading={!formUploaded}
			waiting={!fileValidated}
		/>
	</ul>
</div>
{:else}
<form
	method="POST"
	class="w-full"
	enctype="multipart/form-data"
	on:submit|preventDefault={handleSubmit}
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
		<Captcha bind:captchaResult={captchaResult} bind:captchaId={captchaId} serverUrl={import.meta.env.VITE_PRPEL_GUARD_URL} />
	</div>

	<button
		class="text-white bg-[#a679e0] border-0 py-2 px-8 w-full focus:outline-none hover:bg-[#4ec2c2] rounded text-lg"
		>Get Analysis</button
	>
</form>
{/if}