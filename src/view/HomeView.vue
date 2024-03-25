<template>
	<div class="row justify-content-center mb-4">
		<InputDefault class="col-12 col-md-6 col-lg-4" />
	</div>
	<div class="card-columns">
		<CardDefault
			:key="post.id"
			:title="post.title"
			:body="post.body"
			:footer="post.author"
			:id="post.id"
			v-for="post in postsStore.allPostsVisible"
		/>
	</div>
</template>

<script setup lang="ts">
	import CardDefault from '@/components/UI/Card/CardDefault.vue';
	import InputDefault from '@/components/UI/Input/InputDefault.vue';
	import { usePostsStore } from '@/store/posts.store';
	import { onMounted, onUnmounted } from 'vue';

	const postsStore = usePostsStore();

	const loadMoreCard = () => {
		if (postsStore.allPostsVisible.length === postsStore.allPosts.length) {
			document.removeEventListener('scroll', loadMoreCard);
		}
		if (window.innerHeight + window.pageYOffset + 100 >= document.body.offsetHeight) {
			console.log('scrooll');
			postsStore.loadMorePosts();
		}
	};

	onMounted(() => {
		postsStore.getPosts();
		document.addEventListener('scroll', loadMoreCard);
	});

	onUnmounted(() => {
		document.removeEventListener('scroll', loadMoreCard);
	});
</script>

<style scoped lang="scss">
	.card-columns {
		@media (max-width: $md) {
			column-count: 2;
		}
		@media (max-width: $sm) {
			column-count: 1;
		}
	}
</style>
