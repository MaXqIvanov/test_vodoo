import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/plugins/axios';
import { IPost, IUser, TUserInObject } from '@/types/posts';
import { Ref } from 'vue/dist/vue.js';

export const usePostsStore = defineStore('posts', () => {
	const allPosts: Ref<IPost[]> = ref([]);
	const allPostsSearch: Ref<IPost[]> = ref([]);
	const allUsers: Ref<TUserInObject> = ref({});
	const searchString: Ref<string> = ref('');
	const isSearchMode = ref(false);

	async function getPosts() {
		const response = await api.get('/posts');

		if (response.status === 200) {
			allPosts.value = response.data;
			allPostsSearch.value = response.data;
		}
	}

	async function getUsers() {
		const response = await api.get('/users');

		if (response.status === 200) {
			allUsers.value = response.data.reduce((a: IUser, v: IUser) => ({ ...a, [v.id]: v }), {});
		}
	}

	async function searchPost(searchString: string) {
		if (!searchString) {
			isSearchMode.value = false;
		}
		allPostsSearch.value = allPosts.value;
	}

	function loadMorePosts() {}

	return { searchString, allPosts, allPostsSearch, allUsers, getPosts, getUsers, loadMorePosts };
});
