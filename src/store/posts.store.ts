import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/plugins/axios';
import { IPost, IUser, TUserInObject } from '@/types/posts';
import { Ref } from 'vue/dist/vue.js';

export const usePostsStore = defineStore('posts', () => {
	const allPosts: Ref<IPost[]> = ref([]);
	const allPostsVisible: Ref<IPost[]> = ref([]);
	const allPostsSearch: Ref<IPost[]> = ref([]);
	const isPostLoad: Ref<boolean> = ref(false);
	const allUsers: Ref<TUserInObject> = ref({});
	const countVisiblePosts = 15;
	const countLoadPosts = 10;

	async function getPosts() {
		// count.value++;
		const response = await api.get('/posts');

		if (response.status === 200) {
			allPosts.value = response.data;
			allPostsSearch.value = response.data;
			allPostsVisible.value = response.data.slice(0, countVisiblePosts);
		}
		isPostLoad.value = true;
	}

	async function getUsers() {
		const response = await api.get('/users');

		if (response.status === 200) {
			allUsers.value = response.data.reduce((a: IUser, v: IUser) => ({ ...a, [v.id]: v }), {});
		}
	}

	async function searchPost(searchString: string) {
		if (!searchString) {
			allPostsSearch.value = [...allPosts.value];
			allPostsVisible.value = allPosts.value.slice(0, countVisiblePosts);
			return;
		}

		const currenyAuthor = Object.entries(allUsers.value).filter((author) =>
			author[1].name.toLowerCase().includes(searchString.toLowerCase())
		);

		allPostsSearch.value = allPosts.value.filter(
			(post) => !!currenyAuthor.find((author) => Number(author[0]) === post.userId)
		);
		allPostsVisible.value = allPostsSearch.value.slice(0, countVisiblePosts);
	}

	function loadMorePosts() {
		const countCanLoad =
			allPostsVisible.value.length + countLoadPosts > allPosts.value.length
				? allPosts.value.length
				: allPostsVisible.value.length + countLoadPosts;

		allPostsVisible.value.push(...allPostsSearch.value.slice(allPostsVisible.value.length, countCanLoad));
	}

	return {
		allPosts,
		allPostsVisible,
		allPostsSearch,
		allUsers,
		isPostLoad,
		getPosts,
		loadMorePosts,
		getUsers,
		searchPost
	};
});
