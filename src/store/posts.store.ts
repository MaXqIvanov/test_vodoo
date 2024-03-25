import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/plugins/axios';
import { IPost } from '@/types/posts';
import { Ref } from 'vue/dist/vue.js';

export const usePostsStore = defineStore('posts', () => {
	const allPosts: Ref<IPost[]> = ref([]);
	const allPostsVisible: Ref<IPost[]> = ref([]);
	const allPostsSearch: Ref<IPost[]> = ref([]);
	const searchString: Ref<string> = ref('');
	const countVisiblePosts = 15;
	const countLoadPosts = 10;
	const isSearchMode = ref(false);

	async function getPosts() {
		// count.value++;
		const response = await api.get('/posts');

		if (response.status === 200) {
			allPosts.value = response.data;
			allPostsSearch.value = response.data;
			allPostsVisible.value = response.data.slice(0, countVisiblePosts);
		}
	}

	async function searchPost(searchString: string) {
		if (!searchString) {
			isSearchMode.value = false;
			allPostsVisible.value = allPosts.value.slice(0, countVisiblePosts);
			return;
		}
		allPostsSearch.value = allPosts.value;
	}

	function loadMorePosts() {
		const countCanLoad =
			allPostsVisible.value.length + countLoadPosts > allPosts.value.length
				? allPosts.value.length
				: allPostsVisible.value.length + countLoadPosts;

		allPostsVisible.value.push(...allPostsSearch.value.slice(allPostsVisible.value.length, countCanLoad));
	}

	return { searchString, allPosts, allPostsVisible, allPostsSearch, getPosts, loadMorePosts };
});
