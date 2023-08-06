<script lang="ts">
	import Captcha from '$lib/Captcha.svelte';

	let verified = false;

	function handleSubmit(event: Event) {
		event.preventDefault();
		console.log(verified);
	}

	export const prerender = true;
</script>

<form class="w-full" on:submit={handleSubmit} enctype="multipart/form-data">
	<h2 class="text-gray-900 text-lg font-medium title-font mb-5">Data Upload</h2>

	<div class="relative mb-4">
		<label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
		<input
			type="text"
			id="full-name"
			name="full-name"
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	</div>

	<div class="relative mb-4">
		<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
		<input
			type="email"
			id="email"
			name="email"
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	</div>

	<div class="relative mb-4">
		<label for="organisation" class="leading-7 text-sm text-gray-600">Organisation</label>
		<input
			type="text"
			id="organisation"
			name="organisation"
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
	</div>

	<div class="flex items-center justify-center w-full pb-4">
		<label
			for="dropzone-file"
			class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
		>
			<div class="flex flex-col items-center justify-center pt-5 pb-6">
				<svg
					class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 16"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
					/>
				</svg>
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">CSV, XLSX, XLS</p>
			</div>
			<input id="dropzone-file" type="file" class="hidden" />
		</label>
	</div>

	<div class="w-full my-2 mx-auto">
		<Captcha bind:captchaCompleted={verified} />
	</div>

	<button
		class="text-white bg-[#a679e0] border-0 py-2 px-8 w-full focus:outline-none hover:bg-[#4ec2c2] rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed"
		disabled={!verified}
		>Get Analysis</button
	>
</form>
