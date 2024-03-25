<template>
	<div class="card">
		{{ id }}
		<h5
			class="card-header bg-transparent border-0 pb-0 first-letter-upper"
			v-if="title"
		>
			{{ title }}
		</h5>
		<p
			class="card-body pb-0 fw-weight-bolder first-letter-upper"
			v-if="body"
		>
			{{ body }}
		</p>
		<span
			class="card-footer bg-transparent first-letter-upper"
			v-if="footer || isLoadFooter"
		>
			{{ footer }}
		</span>
	</div>
</template>

<script setup lang="ts">
	withDefaults(
		defineProps<{
			title?: string;
			body?: string;
			footer?: string;
			isLoadFooter?: boolean;
			id?: number;
		}>(),
		{}
	);
</script>

<style scoped lang="scss">
	h5 {
		color: var(--var-lighter-primary);
	}
</style>
