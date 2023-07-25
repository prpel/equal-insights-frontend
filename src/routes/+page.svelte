<script lang="ts">
	import { assets } from '$app/paths';
	import Privacy from '$lib/Privacy.svelte';
	import UploadForm from '$lib/UploadForm.svelte';

	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<main>
	<header class="shadow-md shadow-gray-400 w-full h-28">
		<div class="flex justify-center items-center my-auto h-full w-full mx-auto">
			<img src={`${assets}/logo.svg`} class="h-[65px] pr-36" alt="logo" />
			<div class="text-lg flex space-x-16">
				<a class="hover:text-[#4ec2c2] w-10" href="https://www.equal-insight.co.uk/">Home</a>
				<a class="hover:text-[#4ec2c2] w-50" href="https://www.equal-insight.co.uk/aboutus"
					>About Us</a
				>
				<a class="hover:text-[#4ec2c2] w-50" href="https://www.equal-insight.co.uk/what-we-do"
					>What We Do</a
				>
				<a class="hover:text-[#4ec2c2] w-50" href="https://www.equal-insight.co.uk/services"
					>Our Services</a
				>
				<a class="hover:text-[#4ec2c2] w-50" href="https://www.equal-insight.co.uk/team">Team</a>
			</div>
		</div>
	</header>

	<section class="w-10/12 flex justify-center mx-auto mt-10">
		<div class="w-5/12 my-auto">
			<img src={`${assets}/pic1.svg`} class="h-96 pr-36" alt="graphimage" />
		</div>
		<div class="shadow-lg shadow-gray-400 w-7/12 p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
			<UploadForm />
			<p class="text-xs text-gray-500 mt-3">
				Analysed data is not stored, please read our
				<button class="underline underline-offset-2 border-0" on:click|preventDefault={toggleModal}
					>privacy notice</button
				> to find out more.
			</p>
		</div>

		<Privacy show={showModal} on:close={toggleModal} />
	</section>
</main>
