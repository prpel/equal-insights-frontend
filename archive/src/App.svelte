<script lang="ts">
	import logo from '/logo.svg';
	import pic1 from '/pic1.svg';
	import Privacy from './lib/Privacy.svelte';

	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<main>
	<header class="shadow-md shadow-gray-400 w-full h-28">
		<div class="flex justify-center items-center my-auto h-full w-full mx-auto">
			<img src={logo} class="h-[65px] pr-36" alt="logo" />
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

	<section class="w-10/12 flex justify-center mx-auto mt-20">
		<div class="w-5/12">
			<img src={pic1} class="h-96 pr-36" alt="graphimage" />
		</div>
		<div class="shadow-lg shadow-gray-400 w-7/12 p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
			<form class="w-full" action="/upload" method="post" enctype="multipart/form-data">
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

				<div class="relative mb-4">
					<label for="file" class="leading-7 text-sm text-gray-600">Select file:</label><br />
					<input class="text-lg" type="file" id="file" name="file" />
				</div>

				<button
					class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
					>Get Analysis</button
				>
				<p class="text-xs text-gray-500 mt-3">
					Analysed data is not stored, please read our <a
						href="#"
						class="underline underline-offset-2"
						on:click|preventDefault={toggleModal}>privacy notice</a
					> to find out more.
				</p>
			</form>
		</div>

		<Privacy show={showModal} on:close={toggleModal} />
	</section>
</main>
