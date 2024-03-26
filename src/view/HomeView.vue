<template>
	<div class="row justify-content-center mb-4">
		<InputDefault
			class="col-12 col-md-6 col-lg-4"
			@clickHandler="searchHandler"
		/>
	</div>
	<div class="masonry">
		<CardWithPost
			:key="post.id"
			:post="post"
			:users="postsStore.allUsers"
			v-for="post in postsStore.allPostsVisible"
		/>
	</div>
	<div
		v-if="!postsStore.allPostsVisible.length && postsStore.isPostLoad"
		class="not-found"
	>
		<h2>Post was not found</h2>
		<NotFoundSvg width="200px" />
	</div>
</template>

<script setup lang="ts">
	import CardWithPost from '@/components/UI/Card/CardWithPost.vue';
	import InputDefault from '@/components/UI/Input/InputDefault.vue';
	import { usePostsStore } from '@/store/posts.store';
	import { onMounted, onUnmounted, watch } from 'vue';
	import Masonry from 'masonry-layout';
	import NotFoundSvg from '@/components/Icons/NotFoundSvg.vue';

	const postsStore = usePostsStore();

	watch(
		() => [postsStore.allPostsVisible, postsStore.allPostsVisible.length],
		() => {
			setTimeout(() => {
				const cardColumns = document.querySelector('.masonry');
				new Masonry(cardColumns, {
					itemSelector: '.card',
					gutter: 10
				});
			}, 1);
		}
	);

	const searchHandler = (e: string) => {
		postsStore.searchPost(e);
	};

	const loadMoreCard = () => {
		if (postsStore.allPostsVisible.length === postsStore.allPosts.length) {
			return;
		}
		if (window.innerHeight + window.pageYOffset + 100 >= document.body.offsetHeight) {
			postsStore.loadMorePosts();
		}
	};

	onMounted(() => {
		postsStore.getPosts();
		postsStore.getUsers();

		document.addEventListener('scroll', loadMoreCard);
	});

	onUnmounted(() => {
		document.removeEventListener('scroll', loadMoreCard);
	});
</script>

<style scoped lang="scss">
	.not-found {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.masonry {
		.card {
			width: calc(33% - 3px);

			@media (max-width: $xl) {
				width: calc(50% - 5px);
			}

			@media (max-width: $md) {
				width: 100%;
			}
			margin-bottom: 10px;
		}
	}
</style>
