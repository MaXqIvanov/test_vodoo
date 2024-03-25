<template>
	<div class="input-group">
		<div class="input-group-prepend">
			<span
				class="input-group-text"
				id="basic-addon1"
				><SearchSvg
			/></span>
		</div>
		<input
			type="text"
			class="form-control"
			placeholder="Filter by author..."
			aria-label="Filter by author"
			aria-describedby="basic-addon1"
		/>
	</div>
</template>

<script setup lang="ts">
	import SearchSvg from '@/components/Icons/SearchSvg.vue';
</script>

<style scoped lang="scss">
	.input-group-text {
		background-color: var(--white);
		cursor: pointer;
		svg {
			opacity: 0.8;
			transition: all linear 0.2s;

			&:hover {
				opacity: 1;
			}
		}
	}
</style>
