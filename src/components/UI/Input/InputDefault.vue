<template>
	<div class="input-group">
		<div class="input-group-prepend">
			<span
				class="input-group-text"
				id="basic-addon1"
				@click="clickHandler"
				><SearchSvg
			/></span>
		</div>
		<input
			v-model="inputValue"
			type="text"
			class="form-control"
			placeholder="Filter by author..."
			aria-label="Filter by author"
			aria-describedby="basic-addon1"
			@input="inputHandler"
			@keyup.enter="clickHandler"
		/>
	</div>
</template>

<script setup lang="ts">
	import SearchSvg from '@/components/Icons/SearchSvg.vue';
	import { ref } from 'vue';

	const inputValue = ref('');
	const emits = defineEmits(['inputHandler', 'clickHandler']);
	const debounce = ref<NodeJS.Timeout>();

	const clickHandler = () => {
		emits('clickHandler', inputValue.value);
	};

	const inputHandler = () => {
		if (debounce) {
			clearTimeout(debounce.value);
		}
		debounce.value = setTimeout(() => {
			emits('inputHandler', inputValue.value);
		}, 700);
	};
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
