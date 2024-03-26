<template>
	<section class="container py-4">
		<a
			class="link"
			target="_blank"
			href="https://github.com/MaXqIvanov/test_vodoo"
		>
			github
		</a>
		<RouterView />
	</section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
	.container {
		min-height: 100vh;

		.link {
			position: absolute;
			top: 10px;
			right: 10px;
		}
	}
</style>
