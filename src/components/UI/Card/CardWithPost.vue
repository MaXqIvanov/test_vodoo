<template>
	<div class="card rounded">
		<h5
			class="card-header bg-transparent border-0 pb-0 first-letter-upper"
			v-if="post.title"
		>
			{{ post.title }}
		</h5>
		<p
			class="card-body pb-0 fw-weight-bolder first-letter-upper"
			v-if="post.body"
		>
			{{ post.body }}
		</p>
		<span
			class="card-footer bg-transparent first-letter-upper"
			v-if="users?.[post.userId]?.name || isLoadFooter"
		>
			{{ users[post.userId].name }}
		</span>
	</div>
</template>

<script setup lang="ts">
	import { IPost, TUserInObject } from '@/types/posts';

	withDefaults(
		defineProps<{
			post: IPost;
			users: TUserInObject;
			isLoadFooter?: boolean;
		}>(),
		{}
	);
</script>

<style scoped lang="scss">
	h5 {
		color: var(--var-lighter-primary);
	}
</style>
