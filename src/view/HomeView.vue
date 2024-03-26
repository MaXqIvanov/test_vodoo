<template>
	<div class="row justify-content-center mb-4">
		<InputDefault class="col-12 col-md-6 col-lg-4" />
	</div>
	<div class="card-columns">
		<CardWithPost
			:key="post.id"
			:post="post"
			:users="postsStore.allUsers"
			v-for="post in postsStore.allPostsSearch"
		/>
	</div>
</template>

<script setup lang="ts">
	import CardWithPost from '@/components/UI/Card/CardWithPost.vue';
	import InputDefault from '@/components/UI/Input/InputDefault.vue';
	import { usePostsStore } from '@/store/posts.store';
	import { onMounted, watch } from 'vue';
	import Masonry from 'masonry-layout';

	const postsStore = usePostsStore();

	watch(
		() => postsStore.allPostsSearch,
		() => {
			setTimeout(() => {
				const cardColumns = document.querySelector('.card-columns');
				new Masonry(cardColumns, {
					itemSelector: '.card',
					gutter: 10
				});
			}, 0);
		}
	);

	onMounted(() => {
		postsStore.getPosts();
		postsStore.getUsers();
	});
</script>

<style scoped lang="scss">
	.card-columns {
		.card {
			width: calc(33% - 3px);

			@media (max-width: $xl) {
				width: calc(50% - 5px);
			}

			@media (max-width: $md) {
				width: 100%;
			}
		}
	}
</style>
