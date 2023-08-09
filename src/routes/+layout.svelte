<script>
	import { assets } from '$app/paths';
	import '../app.css';
</script>

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

<slot />
